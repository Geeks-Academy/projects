import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDto).save(err => {
      if (err) console.log('Error:' + err.message);
    });
    return newUser;
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.userModel
      .findById(userId)
      .exec()
      .catch(err => err.message);
    return user;
  }

  async addProject(userId: number, projectId): Promise<User> {
    const updatedUser = await this.userModel
    .findByIdAndUpdate({ _id: userId }, { $push: { projects: projectId }})
    .exec()
    .catch(err => err.message);
    return updatedUser;
  }

  async removeProject(userId: number, projectId: number): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate({ _id: userId }, { $pull: { projects: projectId }})
      .exec()
      .catch(err => err.message);
    return updatedUser;
  }

  async remove(userId: number): Promise<any> {
    const deletedUser = await this.userModel
      .findByIdAndDelete(userId)
      .exec()
      .catch(err => err.message);
    return deletedUser;
  }
}
