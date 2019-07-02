import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  public temp = [];
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findProduct(id: string): Promise<Product> {
    return await this.productModel.findOne({ _id: id })
  }

  async findAllProductsById(idArr: string[]): Promise<Product[]> {
    return await this.productModel.find({ _id:  {"$in" : idArr} });
  }

  async updateProduct(updatedProduct: Product): Promise<Product> {
    const newProduct = await this.productModel.updateOne({ _id: updatedProduct._id }, updatedProduct, { upsert: true });
    if (newProduct) {
      return updatedProduct;
    }
  }

  async deleteProduct(id: string): Promise<{}> {
    return await this.productModel.deleteOne({ _id: id });
  }

}