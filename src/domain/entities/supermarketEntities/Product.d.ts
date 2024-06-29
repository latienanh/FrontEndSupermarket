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
    id: string;
}
export interface VariantValue {
    attributeId: string;
    attributeValueName: string;
}
