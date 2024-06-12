import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/Posts.dto';

@Controller('posts')
export class PostsController {
    constructor( private postsService : PostsService) {} 
    @Post() 
    createPost(@Body() createPostDto : CreatePostDto) {
        return this.postsService.createPost(createPostDto);
    }
}
