import { ArrayUnique, IsEnum } from "class-validator"
import { Action } from "src/roles/enum/actions.emum"
import { Ressource } from "src/roles/enum/ressources.enum"

export class CreatePermissionDto {
    @IsEnum(Ressource)
    ressource:Ressource

    @IsEnum(Action,{each:true})
    @ArrayUnique()
    actions:Action[]
}
