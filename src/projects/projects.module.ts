import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [

    CommonModule,

    AuthModule,

    TypeOrmModule.forFeature([ Project ])
  ]
})
export class ProjectsModule {}
