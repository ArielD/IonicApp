import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
export declare class UsersService {
    private readonly productModel;
    constructor(productModel: Model<User>);
    findAll(): Promise<User[]>;
}
