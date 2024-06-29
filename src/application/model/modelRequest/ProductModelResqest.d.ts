type ProductCreateRequest = {
    barCode: string;
    name: string;
    slug: string;
    price: number;
    image: File | null;
    describe: string;
    categoriesId: string[];
    variants?: variantRequest[] | null;
};
type variantRequest = {
    barCode: string;
    name: string;
    slug: string;
    price: number;
    describe: string;
    image: File | null;
    variantValues: variantValueRequest[];
};
type variantValueRequest = {
    attributeId: string;
    variantValue: string;
};
type ProductUpdateRequest = {
    barCode: string;
    name: string;
    slug: string;
    price: number;
    image: File | null;
    describe: string;
    categoriesId: string[];
};

export { ProductCreateRequest, ProductUpdateRequest, variantRequest, variantValueRequest };
