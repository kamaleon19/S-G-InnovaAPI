import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

import { ProjectsService } from './projects.service';

import { ProjectsController } from './projects.controller';

import { Project } from './entities/project.entity';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [

    CommonModule,

    AuthModule,

    TypeOrmModule.forFeature([ Project ])
  ],
  exports: [ ProjectsService, TypeOrmModule ]
})
export class ProjectsModule {}
