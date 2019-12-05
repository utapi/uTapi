import { ProductClass, ProductDetail } from './types';

export const PRODUCTSDETAIL = [
    new ProductDetail({
        productID: "01", 
        productName:"北海道ミルク黒糖タピオカ入り", 
        productImg: "assets/goods/1.jpeg", 
        productDesc: "北海道産牛乳と、沖縄産黒糖の優しい甘さがタピオカを包み込み、シンプルなのに濃厚な味がする一品です。",
        productPrice: 480,
        classID: "01"
    }),
    new ProductDetail({
        productID: "02", 
        productName:"紫（タロイモ）ミルク", 
        productImg: "assets/goods/2.jpeg", 
        productDesc: "台湾原産高品質タロイモを使用しています。乾燥させた後、細かく粉状にし、北海道産牛乳と黒糖タピオカと組み合わせて独特な香りや味わいで、やみつきになる一品です。",
        productPrice: 520,
        classID: "01"
    }),
    new ProductDetail({
        productID: "03", 
        productName:"抹茶ミルクティー", 
        productImg: "assets/goods/3.jpeg", 
        productDesc: "当店人気No.2!生産量日本一の抹茶の里、西尾で育まれた抹茶は甘み･旨味が豊かで、濃厚な風味と鮮やかな緑色が特徴です!甘いタピオカを抹茶の風味が包み、とてもまろやかな味わいでまさに相性抜群な一杯です。",
        productPrice: 580,
        classID: "01"
    }),
    new ProductDetail({
        productID: "04", 
        productName:"楊枝甘露（ヤンジカンロ）", 
        productImg: "assets/goods/4.jpeg", 
        productDesc: "マンゴーを使った香港発祥、台湾でも大人気の「楊枝甘露」ドリンクです。マンゴーピューレをベースに、混ぜ合わせたココナッツと北海道産牛乳に、﻿角切りにしたマンゴー、ほぐしたルビーグレープフルーツ、西米（﻿小粒タピオカ）を加えた爽やかな味わいです。",
        productPrice: 580,
        classID: "02"
    }),
]

export const PRODUCTCLASS: ProductClass[] = [
    {
        classID: "01",
        className: "季節のおすすめ",
    },
    {
        classID: "02",
        className: "楊枝甘露（ヤンジカンロ）毎日数量限定",
    }
];
