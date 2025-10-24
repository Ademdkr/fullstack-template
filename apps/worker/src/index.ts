import { ExecutionContext, Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

// Cloudflare bindet ENV über Wrangler; DATABASE_URL kommt aus wrangler.toml
type Env = {
  DATABASE_URL: string
  // Optional: Hyperdrive binding: HYPERDRIVE (siehe wrangler.toml)
  HYPERDRIVE?: any
}

export default {
  fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {
    const app = new Hono<{ Bindings: Env }>()
    // Prisma Client ohne Rust-Engine, DB-URL aus env
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL, // bei Hyperdrive: env.HYPERDRIVE.connectionString
    })

    // Health
    app.get('/api/health', (c) => c.json({ status: 'ok', ts: new Date().toISOString() }))

    // Budgets (entspricht deiner Nest-API)
    app.get('/api/budgets', async (c) => {
      const rows = await prisma.budget.findMany({ orderBy: { createdAt: 'desc' } })
      return c.json(rows)
    })

    app.post('/api/budgets', async (c) => {
      const body = await c.req.json<{ name: string }>()
      const created = await prisma.budget.create({ data: { name: body.name } })
      return c.json(created, 201)
    })

    app.patch('/api/budgets/:id', async (c) => {
      const { id } = c.req.param()
      const body = await c.req.json<{ name: string }>()
      const updated = await prisma.budget.update({ where: { id }, data: { name: body.name } })
      return c.json(updated)
    })

    app.delete('/api/budgets/:id', async (c) => {
      const { id } = c.req.param()
      await prisma.budget.delete({ where: { id } })
      return c.json({ ok: true })
    })

    return app.fetch(request, env, ctx)
  }
}
