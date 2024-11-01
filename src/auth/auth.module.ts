import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { CommonModule } from 'src/common/common.module';

import { User } from './entities/user.entity';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy ],
  imports: [

    CommonModule,

    ConfigModule,

    TypeOrmModule.forFeature([ User ]),

    PassportModule.register({ defaultStrategy: 'jwt'}), // Defino la estrategia de autenticacion.


    JwtModule.registerAsync({ // Defino como estara firmado mi token y el tiempo de expiracion.
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService) => {

        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })


  ],
  exports: [ TypeOrmModule, JwtStrategy, PassportModule, JwtModule, AuthService ]
})
export class AuthModule {}
