import {CreateUserDto } from "..";
import { IsString, ValidateNested, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @ValidateNested()
    user: CreateUserDto;
}
