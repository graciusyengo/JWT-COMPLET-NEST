import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { RefreshToken } from './refresh-token/entities/refresh-token.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ResetTokensModule } from './reset-tokens/reset-tokens.module';
import { ResetToken } from './reset-tokens/entities/reset-token.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { Role } from './roles/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';

  
@Module({
  
  imports: [
TypeOrmModule.forRootAsync({
  imports:[ConfigModule],
  inject:[ConfigService],
  useFactory:(configService:ConfigService)=>({
    type: configService.get<string>('DB_TYPE') as 'mysql',
    host: configService.get<string>('DB_HOST'),
    port:configService.get<number>('DB_PORT'),
    username:configService.get<string>('DB_USERNAME'),
    password:configService.get<string>('DB_PASSWORD'),
    database:configService.get<string>('DB_DATABASE'),
    entities: [User,RefreshToken,ResetToken,Role,Permission],
    synchronize: false,
  }),
  }),
  MailerModule.forRoot({
    transport: {
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  }),
  UsersModule, AuthModule, RefreshTokenModule, ResetTokensModule, RolesModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService,JwtService],
})
export class AppModule {}
