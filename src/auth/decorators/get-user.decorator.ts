import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";



export const GetUser = createParamDecorator( // El fin de este decorador es retornar el usuario de las rutas en las cuales esta autenticado.
    ( data : string, context: ExecutionContext ) =>{ 

        const req = context.switchToHttp().getRequest() // accedemos a la request mediante context(contexto) usando estos metodos.
        const user = req.user // una vez que accedemos al request podemos acceder al usuario.

        if(!user){
            throw new InternalServerErrorException('User not found (request)')
        }

        return ( !data )
            ? user 
            : user[data]
    }
)