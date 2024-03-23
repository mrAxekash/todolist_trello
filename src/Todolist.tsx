import * as React from 'react';
import './App.css'
import {FilterValueType} from "./App";
import {memo, useCallback, useMemo} from "react";

import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import {ButtonMemo} from "./components/ButtonIcon";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";

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

    const deleteTask = useCallback((taskId: string) => {
        props.removeTask(props.todolistID, taskId)
    }, [props.todolistID, props.removeTask])

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistID, title)
    }, [props.addTask, props.todolistID])

    const changeTaskStatus = useCallback((taskId: string, newStatus: boolean) => {
        props.changeTaskStatus(props.todolistID, taskId, newStatus)
    }, [props.changeTaskStatus, props.todolistID])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string) => {
        props.onChangeTaskTitle(props.todolistID, taskID, newTitle)
    }, [props.onChangeTaskTitle, props.todolistID])

    const changeFilterTaskHandler = useCallback ((filteredValue: FilterValueType) => {
        props.changeFilter(filteredValue, props.todolistID)
    }, [props.changeFilter, props.todolistID])

    const deleteTodolist = useCallback(() => {
        props.deleteTodolist(props.todolistID)
    }, [props.deleteTodolist, props.todolistID])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle)
    }, [props.todolistID, props.changeTodolistTitle])

    let allTasksForTodolist = props.tasks

    // useMemo(() => {
    //     if(props.filter === 'active') {
    //         allTasksForTodolist = allTasksForTodolist.filter(task => !task.isDone)
    //     }
    //     if(props.filter === 'completed') {
    //         allTasksForTodolist = allTasksForTodolist.filter(task => task.isDone)
    //     }
    //     return allTasksForTodolist
    // }, [props.filter]);

    if(props.filter === 'active') {
        allTasksForTodolist = allTasksForTodolist.filter(task => !task.isDone)
    }
    if(props.filter === 'completed') {
        allTasksForTodolist = allTasksForTodolist.filter(task => task.isDone)
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
                {allTasksForTodolist.map(task => {
                    return (
                        <TaskWithRedux key={task.id} taskID={task.id} todolistID={props.todolistID}/>
                    )
            // return (<Task
            //             key={task.id}
            //             task={task}
            //             changeTaskStatus={changeTaskStatus}
            //             onChangeTaskTitle={changeTaskTitle}
            //             deleteTask={deleteTask}
            //         />)
                })}
            </ul>
            <div>
                <ButtonMemo
                    title={'All'}
                    onClick={useCallback (() => changeFilterTaskHandler('all'), [])}
                    variant={props.filter === 'all' ? 'contained': 'text'}
                    filterButton={'all'}
                    color={'inherit'}
                />
                <ButtonMemo
                    title={'Active'}
                    onClick={useCallback (() => changeFilterTaskHandler('active'), [])}
                    variant={props.filter === 'active' ? 'contained': 'text'}
                    filterButton={'active'}
                    color={'error'}/>

                <ButtonMemo
                    title={'Completed'}
                    onClick={useCallback (() => changeFilterTaskHandler('completed'), [])}
                    variant={props.filter === 'completed' ? 'contained': 'text'}
                    filterButton={'completed'}
                    color={'success'}/>

            </div>
        </div>
    );
});