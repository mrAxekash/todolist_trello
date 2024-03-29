import * as React from 'react';
import {ChangeEvent, memo, useState} from "react";
import {TextField} from "@mui/material";

export type EditableSpanProps = {
    oldTitle: string
    onClick: (newValue: string) => void
};
export const EditableSpan = memo(({oldTitle, onClick}: EditableSpanProps) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    const [newTitle, setNewTitle] = useState(oldTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onChangeEditMode = () => {
        setEditMode(!editMode)
        // if(editMode) {
            onClick(newTitle)
        // }
    }

    return (
        <>
            {editMode ?
                <TextField value={newTitle}
                           onBlur={onChangeEditMode}
                           autoFocus
                           onChange={onChangeHandler} />
                :
                <span
                    onDoubleClick={onChangeEditMode}
                >
                    {oldTitle}
                </span>
            }
        </>
    );
});