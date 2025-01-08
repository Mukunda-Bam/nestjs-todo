import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Controller('todos')
export class TasksController {
  constructor(private readonly todoService: TasksService) {}

  @Get()
  async getTodos() {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  async getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  async createTodo(@Body() createTodoDto: createTaskDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  @Put(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: updateTaskDto,
  ) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
