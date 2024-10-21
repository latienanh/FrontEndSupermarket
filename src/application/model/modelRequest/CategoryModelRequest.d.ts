type CategoryRequest = {
    id?: string;
    parentId?: string | null;
    name: string;
    describe: string;
    image: File | null;
};

export { CategoryRequest };
