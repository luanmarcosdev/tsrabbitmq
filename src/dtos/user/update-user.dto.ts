import { IsOptional, IsString, Length } from "class-validator";

export class UserUpdateDto {
    
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    @Length(10, 15)
    phone?: string;

}