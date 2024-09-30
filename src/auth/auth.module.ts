import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { ConfigService,ConfigModule } from '@nestjs/config';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { ResetToken } from 'src/reset-tokens/entities/reset-token.entity';
import { ResetTokensModule } from 'src/reset-tokens/reset-tokens.module';

@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      inject:[ConfigService],
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
      secret: configService.get<string>('JWT_SECRET'),
      
    }),
  }),
    TypeOrmModule.forFeature([User,RefreshToken,ResetToken]),
    ResetTokensModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
