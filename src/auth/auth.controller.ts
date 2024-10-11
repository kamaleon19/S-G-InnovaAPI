import { Controller, Post, Body} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


import { AuthService } from './auth.service';

import { User } from './entities/user.entity';

import { CreateUserDto, LoginUserDto } from './dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Login de usuario'})
  @ApiResponse({ status: 201, description: 'Usuario Creado', type: User})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Registro de usuario'})
  @ApiResponse({ status: 201, description: 'Usuario logeado', type: User})
  @ApiResponse({ status: 400, description: 'Bad request'})
  loginUser(@Body() loginUserDto: LoginUserDto ){
    return this.authService.login( loginUserDto )
  }


}
