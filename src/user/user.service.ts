import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // create user
    return;
  }

  async findOne(userId: number): Promise<User> {
    // get user
    return;
  }

  async addProject(userId: number, projectId): Promise<User> {
    // add project to user's project list
    return;
  }

  async removeProject(userId: number, projectId: number): Promise<User> {
    // remove project from user's projects list
    return;
  }

  async remove(userId: number): Promise<any> {
    // remove user
    return
  }
}
