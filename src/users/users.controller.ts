import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos/User.dto';
import { UserDocument } from 'src/schemas/User.schema';
import mongoose from 'mongoose';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post()
   async  createUser(@Body() createUser : CreateUserDto) : Promise<UserDocument> { 
        
      return await this.usersService.createUser(createUser);

    } 

    @Get() 
    async getUsers() {
        return await  this.usersService.getUsers();
        
    } 

    @Get('username/:username') 
    async getUsersByName(@Param('username') username : string) {
        return await this.usersService.getUsersByName(username);
        
    } 
    @Get('id/:id') 
    async getUserById(@Param('id') id: string): Promise<UserDocument> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new Error('Invalid ID');
        } else {
            return await this.usersService.getUserById(id);
        }
    } 

    @Patch('id/:id') 
    async updateUserById(@Body() userUpdated: UpdateUserDto, @Param('id') id: string): Promise<UserDocument> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new Error('Invalid ID');  
        } else {
            return await this.usersService.updateUserById(userUpdated, id);
        }
    } 

    @Delete('id/:id') 
    async deleteUserById(@Param('id') id: string) : Promise<UserDocument> {
       const isValid = mongoose.Types.ObjectId.isValid(id);
       if (!isValid) {
           throw new Error('Invalid ID');
       } else {
           return await this.usersService.deleteUserById(id);   
       }
}   

}
