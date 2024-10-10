import { User } from "src/auth/entities/user.entity"
import { Project } from "src/projects/entities/project.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'text',
        nullable: false
    })
    name: string

    @Column({
        type: 'text'
    })
    description: string

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
