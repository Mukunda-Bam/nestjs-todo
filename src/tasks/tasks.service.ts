import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTodos() {
    return this.prisma.task.findMany();
  }

  async getTodoById(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTodo(createTodoDto: createTaskDto) {
    return this.prisma.task.create({
      data: {
        task: createTodoDto.task,
        description: createTodoDto.description,
        completed: createTodoDto.completed,
      },
    });
  }

  async updateTodo(id: number, updateTodoDto: updateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.prisma.task.update({
      where: { id },
      data: {
        task: updateTodoDto.task || task.task,
        description: updateTodoDto.description || task.description,
        completed: updateTodoDto.completed ?? task.completed,
      },
    });
  }

  async deleteTodo(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
