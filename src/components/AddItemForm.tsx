import * as React from 'react';
// import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from "react";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";


type Props = {
    addItem: (title:string) => void
};
export const AddItemForm = memo( (props: Props) => {
    console.log('add item form')
    const [taskName, setTaskName] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const addTask = () => {
        if(taskName.trim() !== '') {
            props.addItem(taskName.trim())
            setTaskName('')
        } else {
            setErrorMessage('This field is required')
        }

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement> ) => {
        if(errorMessage) {
            setErrorMessage(null)
        }
        if(e.charCode === 13) {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value)
    }


    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                value={taskName}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                error={!!errorMessage}
                helperText={errorMessage}
            />
            <IconButton onClick={addTask} color={'primary'}>
                <AddBox/>
            </IconButton>
        </div>
    );
})