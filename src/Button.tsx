import * as React from 'react';

type ButtonProps = {
    title: string
    className?: string
    onClick: () => void
};
export const Button = ({onClick, title, className}: ButtonProps) => {
    return (
        <button className={className} onClick={onClick}>
            {title}
        </button>
    );
};