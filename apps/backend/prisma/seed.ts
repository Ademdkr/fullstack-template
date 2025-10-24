import { config } from 'dotenv';
import path from 'path';

// .env.neon bevorzugen, dann backend .env, dann root .env
for (const p of [
  path.resolve(__dirname, '../.env.neon'),
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../../.env'),
]) {
  const { error } = config({ path: p, override: true });
  if (!error) break;
}

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.budget.count();
  if (count === 0) {
    await prisma.budget.createMany({
      data: [{ name: 'Haushalt' }, { name: 'Transport' }, { name: 'Freizeit' }],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed completed.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
