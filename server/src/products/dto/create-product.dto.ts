export class CreateProductDto {
    readonly _id?: string;
    readonly title: string;
    readonly price: number;
    readonly description: string;
    readonly ingredients: string[];
  }