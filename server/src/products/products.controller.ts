import { Controller, Get, Post, Body, Query, Res, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { Param } from '@nestjs/common';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';

@Controller('products')
export class ProductsController {
    SERVER_URL: string = "http://localhost:3000/";

    constructor(
        private readonly productsService: ProductsService
    ) { }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Post('createProduct')
    async create(@Body() createProductDto: CreateProductDto, @Res() res) {
        this.productsService.create(createProductDto).then((data) => {
            return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: data, message: 'nice' });
        }, (err) => {
            return res.status(HttpStatus.BAD_REQUEST).json({ status: HttpStatus.BAD_REQUEST, message: 'damn' })
        });
    }

    @Get('getProduct')
    async getProduct(@Query() _id): Promise<Product> {
        return this.productsService.findProduct(_id);
    }

    @Post('getProductsById')
    async getProductsById(@Body() idArr, @Res() res): Promise<Product[]> {
        return this.productsService.findAllProductsById(idArr.ids).then((data) => {
            return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: data, message: 'nice' });
        }, (err) => {
            return res.status(HttpStatus.BAD_REQUEST).json({ status: HttpStatus.BAD_REQUEST, message: 'damn' })
        });
    }

    @Post('updateProduct')
    async updateProduct(@Body() updatedProduct: Product, @Res() res): Promise<Product> {
        return this.productsService.updateProduct(updatedProduct).then((data) => {
            return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: data, message: 'nice' });
        }, (err) => {
            return res.status(HttpStatus.BAD_REQUEST).json({ status: HttpStatus.BAD_REQUEST, message: 'damn' })
        })
    }

    @Get('deleteProduct')
    async deleteProduct(@Query() model: {_id: string}): Promise<{}> {
        return this.productsService.deleteProduct(model._id);
    }

    @Post('image')
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    return cb(null, `${req.query._id}${'.gif'}`)
                }
            })
        }
    )
    )
    uploadImg(@Query() id, @UploadedFile() file, @Res() res) {
        // this.productsService.setImage(id, `${this.SERVER_URL}${'uploads/' + file.filename + '.gif'}`).then((data) => {
        //     return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: data, message: 'nice' });
        // });
    }

    @Get('uploads/:id')
    async serveImage(@Param('id') id, @Res() res): Promise<any> {
        res.sendFile(id + '.gif', { root: 'uploads' }, (err) => {
            if (err) {
                res.sendFile('noimage.gif', { root: 'uploads' });
            }
        });
    }
}