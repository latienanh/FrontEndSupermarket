import React, { ReactNode } from 'react';

type InputProps = {
    Title: string;
    Error?: string | undefined;
    Type: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    Id: string;
    AutoComplete: string;
    style?: string;
    Value?: string;
};
type ButtonProps = {
    Title: string;
    onClick: () => void;
    BackgroundColor?: string;
    HoverColor?: string;
    Icon?: string;
    style?: string;
};

type InputImageProps = {
    Title: string;
    onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
    removeFile: () => void;
    style?: string;
};
type NavigationMenuProps = {
    name: string;
    linkUrl: string;
    icon: string;
};
type NavigationMenuDropDownProps = {
    collapseTarget: string;
    name: string;
    icon: string;
    children: ReactNode;
};
type DropDownMenuProps = {
    name: string;
    linkUrl: string;
};
export {
    InputProps,
    NavigationMenuProps,
    DropDownMenuProps,
    NavigationMenuDropDownProps,
    InputImageProps,
    ButtonProps,
};
