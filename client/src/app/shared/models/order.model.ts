export class OrderModel {
    status: number;
    totalPrice: number;
    products: productsId;
}

export class productsId {
    _id: string;
    quantity: number;
}