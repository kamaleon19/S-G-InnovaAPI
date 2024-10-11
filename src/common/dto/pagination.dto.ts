import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsPositive } from "class-validator"

export class PaginationDto {

    @ApiProperty({
        default: 10,
        description: 'Cantidad de columnas a mostrar'
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?:  number


    @ApiProperty({
        default: 0,
        description: 'Cantidad de columnas a saltar'
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    offset?: number
}