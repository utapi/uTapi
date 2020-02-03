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


export class AddressInfo {
    fullName: String
    postalCode: String
    prefectures: String
    city: String
    building: String
    phoneNumber: String
    constructor(init?: Partial<AddressInfo>) {
        Object.assign(this, init);
    }
}

export class CreditInfo {
    cardHolder: String
    cardNumber: String
    expirationYear: String
    expirationMonth: String
    constructor(init?: Partial<CreditInfo>) {
        Object.assign(this, init);
    }
}
