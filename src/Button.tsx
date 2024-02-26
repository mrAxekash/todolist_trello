import * as React from 'react';

type ButtonProps = {
    title: string
    className?: string
    onClick: () => void
};
export const Button = (props: ButtonProps) => {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.title}
        </button>
    );
};