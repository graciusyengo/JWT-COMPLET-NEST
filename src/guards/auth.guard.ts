import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    private configService:ConfigService
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('Extracted token:', token); // Ajoute ceci pour voir le token extrait
    if (!token) {
      throw new UnauthorizedException(`Token invalide`);
    }
    try {
        const secret= this.configService.get<string>('JWT_SECRET')
      const payload =  this.jwtService.verify(token,{secret});
      console.log('Payload:', payload); // Ajoute ceci pour vérifier si la vérification du token fonctionne
      request.userId=payload.userId
    } catch (e) {
        Logger.error(e.message)
      throw new UnauthorizedException(`token invalide`);
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }


  //Create Role module with mnecessary methode
  // create A custom @Permission decorator 

  //Authorization Guard
}
