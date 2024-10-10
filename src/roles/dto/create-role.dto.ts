import { ArrayUnique, IsEnum, IsString, ValidateNested } from "class-validator";
import { Ressource } from "../enum/ressources.enum";
import { Action } from "../enum/actions.emum";
import { Type } from "class-transformer";

export class CreateRoleDto {

    @IsString()
    name:string

    @ValidateNested()
    @Type(()=>Permission)
    permissi
    on:Permission
}
export class Permission{
    @IsEnum(Ressource)
    ressource:Ressource

    @IsEnum(Action,{each:true})
    @ArrayUnique()
    actions:Action[]
}
