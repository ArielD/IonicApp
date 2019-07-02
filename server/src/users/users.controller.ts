import { Controller, Get, Post, Body, Query, Res, HttpStatus, UseGuards, Param } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Get('getUserById')
    async getUserById(@Query() _id) {
        return await this.usersService.findOneById(_id);
    }

    @Get('getUserByUsername')
    async getUserByUsername(@Query() username) {
        return await this.usersService.findOneByUsername(username);
    }

    @Post('updateUser')
    async updateUser(@Body() updatedUser, @Res() res) {   
        return await this.usersService.updateUser(updatedUser).then((data) => {
            return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: data, message: 'nice' });
        }, (err) => {
            return res.status(HttpStatus.BAD_REQUEST).json({ status: HttpStatus.BAD_REQUEST, message: 'damn' })
        })
    }

    @Get('deleteUser')
    async deleteUser(@Query() _id, @Res() res) {
        return await this.usersService.deleteUser(_id).then((data) => {
            return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: data, message: 'nice' });
        }, (err) => {
            return res.status(HttpStatus.BAD_REQUEST).json({ status: HttpStatus.BAD_REQUEST, message: 'damn' })
        })
    }

    @Post('image')
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './uploads/avatars',
                filename: (req, file, cb) => {
                    return cb(null, `${req.query._id}${'.gif'}`)
                }
            })
        }
    )
    )
    uploadImg(@Query() id, @UploadedFile() file, @Res() res) {
    }

    @Get('uploads/avatars/:id')
    async serveImage(@Param('id') id, @Res() res): Promise<any> {
        res.sendFile(id + '.gif', { root: 'uploads/avatars' }, (err) => {
            if (err) {
                res.sendFile('default.gif', { root: 'uploads/avatars' });
            }
        });
    }
}