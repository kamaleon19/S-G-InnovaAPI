import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CommonService } from 'src/common/common.service';

import { Project } from './entities/project.entity'
import { User } from 'src/auth/entities/user.entity';
;
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class ProjectsService {

  constructor(

    @InjectRepository( Project )
    private readonly projectRepository: Repository<Project>,

    private readonly commonService: CommonService

  ){}

 async create(createProjectDto: CreateProjectDto, user: User) {
    
    try {

      const project = this.projectRepository.create( {...createProjectDto, user  } )
    await this.projectRepository.save( project )

    return {
      id: project.id, // Hago el retorno de esta manera para que el ID del proyecto aparezca primero.
      ...project,
    };


    } catch (error) {
      this.commonService.handleDbExceptions( error )
    }
  }

 async findAll( paginationDto: PaginationDto ) {
    
    try {

    const { limit= 10, offset= 0 } = paginationDto

    const  projects = await this.projectRepository.find({
      take: limit,
      skip: offset,
    })
    
    return projects

    } catch (error) {
      this.commonService.handleDbExceptions( error )
    }
 }


 async findOne(id: string) {
   
    const project = await this.projectRepository.findOneBy( { id } )
    
    if( !project ){
      throw new BadRequestException(`Product with id: ${id} not found.`)
    }

    return project  


  }

 async  update(id: string, updateProjectDto: UpdateProjectDto) {
    
    const project = await this.projectRepository.preload({id, ...updateProjectDto})

    if( !project ){
      throw new BadRequestException(`Product with id: ${id} not found.`)
    }

    await this.projectRepository.save(project)

    return project
  }

 async remove(id: string) {

    const project = await this.findOne( id )
    await this.projectRepository.remove(project)

  }

}
