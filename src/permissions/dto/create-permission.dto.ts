import { Optional } from "@nestjs/common"
import { ArrayUnique, IsEnum, IsUUID } from "class-validator"
import { Action } from "src/roles/enum/actions.emum"
import { Ressource } from "src/roles/enum/ressources.enum"
import { UUID } from "typeorm/driver/mongodb/bson.typings"

export class CreatePermissionDto {
    @IsEnum(Ressource)
    ressource:Ressource

    @IsEnum(Action,{each:true})
    @ArrayUnique()
    actions:Action[]

    @Optional()
    @IsUUID()
    roleId?:string
 

}
