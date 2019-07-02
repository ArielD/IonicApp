import { Controller, Get, Post, Body, Query, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../products/dto/login-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  @Post()
  async login(@Body() loginUserDto: LoginUserDto, @Res() res) {
    return await this.authService.validateUserByPassword(loginUserDto).then((data) => {
      return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: data, message: 'nice' });
    }, (err) => {
      return res.status(HttpStatus.BAD_REQUEST).json({ status: HttpStatus.BAD_REQUEST, message: 'damn' })
    });
  }

  @Post('getUser')
  public async getuCurrentUser(@Res() res, @Body() token: any) {
    return this.authService.decode(token).then(
        (data) => {
          res.status(HttpStatus.OK).json(data);
        },
        (err) => {
             res.status(HttpStatus.UNAUTHORIZED).json({ status: HttpStatus.BAD_REQUEST, message: 'damn' });
        }
    );

}
}