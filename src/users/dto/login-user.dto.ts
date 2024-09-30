import { IsEmail, IsEmpty, IsString, Matches, matches, MinLength } from "class-validator"


export class LoginUserDto {

 
   
    @IsEmail()
    email:string

    @IsString() 
    password:string
}
