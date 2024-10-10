import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';

import { Task } from './entities/task.entity';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    AuthModule,

    ProjectsModule,
    
    TypeOrmModule.forFeature( [ Task ])


  ]
})
export class TasksModule {}
