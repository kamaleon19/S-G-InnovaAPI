import { ApiProperty } from "@nestjs/swagger"

import { IsString, MinLength } from "class-validator"

export class CreateProjectDto {


    @ApiProperty({
        description: 'Nombre del proyecto',
        minLength: 1,
        example: 'Proyecto starling'
    })
    @IsString()
    @MinLength(1)
    name: string


    @ApiProperty({
        description: 'Descripcion del proyecto',
        minLength: 1,
        example: 'Breve descripcion'
    })
    @IsString()
    @MinLength(1)
    description: string


    @ApiProperty({
        description: 'Fecha de inicio del proyecto',
        example: '25/05/2024'
    })
    @IsString()
    start_date: string


    @ApiProperty({
        description: 'Fecha de finalizacion del proyecto',
        example: '30/05/2024'
    })
    @IsString()
    end_date: string

}
