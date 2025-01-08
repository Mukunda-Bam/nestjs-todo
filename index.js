import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const newTask = await prisma.task.create({
    data: {
      task: 'Learn prisma',
      description: 'Learn how to interact with database using prisma',
      completed: false,
    },
  });
  console.log('New task:', newTask);

  const tasks = await prisma.task.findMany();
  console.log('All tasks:', tasks);

  const updatedTask = await prisma.task.update({
    where: { id: newTask.id },
    data: { completed: true, completedAt: new Date() },
  });
  console.log('Updated Task:', updatedTask);

  const deletedTask = await prisma.task.delete({
    where: { id: newTask.id },
  });
  console.log('Deleted task:', deletedTask);
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
