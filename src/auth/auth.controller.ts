import { BadRequestException, Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateRefreshTokenDto } from 'src/refresh-token/dto/create-refresh-token.dto';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ForgotPasswordDto } from 'src/users/dto/forget-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() credentialUser: LoginUserDto) {
    return await this.authService.login(credentialUser);
  }

  @Post('refresh')
  async refreshToken(@Body() createRefreshTokenDto:CreateRefreshTokenDto) {
    return await this.authService.refreshToken(createRefreshTokenDto.refreshToken);
  }

@UseGuards(AuthGuard)
  @Put('change-password')
  async changePassword(@Body() changePasswordDto:ChangePasswordDto,@Req() req) {
    return await this.authService.changePassword(req.userId,changePasswordDto.oldPassword,changePasswordDto.newPassword);
  }



  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto:ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto.email);
  }
}
