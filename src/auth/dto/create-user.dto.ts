import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    name:     string

    @IsEmail()
    @IsString()
    email:      string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { // Esto es una expresion regular que le agrega mas condiciones o validaciones a esta propiedad del DTO.
        message: 'La contraseña debe contener mayusculas, minusculas letras y numeros'
    })
    password: string

}
