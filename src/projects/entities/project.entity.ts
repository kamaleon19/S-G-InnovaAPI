import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { User } from "src/auth/entities/user.entity"

@Entity()
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id:           string

    @Column({
        type:    'text',
        nullable: false,
        unique:   true
    })
    name:         string

    @Column({
        type:    'text',
        nullable: false
    })
    description:  string

    @Column({
        type:    'text'
    })
    start_date:   string

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

}
