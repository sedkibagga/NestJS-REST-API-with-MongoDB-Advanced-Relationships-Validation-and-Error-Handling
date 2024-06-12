import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [MongooseModule.forRoot('your mongodb account', 
    {
      dbName : 'nesjs-tutorial',
    }
  ), UsersModule, PostsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
