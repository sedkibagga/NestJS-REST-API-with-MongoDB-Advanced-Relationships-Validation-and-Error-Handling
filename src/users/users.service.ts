import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dtos/User.dto';
import { UserDocument } from 'src/schemas/User.schema';
import { UpdateUserDto } from './dtos/User.dto';
import { UserSettings, UserSettingsDocument } from 'src/schemas/UserSettings.schema';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument> , @InjectModel(UserSettings.name) private userSettingModel : Model <UserSettingsDocument> ) {} 

   async  createUser ({settings , ...CreateUserDto} : CreateUserDto) : Promise<UserDocument> {  //({settings , ...CreateUserDto} : CreateUserDto) that is mean we are passing settings and rest of the data in CreateUserDto destructuring 
    if (settings) { 
        const existingUser = this.userModel.findOne({username : CreateUserDto.username}).exec();
        if (!existingUser) {
        const newSettings = new this.userSettingModel(settings); 
        const savedSettings = await newSettings.save(); 
        const newUser = new this.userModel({...CreateUserDto, settings : savedSettings._id});
        return newUser.save();
        } else { 
            throw new HttpException('User already exists', 400);
        }
    } {
        const newUser = new this.userModel(CreateUserDto);
        return newUser.save();
    }    

    } 
    async getUsers() : Promise<UserDocument[]> {
        return await this.userModel.find().populate(['settings', 'posts']).exec();
    } 

    async getUsersByName(username: string): Promise<UserDocument[]> {
        try {
            const existingUser = await this.userModel.find({ username: username }).exec();
            if (!existingUser || existingUser.length === 0) { 
                throw new HttpException('User does not exist', 404); 
            }
            return existingUser;
        } catch (error) {
            throw new HttpException(error.message, 400); 
        }
    }
    
    async getUserById(id : string) : Promise<UserDocument> {
        try { 
            const existingUser: UserDocument = await this.userModel.findById(id).populate('settings').exec();
            if (!existingUser ) {
                throw new HttpException('User does not exist', 400);    
            }
            return existingUser;

        
        } catch (error) {
            throw new HttpException(error, 400);
        }
    } 

    async updateUserById(userUpdated: UpdateUserDto, id: string): Promise<UserDocument> {
        try {
            const existingUser : UserDocument = await this.userModel.findById(id).exec();
            if (!existingUser) {
                throw new HttpException('User does not exist', 404);
            }
    
            const updatedUser: UserDocument = await this.userModel.findByIdAndUpdate(id, userUpdated, { new: true }).exec();
            if (!updatedUser) {
                throw new HttpException('Failed to update user', 400);
            }
    
            return updatedUser.save ();
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    } 

    async deleteUserById (id : string) : Promise<UserDocument> {
        
    
        const existingUser = await this.userModel.findById(id).exec(); 
        if (!existingUser) {
            throw new HttpException('User does not exist', 404);
        }
        return await this.userModel.findByIdAndDelete(id).exec();
    } 

}
