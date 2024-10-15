import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { Ressource } from './roles/enum/ressources.enum';
import { Action } from './roles/enum/actions.emum';
import { Permissions } from './decorators/permission.decorator';
import { AuthorizationGuard } from './guards/authorization.guard';


@UseGuards(AuthGuard,AuthorizationGuard)
@Controller('create/agence')
export class AppController {
  constructor(private readonly appService: AppService) {}
 @Permissions([{ressource:Ressource.agences,actions:[Action.create]}])

  @Get()
  someProtectedRoute(@Req() req){
    return {
      message:"ressource protected",userId: req.userId
    }
  }
}
