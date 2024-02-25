import * as React from 'react';
import './App.css'
import {FilterValueType} from "./App";
import {useState, KeyboardEvent, ChangeEvent} from "react";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (newFilterValue: FilterValueType) => void
    addTask: (taskName:string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
};
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (props: PropsType) => {
    const [taskName, setTaskName] = useState('')
    const deleteTask = (id: string) => {
        props.removeTask(id)
    }
    const addTask = () => {
        props.addTask(taskName)
        setTaskName('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement> ) => {
        if(e.key === 'Enter') {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value)
    }

    const changeFilterTaskHandler = (filteredValue: FilterValueType) => {
        props.changeFilter(filteredValue)
    }



    return (
        <div className={'todolist'}>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={taskName}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => {
                        deleteTask(task.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, ) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                    }
                    return (<li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{task.title}</span>
                        <button onClick={onClickHandler}>✖️</button>
                    </li>)
                })}
            </ul>
            <div>
                <button onClick={() => changeFilterTaskHandler('all')}>All</button>
                <button onClick={() => changeFilterTaskHandler('active')}>Active</button>
                <button onClick={() => changeFilterTaskHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};