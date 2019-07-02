import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    SERVER_URL: string;
    constructor(userService: UsersService);
    findAll(): Promise<User[]>;
}
