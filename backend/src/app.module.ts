import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { SeederModule } from '@/common/seeder/seeder.module';
import { ContactModule } from '@/contacts/contact.module';
import { PublicationsModule } from '@/publications/publications.module';
import { GalleryModule } from '@/gallery/gallery.module';
import { ContentModule } from '@/content/content.module';
import databaseConfig from '@/config/database.config';
import jwtConfig from '@/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, jwtConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.uri'),
      }),
    }),
    AuthModule,
    UsersModule,
    SeederModule,
    ContactModule,
    PublicationsModule,
    GalleryModule,
    ContentModule,
  ],
})
export class AppModule {}
