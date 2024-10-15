import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { PERMISSIONS_KEY } from 'src/decorators/permission.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.userId) {
      throw new NotFoundException(`L'utilisateur n'existe pas`);
    }

    // Récupérer les permissions requises pour la route
    const requiredRoutePermissions = this.reflector.getAllAndOverride(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log("###### Permissions requises:", requiredRoutePermissions);

    // Attendre la résolution des permissions utilisateur
    const userPermissions = await this.authService.getUserPermission(request.userId);
    console.log("{{{{{ Permissions utilisateur:", userPermissions);


    return true;
  }
}
