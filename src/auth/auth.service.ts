import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {

  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    private readonly commonService: CommonService

  ) {}

  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      delete user.password; // no devolvere la contraseña

      return {
        ...user,
        token: this.getJwt({ id: user.id })
      };

    } catch (error) {

      this.commonService.handleDbExceptions( error )

    }
  }

  async login(loginUserDto: LoginUserDto) {


    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, id: true, password: true, name: true },
    });

    if (!user)
      throw new UnauthorizedException('Credenciales invalidas(email).');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales invalidas(contraseña).');

    return {
      ...user,
      token: this.getJwt({ id: user.id })
    };

  }


  private getJwt( payload: JwtPayload){ // Este metodo genera el JWT.
    const token = this.jwtService.sign( payload )
    return token
  }

}
