import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/users/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DatabaseSeederService {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async seed() {
    const adminExists = await this.userModel.findOne({
      email: 'admin@admin.com',
    });

    if (adminExists) {
      this.logger.log('Admin user already exists. Skipping seed.');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = new this.userModel({
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    await adminUser.save();
    this.logger.log(
      'Admin user created: admin@admin.com / password: admin123',
    );
  }
}
