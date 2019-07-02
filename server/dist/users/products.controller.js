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
var _a, _b, _c;
const common_1 = require("@nestjs/common");
const create_product_dto_1 = require("./dto/create-product.dto");
const products_service_1 = require("./products.service");
const product_interface_1 = require("./interfaces/product.interface");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
        this.SERVER_URL = "http://localhost:3000/";
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productsService.findAll();
        });
    }
    create(createProductDto, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.productsService.create(createProductDto).then((data) => {
                return res.status(common_1.HttpStatus.OK).json({ status: common_1.HttpStatus.OK, data: data, message: 'nice' });
            }, (err) => {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ status: common_1.HttpStatus.BAD_REQUEST, message: 'damn' });
            });
        });
    }
    getProduct(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productsService.findProduct(_id);
        });
    }
    updateProduct(updatedProduct, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productsService.updateProduct(updatedProduct).then((data) => {
                return res.status(common_1.HttpStatus.OK).json({ status: common_1.HttpStatus.OK, data: data, message: 'nice' });
            }, (err) => {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ status: common_1.HttpStatus.BAD_REQUEST, message: 'damn' });
            });
        });
    }
    deleteProduct(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productsService.deleteProduct(model._id);
        });
    }
    uploadImg(id, file, res) {
        this.productsService.setImage(id, `${this.SERVER_URL}${'uploads/' + file.filename + '.gif'}`).then((data) => {
            return res.status(common_1.HttpStatus.OK).json({ status: common_1.HttpStatus.OK, data: data, message: 'nice' });
        });
    }
    serveImage(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.sendFile(id + '.gif', { root: 'uploads' }, (err) => {
                if (err) {
                    res.sendFile('noimage.gif', { root: 'uploads' });
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
], ProductsController.prototype, "findAll", null);
__decorate([
    common_1.Post('createProduct'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    common_1.Get('getProduct'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    common_1.Post('updateProduct'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof product_interface_1.Product !== "undefined" && product_interface_1.Product) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    common_1.Get('deleteProduct'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    common_1.Post('image'),
    common_3.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                return cb(null, `${req.query._id}${'.gif'}`);
            }
        })
    })),
    __param(0, common_1.Query()), __param(1, common_3.UploadedFile()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "uploadImg", null);
__decorate([
    common_1.Get('uploads/:id'),
    __param(0, common_2.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "serveImage", null);
ProductsController = __decorate([
    common_1.Controller('products'),
    __metadata("design:paramtypes", [typeof (_c = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _c : Object])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map