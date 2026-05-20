import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseSeederService } from './database.seeder';
import { User, UserSchema } from '@/users/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [DatabaseSeederService],
  exports: [DatabaseSeederService],
})
export class SeederModule {}
