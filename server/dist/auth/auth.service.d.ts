import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../products/dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUserByPassword(loginAttempt: LoginUserDto): Promise<{
        expiresIn: number;
        token: string;
    }>;
    validateUserByJwt(payload: JwtPayload): Promise<{
        expiresIn: number;
        token: string;
    }>;
    createJwtPayload(user: any): {
        expiresIn: number;
        token: string;
    };
    decode(token: any): Promise<any>;
}
