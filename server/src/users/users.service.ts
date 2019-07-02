import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto) {
    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOneByUsername(username): Model<User> {
    return await this.userModel.findOne({username: username});
  }

  async findOneById(id): Model<User> {
    return await this.userModel.findOne({_id: id});
  }

  async updateUser(updatedUser: User): Model<User> {   
    const newUser = await this.userModel.updateOne({ _id: updatedUser._id }, updatedUser, { upsert: true });
    if (newUser) {
      return updatedUser;
    }
  }

  async deleteUser(id) {
    console.log(id);
    return await this.userModel.deleteOne({_id: id})
  }

}