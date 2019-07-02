import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../products/dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUserByPassword(loginAttempt: LoginUserDto): Promise<{expiresIn: number, token: string}> {
    let userToAttempt = await this.usersService.findOneByUsername(loginAttempt.username);

    return new Promise((resolve) => {
      userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
        if (err) throw new UnauthorizedException();
        if (isMatch) {
          resolve(this.createJwtPayload(userToAttempt));
        } else {
          throw new UnauthorizedException();
        }
      });
    });
  }

  async validateUserByJwt(payload: JwtPayload) {
    let user = await this.usersService.findOneByUsername(payload.username);
    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  createJwtPayload(user) {
    let data: JwtPayload = {
      username: user.username
    };
    let jwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      token: jwt
    }
  }

  async decode(token): Promise<any> {
    let decodeUsername: any = this.jwtService.decode(token.token);
    return this.usersService.findOneByUsername(decodeUsername.username);
  }
}