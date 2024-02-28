import * as React from 'react';
import './App.css'
import {FilterValueType} from "./App";
import {useState, KeyboardEvent, ChangeEvent} from "react";
import {Button} from "./Button";

type PropsType = {
    todolistID: string
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (newFilterValue: FilterValueType, todolistId: string) => void
    addTask: (todolistId: string, taskName:string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newStatus: boolean) => void
    deleteTodolist: (todolistId: string) => void
};
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (props: PropsType) => {
    const [taskName, setTaskName] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const deleteTask = (taskId: string) => {
        props.removeTask(props.todolistID, taskId)
    }
    const addTask = () => {
        if(taskName.trim() !== '') {
            props.addTask(props.todolistID, taskName.trim())
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
    const changeFilterTaskHandler = (filteredValue: FilterValueType) => {
        props.changeFilter(filteredValue, props.todolistID)
    }

    const deleteTodolist = () => {
        props.deleteTodolist(props.todolistID)
    }

    return (
        <div className={'todolist'}>
            <h3>
                {props.title}
                <Button title={'x'} onClick={deleteTodolist}/>
            </h3>

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
            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => {
                        deleteTask(task.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, ) => {
                        props.changeTaskStatus(props.todolistID, task.id, e.currentTarget.checked)
                    }
                    return (<li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{task.title}</span>
                        <Button title={'✖️'} onClick={onClickHandler}/>
                    </li>)
                })}
            </ul>
            <div>
                <Button title={'All'} onClick={() => changeFilterTaskHandler('all')} className={props.filter === 'all' ? 'active-filter': ''}/>
                <Button title={'Active'} onClick={() => changeFilterTaskHandler('active')} className={props.filter === 'active' ? 'active-filter': ''}/>
                <Button title={'Completed'} onClick={() => changeFilterTaskHandler('completed')} className={props.filter === 'completed' ? 'active-filter': ''}/>
            </div>
        </div>
    );
};