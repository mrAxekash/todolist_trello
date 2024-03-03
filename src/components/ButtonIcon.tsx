import * as React from 'react';
import Button from '@mui/material/Button';

type ButtonProps = {
    title: string
    className?: string
    onClick: () => void
};
export const ButtonIcon = ({onClick, title, className}: ButtonProps) => {
    return (
        <Button onClick={onClick} className={className}>
            {title}
        </Button>
    );
};