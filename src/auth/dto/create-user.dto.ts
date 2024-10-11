import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {

    @ApiProperty({
        description: 'Nombre del usuario',
        minLength: 1,
        example: 'Lucas Martinez'
    })
    @IsString()
    @MinLength(1)
    name:     string


    @ApiProperty({
        description: 'Nombre del usuario',
        uniqueItems: true,
        example: 'alguien@gmail.com'
    })
    @IsEmail()
    @IsString()
    email:      string


    @ApiProperty({
        description: 'Contraseña del usuario (La contraseña debe contener mayusculas, minusculas letras y numeros)',
        minLength: 6,
        maxLength: 50,
        example: '$2b$10$VqGtsixgGXS.i9mlo6Zoru8rDWDBqB0cNaLqbIHV8i0rGKkduY8F2'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { // Esto es una expresion regular que le agrega mas condiciones o validaciones a esta propiedad del DTO.
        message: 'La contraseña debe contener mayusculas, minusculas letras y numeros'
    })
    password: string

}
