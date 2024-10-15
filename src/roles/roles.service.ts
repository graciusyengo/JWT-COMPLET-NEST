import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Role) private readonly roleRepository:Repository<Role>){}
  
 async create(createRoleDto: CreateRoleDto) {
    return  await this.roleRepository.save(createRoleDto)
  }

 async  findAll() {
    return await this.roleRepository.find();
  }

  async  findRoleAndPermissions() {
    return await this.roleRepository.find({relations:['permissions']});
  }


  async getRoleById(roleId:string){
    return await this.roleRepository.findOne({
      where:{
        id:roleId,
      },
      relations:['permissions']
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
