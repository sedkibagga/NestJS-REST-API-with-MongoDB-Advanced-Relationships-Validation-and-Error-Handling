import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from './dtos/Posts.dto';
import { User } from 'src/schemas/User.schema';
@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel : Model<Post> , @InjectModel(User.name) private userModel : Model<User>) {}

    async createPost({userId , ...createPostDto}: CreatePostDto) : Promise<Post> { 
        const existingUser = await this.userModel.findById(userId); 
        if (!existingUser) {
            throw new HttpException('User does not exist', 404);
        } else {
            const newPost = new this.postModel(createPostDto); 
            const savedPost = await newPost.save(); 
            await existingUser.updateOne({$push : {posts : savedPost._id}}); //$push pushes the value in the array instead of using posts.push
            return savedPost;
        }
    } 

    async findPostsById() {}
}
