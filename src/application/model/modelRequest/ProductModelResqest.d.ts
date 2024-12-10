type ProductCreateRequest = {
    barCode: string;
    name: string;
    slug: string;
    image: File | null;
    describe: string;
    categoriesId: string[];
    defaultUnit: Unit;
    additionalUnits?: Unit[];
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
    id: string | undefined;
    barCode: string;
    name: string;
    slug: string;
    price: number;
    image: File | null;
    defaultUnit: Unit;
    additionalUnits?: Unit[];
    describe: string;
    categoriesId: string[];
};
type Unit = {
    name: string;
    quantity: number;
    price: number;
};

export { ProductCreateRequest, ProductUpdateRequest, variantRequest, variantValueRequest };
