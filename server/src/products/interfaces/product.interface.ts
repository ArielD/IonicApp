import { Document } from 'mongoose';

export interface Product extends Document {
  readonly _id: string;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly ingredients: string[];
}