import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTaskInput) {
    return this.prisma.task.create({ data });
  }

  findAllByUser(userId: string) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { id: 'asc' },
    });
  }

  update(data: UpdateTaskInput) {
    const { id, ...rest } = data;
    return this.prisma.task.update({
      where: { id },
      data: rest,
    });
  }

  remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
