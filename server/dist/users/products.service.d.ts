import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findProduct(id: string): Promise<Product>;
    updateProduct(updatedProduct: Product): Promise<Product>;
    deleteProduct(id: string): Promise<{}>;
    setImage(id: string, imgUrl: string): Promise<Product>;
}
