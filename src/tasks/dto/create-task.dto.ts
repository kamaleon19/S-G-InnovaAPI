import { IsIn, IsString, IsUUID, MinLength } from "class-validator"


export class CreateTaskDto {

    @IsString()
    @MinLength(1)
    name: string

    @IsString()
    @MinLength(1)
    description: string

    @IsIn(['pending', 'in progress', 'completed'])
    status: string

    @IsUUID()
    project_id: string

    @IsUUID()
    user_id: string
}
