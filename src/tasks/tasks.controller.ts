import { Controller, Get, Post, Body, Patch, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TasksService } from './tasks.service';

import { Task } from './entities/task.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Task')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}



  @Auth( ValidRoles.admin )
  @Post()
  @ApiOperation({ summary: 'Crea una tarea'})
  @ApiResponse({ status: 201, description: 'Tarea creada', type: Task})
  @ApiResponse({ status: 400, description: 'Bad request'})
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado y/o autorizado'})
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Auth()
  @Get()
  @ApiOperation({ summary: 'Trae todas las tareas filtradas por proyecto'})
  @ApiResponse({ status: 200, description: 'Tareas encontradas', type: Task})
  @ApiResponse({ status: 400, description: 'Tareas no encontradas'})
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado y/o autorizado'})
  findAll(@Query() taskFilter: TaskFilterDto) {
    return this.tasksService.findAll( taskFilter );
  }

  @Auth()
  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza el estado de una tarea'})
  @ApiResponse({ status: 200, description: 'Tarea actualizada', type: Task})
  @ApiResponse({ status: 400, description: 'Tarea no encontrada'})
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado y/o autorizado'})
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

}
