import { Configurable } from "./product";

export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
    quantity: number;
    configId?: number
    configurables?: Configurable[]
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
    paymentIntendId?: string
    clientSecret?: string
}
