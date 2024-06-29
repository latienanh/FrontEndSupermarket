type CategoryRequest = {
    parentId?: string | null;
    name: string;
    describe: string;
    image: File | null;
};

export { CategoryRequest };
