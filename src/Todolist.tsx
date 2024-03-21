import * as React from 'react';
import './App.css'
import {FilterValueType} from "./App";
import {ChangeEvent, memo, useCallback} from "react";

import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import {Delete} from "@mui/icons-material";

type PropsType = {
    todolistID: string
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    onChangeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeFilter: (newFilterValue: FilterValueType, todolistId: string) => void
    addTask: (todolistId: string, taskName:string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newStatus: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
};
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = memo((props: PropsType) => {
    console.log('todolist called')
    const deleteTask = (taskId: string) => {
        props.removeTask(props.todolistID, taskId)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistID, title)
    }, [props.addTask, props.todolistID])

    const changeFilterTaskHandler = (filteredValue: FilterValueType) => {
        props.changeFilter(filteredValue, props.todolistID)
    }

    const deleteTodolist = () => {
        props.deleteTodolist(props.todolistID)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle)
    }

    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan oldTitle={props.title} onClick={changeTodolistTitle}/>
                <IconButton onClick={deleteTodolist} >
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => {
                        deleteTask(task.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, ) => {
                        props.changeTaskStatus(props.todolistID, task.id, e.currentTarget.checked)
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        props.onChangeTaskTitle(props.todolistID, task.id, newTitle)
                    }
                    return (<li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <Checkbox color={'primary'} checked={task.isDone} onChange={changeTaskStatusHandler} />
                        <EditableSpan  oldTitle={task.title} onClick={changeTaskTitle}/>
                        <IconButton onClick={onClickHandler} >
                            <Delete/>
                        </IconButton>
                    </li>)
                })}
            </ul>
            <div>
                <Button
                    onClick={() => changeFilterTaskHandler('all')}
                    variant={props.filter === 'all' ? 'contained': 'text'}
                >
                     All
                </Button>
                <Button
                    onClick={() => changeFilterTaskHandler('active')}
                    className={props.filter === 'active' ? 'active-filter': ''}
                    variant={props.filter === 'active' ? 'contained': 'text'}
                    color={'error'}
                >
                    Active
                </Button>
                <Button
                    onClick={() => changeFilterTaskHandler('completed')}
                    className={props.filter === 'completed' ? 'active-filter': ''}
                    variant={props.filter === 'completed' ? 'contained': 'text'}
                    color={'success'}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});