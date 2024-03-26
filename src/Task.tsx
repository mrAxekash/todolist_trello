import * as React from 'react';
import {ChangeEvent, FC, memo, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    deleteTask: (taskID: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
    onChangeTaskTitle: (taskID: string, newTitle: string) => void
};
export const Task: FC<TaskPropsType> = memo(({task, deleteTask, changeTaskStatus, onChangeTaskTitle}) => {

    const onClickHandler = () => {
        deleteTask(task.id)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, ) => {
        changeTaskStatus(task.id, e.currentTarget.checked)
    }

    const changeTaskTitle = useCallback((newTitle: string) => {
        onChangeTaskTitle(task.id, newTitle)
    }, [onChangeTaskTitle, task.id])

    return (<li key={task.id} className={task.isDone ? 'is-done' : ''}>
        <Checkbox color={'primary'} checked={task.isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan  oldTitle={task.title} onClick={changeTaskTitle}/>
        <IconButton onClick={onClickHandler} >
            <Delete/>
        </IconButton>
    </li>)

});