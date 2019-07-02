import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<any>;
    getUserById(_id: any): Promise<any>;
    getUserByUsername(username: any): Promise<any>;
    updateUser(updatedUser: any, res: any): Promise<any>;
    deleteUser(_id: any, res: any): Promise<any>;
    uploadImg(id: any, file: any, res: any): void;
    serveImage(id: any, res: any): Promise<any>;
}
