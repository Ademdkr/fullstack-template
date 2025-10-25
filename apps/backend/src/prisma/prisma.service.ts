import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private sql!: ReturnType<typeof neon>;

  async onModuleInit(): Promise<void> {
    this.sql = neon(process.env.DATABASE_URL!);
  }

  async onModuleDestroy(): Promise<void> {
    // Neon serverless doesn't need explicit disconnect
  }

  // SQL query method to replace Prisma operations
  async query<T = any>(query: string, params: any[] = []): Promise<T[]> {
    // Simple parameter substitution for basic queries
    let finalQuery = query;
    params.forEach((param, index) => {
      finalQuery = finalQuery.replace(
        `$${index + 1}`,
        typeof param === 'string' ? `'${param}'` : String(param),
      );
    });

    const result = await this.sql(finalQuery as any);
    return result as T[];
  }

  async $queryRaw<T = any>(
    query: TemplateStringsArray,
    ...params: any[]
  ): Promise<T[]> {
    const queryString = query.join('');
    return this.query<T>(queryString, params);
  }

  // Budget operations to replace Prisma client methods
  budget = {
    findMany: async (options?: { orderBy?: { createdAt: 'desc' | 'asc' } }) => {
      const order = options?.orderBy?.createdAt === 'desc' ? 'DESC' : 'ASC';
      return this.query('SELECT * FROM "Budget" ORDER BY "createdAt" ' + order);
    },

    findUnique: async (options: { where: { id: string } }) => {
      const results = await this.query('SELECT * FROM "Budget" WHERE id = $1', [
        options.where.id,
      ]);
      return results[0] || null;
    },

    create: async (options: { data: { name: string } }) => {
      const results = await this.query(
        'INSERT INTO "Budget" (id, name, "totalAmount", spent, "createdAt", "updatedAt") VALUES (gen_random_uuid(), $1, 0, 0, NOW(), NOW()) RETURNING *',
        [options.data.name],
      );
      return results[0];
    },

    update: async (options: {
      where: { id: string };
      data: { name: string };
    }) => {
      const results = await this.query(
        'UPDATE "Budget" SET name = $1, "updatedAt" = NOW() WHERE id = $2 RETURNING *',
        [options.data.name, options.where.id],
      );
      return results[0];
    },

    delete: async (options: { where: { id: string } }) => {
      const results = await this.query(
        'DELETE FROM "Budget" WHERE id = $1 RETURNING *',
        [options.where.id],
      );
      return results[0];
    },
  };
}
