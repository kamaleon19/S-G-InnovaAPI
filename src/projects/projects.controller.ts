import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { Auth } from 'src/auth/decorators';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

import { User } from 'src/auth/entities/user.entity';
import { Project } from './entities/project.entity';

import { ValidRoles } from 'src/auth/interfaces';


@ApiTags('Project')
@Auth( ValidRoles.admin )
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un proyecto'})
  @ApiResponse({ status: 201, description: 'Projecto creado', type: Project})
  @ApiResponse({ status: 400, description: 'Bad request'})
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado y/o autorizado'})
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: User                                // Utilizo el decorador GetUser para obtener info del usuario, en este caso el Id para asociarlo a un proyecto.
  ) {
    return this.projectsService.create(createProjectDto, user );
  }

  @Get()
  @ApiOperation({ summary: 'Devuelve todos los proyectos'})
  @ApiResponse({ status: 200, description: 'Proyectos encontrados', type : Project})
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado y/o autorizado'})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.projectsService.findAll( paginationDto); 
  }


  @Get(':id')
  @ApiOperation({ summary: 'Devuelve un proyecto en especifico(Id)'})
  @ApiResponse({ status: 200, description: 'Proyecto encontrado', type : Project})
  @ApiResponse({ status: 400, description: 'Proyecto no encontrado.'})
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado y/o autorizado'})
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un proyecto'})
  @ApiResponse({ status: 200, description: 'Proyecto actualizado', type : Project})
  @ApiResponse({ status: 400, description: 'Proyecto no encontrado'})
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado y/o autorizado'})
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Borra un proyecto'})
  @ApiResponse({ status: 200, description: 'Proyecto borrado'})
  @ApiResponse({ status: 400, description: 'Proyecto no encontrado'})
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado y/o autorizado'})
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.projectsService.remove(id);
  }
}
