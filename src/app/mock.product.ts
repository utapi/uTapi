import { ProductClass, ProductDetail } from './types';

export const PRODUCTSDETAIL = [
    new ProductDetail({
        ProductID: "01", 
        ProductName:"北海道ミルク黒糖タピオカ入り", 
        ProductImg: "assets/goods/1.jpeg", 
        ProductDesc: "北海道産牛乳と、沖縄産黒糖の優しい甘さがタピオカを包み込み、シンプルなのに濃厚な味がする一品です。",
        ProductPrice: 480,
        ClassID: "01"
    }),
    new ProductDetail({
        ProductID: "02", 
        ProductName:"紫（タロイモ）ミルク", 
        ProductImg: "assets/goods/2.jpeg", 
        ProductDesc: "台湾原産高品質タロイモを使用しています。乾燥させた後、細かく粉状にし、北海道産牛乳と黒糖タピオカと組み合わせて独特な香りや味わいで、やみつきになる一品です。",
        ProductPrice: 520,
        ClassID: "01"
    }),
    new ProductDetail({
        ProductID: "03", 
        ProductName:"抹茶ミルクティー", 
        ProductImg: "assets/goods/3.jpeg", 
        ProductDesc: "当店人気No.2!生産量日本一の抹茶の里、西尾で育まれた抹茶は甘み･旨味が豊かで、濃厚な風味と鮮やかな緑色が特徴です!甘いタピオカを抹茶の風味が包み、とてもまろやかな味わいでまさに相性抜群な一杯です。",
        ProductPrice: 580,
        ClassID: "01"
    }),
    new ProductDetail({
        ProductID: "04", 
        ProductName:"楊枝甘露（ヤンジカンロ）", 
        ProductImg: "assets/goods/4.jpeg", 
        ProductDesc: "マンゴーを使った香港発祥、台湾でも大人気の「楊枝甘露」ドリンクです。マンゴーピューレをベースに、混ぜ合わせたココナッツと北海道産牛乳に、﻿角切りにしたマンゴー、ほぐしたルビーグレープフルーツ、西米（﻿小粒タピオカ）を加えた爽やかな味わいです。",
        ProductPrice: 580,
        ClassID: "02"
    }),
]

export const PRODUCTCLASS: ProductClass[] = [
    {
        ClassID: "01",
        ClassName: "季節のおすすめ",
    },
    {
        ClassID: "02",
        ClassName: "楊枝甘露（ヤンジカンロ）毎日数量限定",
    }
];
