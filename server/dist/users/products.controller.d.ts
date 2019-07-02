import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
export declare class ProductsController {
    private readonly productsService;
    SERVER_URL: string;
    constructor(productsService: ProductsService);
    findAll(): Promise<Product[]>;
    create(createProductDto: CreateProductDto, res: any): Promise<void>;
    getProduct(_id: any): Promise<Product>;
    updateProduct(updatedProduct: Product, res: any): Promise<Product>;
    deleteProduct(model: {
        _id: string;
    }): Promise<{}>;
    uploadImg(id: any, file: any, res: any): void;
    serveImage(id: any, res: any): Promise<any>;
}
