import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';


import { Project } from './entities/project.entity'
;
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProjectsService {

  constructor(

    @InjectRepository( Project )
    private readonly projectRepository: Repository<Project>
  ){}

 async create(createProjectDto: CreateProjectDto, user: User) {
    
    const project = this.projectRepository.create( {...createProjectDto, user  } )
    await this.projectRepository.save( project )

    return {
      id: project.id, // Hago el retorno de esta manera para que el ID del proyecto aparezca primero.
      ...project,
      user_id: user.id // Aqui retorno el Id del usuario que tiene asignado este proyecto.
    };
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
