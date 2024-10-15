import { Optional } from "@nestjs/common"
import { IsEmail, IsEmpty, IsString, IsUUID, Matches, matches, MinLength } from "class-validator"


export class CreateUserDto {

    @IsString()
    username: string

    @IsEmail()
    email:string

    @IsString() 
    password:string

    @Optional()
    @IsUUID()
    roleId?:string
      
}
