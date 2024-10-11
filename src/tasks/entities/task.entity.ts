import { ApiProperty } from "@nestjs/swagger"

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { User } from "src/auth/entities/user.entity"
import { Project } from "src/projects/entities/project.entity"

@Entity()
export class Task {


    @ApiProperty({
        description: 'Task Id',
        example: 'b983bf34-e59f-4d8b-ab2d-f40c0244460e',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string


    @ApiProperty({
        description: 'Nombre de la tarea',
        example: 'Cerrar la puerta',
    })
    @Column({
        type: 'text',
        nullable: false
    })
    name: string


    @ApiProperty({
        description: 'Descripcion de la tarea',
        example: 'Breve descripcion',
    })
    @Column({
        type: 'text'
    })
    description: string


    @ApiProperty({
        description: 'Estado de la tarea',
        example: 'Completed',
    })
    @Column({
        type: 'text'
    })
    status: string

    @ManyToOne(
        () => Project,
        ( project ) => project.task,
        { eager: true}
    )
    project: Project

    @ManyToOne(
        () => User,
        ( user ) => user.task,
        { eager: true }
    )
    user: User
}
