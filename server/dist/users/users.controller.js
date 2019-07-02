"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.findAll();
        });
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.create(createUserDto);
        });
    }
    getUserById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findOneById(_id);
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findOneByUsername(username);
        });
    }
    updateUser(updatedUser, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.updateUser(updatedUser).then((data) => {
                return res.status(common_1.HttpStatus.OK).json({ status: common_1.HttpStatus.OK, data: data, message: 'nice' });
            }, (err) => {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ status: common_1.HttpStatus.BAD_REQUEST, message: 'damn' });
            });
        });
    }
    deleteUser(_id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.deleteUser(_id).then((data) => {
                return res.status(common_1.HttpStatus.OK).json({ status: common_1.HttpStatus.OK, data: data, message: 'nice' });
            }, (err) => {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ status: common_1.HttpStatus.BAD_REQUEST, message: 'damn' });
            });
        });
    }
    uploadImg(id, file, res) {
    }
    serveImage(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.sendFile(id + '.gif', { root: 'uploads/avatars' }, (err) => {
                if (err) {
                    res.sendFile('default.gif', { root: 'uploads/avatars' });
                }
            });
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Get('getUserById'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    common_1.Get('getUserByUsername'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByUsername", null);
__decorate([
    common_1.Post('updateUser'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    common_1.Get('deleteUser'),
    __param(0, common_1.Query()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    common_1.Post('image'),
    common_2.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.diskStorage({
            destination: './uploads/avatars',
            filename: (req, file, cb) => {
                return cb(null, `${req.query._id}${'.gif'}`);
            }
        })
    })),
    __param(0, common_1.Query()), __param(1, common_2.UploadedFile()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "uploadImg", null);
__decorate([
    common_1.Get('uploads/avatars/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "serveImage", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map