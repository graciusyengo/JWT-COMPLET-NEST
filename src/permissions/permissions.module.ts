import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Module({

  imports: [TypeOrmModule.forFeature([Permission,Role])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports:[PermissionsService]
})
export class PermissionsModule {}
