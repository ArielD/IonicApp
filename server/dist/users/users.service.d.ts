import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<any>;
    findOneByUsername(username: any): Model<User>;
    findOneById(id: any): Model<User>;
    updateUser(updatedUser: User): Model<User>;
    deleteUser(id: any): Promise<any>;
}
