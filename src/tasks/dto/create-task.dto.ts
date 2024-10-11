import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsString, IsUUID, MinLength } from "class-validator"


export class CreateTaskDto {


    @ApiProperty({
        description: 'Nombre de la tarea',
        minLength: 1,
        example: 'Cerrar la puerta'
    })
    @IsString()
    @MinLength(1)
    name: string


    @ApiProperty({
        description: 'Descripcion de la tarea',
        minLength: 1,
        example: 'Breve descripcion'
    })
    @IsString()
    @MinLength(1)
    description: string


    @ApiProperty({
        description: 'Estado de la tarea',
        example: 'Completed'
    })
    @IsIn(['pending', 'in progress', 'completed'])
    status: string


    @ApiProperty({
        description: 'Proyect Id',
        example: '926f58ed-dc03-4ef9-be46-b27f2800de5b'
    })
    @IsUUID()
    project_id: string


    @ApiProperty({
        description: 'User Id',
        example: '926f58ed-dc03-4ef9-be46-b27f2800de5b'
    })
    @IsUUID()
    user_id: string
}
