import { IsEmail, IsEmpty, IsString, Matches, matches, MinLength } from "class-validator"


export class CreateUserDto {

 
    @IsString()
    username: string


   
    @IsEmail()
    email:string

    @IsString() 
    password:string
}
