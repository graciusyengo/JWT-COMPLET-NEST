import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSIONS_KEY } from 'src/decorators/permission.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {


    constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if(!request.userId){
        throw new NotFoundException(`L'utilisateur n'exite pas `)
    }

    const requiredRoutePermissions= this.reflector.getAllAndOverride(PERMISSIONS_KEY,[context.getHandler(),context.getClass()])
    console.log(requiredRoutePermissions)
    return true
  }
}