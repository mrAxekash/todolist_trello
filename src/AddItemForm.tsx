import * as React from 'react';
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    addItem: (title:string) => void
};
export const AddItemForm = (props: Props) => {

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
        setErrorMessage(null)
        if(e.key === 'Enter') {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value)
    }


    return (
        <div>
            <input
                value={taskName}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                className={errorMessage !== null ? 'error' : ''}
            />
            <Button title={'+'} onClick={addTask}/>
            {errorMessage && <div className={'error-message'}>{errorMessage}</div>}
        </div>
    );
};