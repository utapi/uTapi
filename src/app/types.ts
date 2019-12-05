export class ProductDetail {
    productID: String
    productName: String
    productImg: String
    productDesc: String
    productPrice: Number
    productNumber: any
    classID: String
    constructor(init?: Partial<ProductDetail>) {
        Object.assign(this, init);
    }
}

export class ProductClass {
    classID: String
    className: String
    constructor(init?: Partial<ProductClass>) {
        Object.assign(this, init);
    }
}

export class ShoppingCart {
    productID: String
    productNumber: Number
    constructor(init?: Partial<ShoppingCart>) {
        Object.assign(this, init);
    }
}
