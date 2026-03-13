import { IsEmail, IsString, Length } from "class-validator";

export class UserCreateDto {
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    phone!: string;

    @IsString()
    @Length(5,20)
    username!: string;
}