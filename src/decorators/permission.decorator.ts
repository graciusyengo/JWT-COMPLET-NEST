import { SetMetadata } from "@nestjs/common";
import { CreatePermissionDto } from  "../permissions/dto/create-permission.dto"


export const PERMISSIONS_KEY="permissions"

export const Permissions=(permissions:CreatePermissionDto[])=>
    SetMetadata(PERMISSIONS_KEY,permissions)
