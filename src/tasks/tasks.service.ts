import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Task } from './entities/task.entity';
import { User } from 'src/auth/entities/user.entity';

import { ProjectsService } from 'src/projects/projects.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';


@Injectable()
export class TasksService {

  constructor(

    @InjectRepository( Task )
    private readonly taskRepository: Repository<Task>,

    @InjectRepository( User )
    private readonly userRepository: Repository< User >,

    private readonly projectService: ProjectsService,


  ){}


 async create(createTaskDto: CreateTaskDto) {

    try {

      const { user_id, project_id, ...taskData} = createTaskDto

      const user = await this.userRepository.findOneBy( {id: user_id} )
      if(!user)
        throw new BadRequestException(`User whith id: ${user_id} not found. `)


      const project = await this.projectService.findOne( project_id )

      const task = await this.taskRepository.create({
        ...taskData,
        user,
        project
      })

      await this.taskRepository.save( task )

      return {
        id: task.id,
        ...task,
        message: 'New task assigned.'
      }


    } catch (error) {
      
    }
  }

 async findAll( taskFilter: TaskFilterDto ) {
    const tasks = await this.taskRepository.find({ where : { project: taskFilter}})
    return tasks
  }

 async update(id: string, updateTaskDto: UpdateTaskDto) {

    const task = await this.taskRepository.preload({ id, ...updateTaskDto })

    if(!task){
      throw new BadRequestException(`Product with id: ${id} not found.`)
    }

    await this.taskRepository.save( task )

    return{
      task,
      message: 'Status of task actualized'
    }


  }

}
