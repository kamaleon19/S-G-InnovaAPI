import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Project } from "src/projects/entities/project.entity"
import { Task } from "src/tasks/entities/task.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:         string

    @Column({
        type:    'text',
        nullable: false
    })
    name:     string

    @Column({
        type:    'text',
        unique:   true,
        nullable: false
    })
    email:      string

    @Column({
        type:   'text',
        select:  false // No retornare la contraseña cuando haga consultas a la DB
    })
    password: string

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
