export class ProductDetail{
    ProductID: String
    ProductName: String
    ProductImg: String
    ProductDesc: String
    ProductPrice: Number

    constructor(init?: Partial<ProductDetail>) {
        Object.assign(this, init);
    }
}

export class ProductList{
    ClassName: String
    Products: ProductDetail[]
    constructor(init?: Partial<ProductList>) {
        Object.assign(this, init);
    }
}
