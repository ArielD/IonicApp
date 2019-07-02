import { AuthService } from './auth.service';
import { LoginUserDto } from '../products/dto/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto, res: any): Promise<any>;
    getuCurrentUser(res: any, token: any): Promise<void>;
}
