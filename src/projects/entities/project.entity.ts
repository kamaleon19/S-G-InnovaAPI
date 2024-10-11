import { ApiProperty } from "@nestjs/swagger"

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { User } from "src/auth/entities/user.entity"
import { Task } from "src/tasks/entities/task.entity"

@Entity()
export class Project {


    @ApiProperty({
        description: 'Project ID',
        example: '11c796ca-95e0-466a-ba65-879c6288b9b2',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id:           string


    @ApiProperty({
        description: 'Nombre del proyecto',
        example: 'Proyecto starling',
        uniqueItems: true
    })
    @Column({
        type:    'text',
        nullable: false,
        unique:   true
    })
    name:         string


    @ApiProperty({
        description: 'Descripcion del proyecto',
        example: 'Breve descripcion',
    })
    @Column({
        type:    'text',
        nullable: false
    })
    description:  string


    @ApiProperty({
        description: 'Fecha de inicio del proyecto',
        example: '19/08/2024',
    })
    @Column({
        type:    'text'
    })
    start_date:   string


    @ApiProperty({
        description: 'Fecha de finalizacion del proyecto',
        example: '25/08/204',
    })
    @Column({
        type:    'text'
    })
    end_date:     string

    
    @ManyToOne(
        () => User,
        ( user ) => user.project,
        { eager: true } // Esta configuracion cargara automaticamente la relacion
        
    )
    user: User

    @OneToMany(
        () => Task,
        (task) => task.project,
        { eager: false }
    )
    task: Task

}
