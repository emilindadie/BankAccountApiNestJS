import {CreateUserDto } from "..";
import { IsString, ValidateNested, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @ValidateNested()
    user: CreateUserDto;
}
