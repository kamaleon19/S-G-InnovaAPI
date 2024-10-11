import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {

    @ApiProperty({
        description: 'Email del usuario',
        example: 'alguien@gmail.com'
    })
    @IsString()
    @IsEmail()
    email:      string


    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '$2b$10$.LxWcUXV4/HqMk1PZj9Jx.mPhGtkH7TATi4MYqmoZCh2S6Ap/bRUW'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string
}