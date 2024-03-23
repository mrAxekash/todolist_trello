import * as React from 'react';
import Button from '@mui/material/Button';
import {FilterValueType} from "../AppWithRedux";
import { memo} from "react";

type ButtonProps = {
    title: string
    className?: string
    onClick: () => void
    variant: 'contained' | 'text'
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    filterButton: FilterValueType
};

export const ButtonMemo = memo(({onClick, title, className, variant,filterButton, ...props }: ButtonProps) => {
    console.log('ButtonMemo')

    return (
        <Button
            onClick={onClick}
            className={className}
            variant={variant}
            color={props.color}
        >
            {title}
        </Button>
    );
});
