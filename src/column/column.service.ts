import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateColumnInput) {
    return this.prisma.column.create({ data });
  }

  findAllByUser(userId: string) {
    return this.prisma.column.findMany({
      where: { userId },
      orderBy: { order: 'asc' },
    });
  }

  update(data: UpdateColumnInput) {
    const { id, ...rest } = data;
    return this.prisma.column.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    const column = await this.prisma.column.findUnique({ where: { id } });
    if (!column) throw new Error('Column not found');

    const baseColumns = ['TODO', 'IN PROGRESS', 'DONE'];
    if (baseColumns.includes(column.name.toUpperCase()))
      throw new Error('No puedes eliminar columnas base');

    const todoColumn = await this.prisma.column.findFirst({
      where: { name: 'TODO', userId: column.userId },
    });

    await this.prisma.task.updateMany({
      where: { columnId: id },
      data: { columnId: todoColumn?.id },
    });

    return this.prisma.column.delete({ where: { id } });
  }
}
