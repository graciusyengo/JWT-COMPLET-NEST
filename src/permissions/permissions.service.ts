import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  async createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    // Transformer le DTO en entité
    const permission = new Permission();
    permission.ressource = createPermissionDto.ressource;
    permission.setActions(createPermissionDto.actions);

    if (createPermissionDto.roleId) {
      const role = await this.roleRepository.findOne({
        where: { id: createPermissionDto.roleId },
      });

      if (!role) {
        throw new NotFoundException('role introuvable');
      }
      permission.role = role;
    }

    // Si votre fonction attend un tableau, vous devez l'envelopper dans un tableau
    const savedPermission = await this.permissionRepository.save(permission);
    return savedPermission; // Retourner la première permission si nécessaire
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
