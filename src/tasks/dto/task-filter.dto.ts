import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class TaskFilterDto{

    @ApiProperty({
        description: 'Id del proyecto para filtrar',
        example: '926f58ed-dc03-4ef9-be46-b27f2800de5b'
    })
    @IsUUID()
    id: string
    
}