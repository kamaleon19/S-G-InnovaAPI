import { ApiProperty } from "@nestjs/swagger"

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Project } from "src/projects/entities/project.entity"
import { Task } from "src/tasks/entities/task.entity"

@Entity()
export class User {

    @ApiProperty({
        example: 'b983bf34-e59f-4d8b-ab2d-f40c0244460e',
        description: 'User ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id:         string

    @ApiProperty({
        example: 'Juan Perez',
        description: 'Nombre de usuario',
    })
    @Column({
        type:    'text',
        nullable: false
    })
    name:     string

    @ApiProperty({
        example: 'alguien@gmail.com',
        description: 'Email del usuario',
        uniqueItems: true
    })
    @Column({
        type:    'text',
        unique:   true,
        nullable: false
    })
    email:      string

    @ApiProperty({
        example: '$2b$10$VqGtsixgGXS.i9mlo6Zoru8rDWDBqB0cNaLqbIHV8i0rGKkduY8F2',
        description: 'Contraseña del usuario',
    })
    @Column({
        type:   'text',
        select:  false // No retornare la contraseña cuando haga consultas a la DB
    })
    password: string

    @ApiProperty({
        example: '[admin, user ]',
        description: 'Rol de usuario',
    })
    @Column({
        type:    'text',
        array:    true,
        default: ['user']
    })
    rol:        string[]

    
    @OneToMany(
        () => Project,
        ( project ) => project.user,
        {
            eager: false,
            cascade: true
        }
        
    )
    project: Project


    @OneToMany(
        () => Task,
        ( task ) => task.user,
        { eager: false }
    )
    task: Task

    @BeforeInsert()  // Antes de insertar o actualizar el email en la DB lo paso a minusculas.
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim()
    }

    @BeforeUpdate()
    checkFieldBeforeUpdate(){
        this.checkFieldsBeforeInsert
    }
}
