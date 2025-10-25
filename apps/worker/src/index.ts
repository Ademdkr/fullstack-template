import { Hono } from 'hono';
// ⬇️ explizit aus dem lokalen node_modules des Workers importieren
import { PrismaClient } from '@prisma/client';
import { PrismaNeonHTTP } from '@prisma/adapter-neon';

type Env = { DATABASE_URL: string };

let prisma: PrismaClient | undefined;

export default {
  fetch: async (req: Request, env: Env, ctx: ExecutionContext) => {
    const app = new Hono<{ Bindings: Env }>();

    if (!prisma) {
      const adapter = new PrismaNeonHTTP(env.DATABASE_URL, {});
      prisma = new PrismaClient({ adapter });
    }

    app.get('/', (c) => c.text('OK'));
    app.get('/api/health', (c) => c.json({ status: 'ok', ts: new Date().toISOString() }));

    app.get('/api/budgets', async (c) => {
      const rows = await prisma!.budget.findMany({ orderBy: { createdAt: 'desc' } });
      return c.json(rows);
    });
    app.post('/api/budgets', async (c) => {
      const body = await c.req.json<{ name: string }>();
      const created = await prisma!.budget.create({ data: { name: body.name } });
      return c.json(created, 201);
    });
    app.patch('/api/budgets/:id', async (c) => {
      const { id } = c.req.param();
      const body = await c.req.json<{ name: string }>();
      const updated = await prisma!.budget.update({ where: { id }, data: { name: body.name } });
      return c.json(updated);
    });
    app.delete('/api/budgets/:id', async (c) => {
      const { id } = c.req.param();
      await prisma!.budget.delete({ where: { id } });
      return c.json({ ok: true });
    });

    return app.fetch(req, env, ctx);
  },
};
