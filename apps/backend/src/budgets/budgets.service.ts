import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  findMany() {
    return this.prisma.budget.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.budget.findUnique({ where: { id } });
  }

  async create(name: string) {
    return this.prisma.budget.create({ data: { name } });
  }

  async update(id: string, name: string) {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException('Budget not found');
    return this.prisma.budget.update({ where: { id }, data: { name } });
  }

  async remove(id: string) {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException('Budget not found');
    return this.prisma.budget.delete({ where: { id } });
  }
}
