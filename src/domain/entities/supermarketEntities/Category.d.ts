export default interface Categories {
    id: string;
    name: string;
    describe: null;
    image: string;
    categoryChildren: Category[];
    createBy: string;
    createTime: string;
}
export default interface Category {
    id: string;
    parentId: string;
    name: string;
    describe: null;
    image: string;
    createBy: string;
    createTime: string;
}
