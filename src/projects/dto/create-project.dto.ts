import { IsString, MinLength } from "class-validator"

export class CreateProjectDto {

    @IsString()
    @MinLength(1)
    name: string

    @IsString()
    @MinLength(1)
    description: string

    @IsString()
    start_date: string

    @IsString()
    end_date: string

}
