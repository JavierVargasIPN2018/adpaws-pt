import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Buscar o crear usuario
  let user = await prisma.user.findFirst({ where: { name: 'Javier' } });
  if (!user) {
    user = await prisma.user.create({ data: { name: 'Javier' } });
  }

  // Crear columnas base si no existen
  const existingColumns = await prisma.column.findMany({
    where: { userId: user.id },
  });

  if (existingColumns.length === 0) {
    await prisma.column.createMany({
      data: [
        { name: 'TODO', order: 1, userId: user.id },
        { name: 'IN PROGRESS', order: 2, userId: user.id },
        { name: 'DONE', order: 3, userId: user.id },
      ],
    });
  }

  // Obtener columna TODO para asignar tareas
  const todoColumn = await prisma.column.findFirst({
    where: { name: 'TODO', userId: user.id },
  });

  // Crear tareas si no hay ninguna
  const existingTasks = await prisma.task.findMany({ where: { userId: user.id } });

  if (existingTasks.length === 0 && todoColumn) {
    await prisma.task.createMany({
      data: [
        {
          title: 'Leer documentación de NestJS',
          description: 'Revisar conceptos básicos de GraphQL',
          columnId: todoColumn.id,
          userId: user.id,
        },
        {
          title: 'Configurar Docker',
          description: 'Contenedor para DB y app',
          columnId: todoColumn.id,
          userId: user.id,
        },
      ],
    });
  }

  console.log(`✅ Seed completado. ID del usuario: ${user.id}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
