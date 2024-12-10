import Category from './Category';
export interface Product {
    barCode: string;
    name: string;
    slug: string;
    image: string;
    describe: string;
    quantity: number;
    price: number;
    categories: Category[];
    variants: Variant[];
    productUnits: ProductUnit[];
    id: string;
}
export interface Variant {
    barCode: string;
    name: string;
    slug: string;
    image: string;
    describe: string;
    quantity: number;
    price: number;
    categories: Category[];
    variantValues: VariantValue[];
    productUnits: ProductUnit[];
    id: string;
}
export interface VariantValue {
    attributeId: string;
    attributeValueName: string;
}
export interface Unit {
    id: string;
    isDelete: boolean;
    createBy: string;
    createTime: string;
    deleteBy: string | null;
    unitName: string;
}

export interface Price {
    id: string;
    isDelete: boolean;
    createBy: string;
    createTime: string;
    deleteBy: string | null;
    purchasePrice: number;
    salePrice: number;
}

export interface ProductUnit {
    id: string;
    isDelete: boolean;
    createBy: string;
    createTime: string;
    deleteBy: string | null;
    conversionRate: number;
    unit: Unit;
    prices: Price[];
}
