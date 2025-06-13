import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnResolver } from './column.resolver';
import { PrismaModule } from '../prisma/prisma.module'; // 👈 importa el módulo que exporta PrismaService

@Module({
  imports: [PrismaModule], // 👈 aquí lo incluyes
  providers: [ColumnService, ColumnResolver],
})
export class ColumnModule {}
