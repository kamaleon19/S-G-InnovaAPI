import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

// Este servicio se encarga de manejar los errores cuando hay registros duplicados en la DB.

@Injectable()
export class CommonService {

     handleDbExceptions(error: any) {

        if (error.code === '23505') {
          throw new BadRequestException(error.detail);
        }
    
        throw new InternalServerErrorException('Please check server logs.');
      }


}
