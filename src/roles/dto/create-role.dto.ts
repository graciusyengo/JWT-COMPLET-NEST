import { ArrayUnique, IsEnum, IsString, ValidateNested } from "class-validator";
import { Ressource } from "../enum/ressources.enum";
import { Action } from "../enum/actions.emum";
import { Type } from "class-transformer";
import { CreatePermissionDto } from "src/permissions/dto/create-permission.dto";

export class CreateRoleDto {

    @IsString()
    name:string

    @ValidateNested()
    @Type(()=>CreatePermissionDto)
    permission:CreatePermissionDto
}

