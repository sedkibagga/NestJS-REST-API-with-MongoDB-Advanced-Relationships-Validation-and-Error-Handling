import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
export class CreateUserSettingsDto {

    @IsOptional() 
    @IsBoolean()
     receiveNotifications?: boolean; 

    @IsOptional()
    @IsBoolean()
    receiveEmails?: boolean; 

    @IsOptional()
    @IsBoolean()
    receiveSms?: boolean;
}
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsString()
    @IsOptional()
    displayName?: string; 
   @IsOptional() 
   @ValidateNested() 
   @Type(() => CreateUserSettingsDto) // transform the object to CreateUserSettingsDto
    settings?: CreateUserSettingsDto;
  
} 

export class UpdateUserDto {
    @IsOptional() 
    @IsString() 
    displayName?: string; 

    @IsOptional() 
    @IsString() 
    avatarUrl?: string;
} 




