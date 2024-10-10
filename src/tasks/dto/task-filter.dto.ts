import { IsUUID } from "class-validator";

export class TaskFilterDto{

    @IsUUID()
    id: string
    
}