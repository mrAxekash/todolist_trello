import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import React, {Reducer, useCallback, useReducer, useState} from "react";
import {Header} from "./components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolostAC,
    TodolistReducerType,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksReducerType
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}
export type TasksFortodolistType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksFortodolistType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }
    const addTask = useCallback ((todolistId: string, taskName: string) => {
        dispatch(addTaskAC(taskName, todolistId))
    }, [dispatch])
    const changeFilter = (value: FilterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatus: boolean) => {
        dispatch(changeTaskStatusAC(taskId, newStatus, todolistId))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, newTitle, taskID))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(removeTodolostAC(todolistId))
    }

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistID))
    }

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        let allTasksForTodolist = tasks[todolist.id]
                        let tasksForTodolist = allTasksForTodolist

                        if(todolist.filter === 'active') {
                            tasksForTodolist = allTasksForTodolist.filter(task => !task.isDone)
                        }
                        if(todolist.filter === 'completed') {
                            tasksForTodolist = allTasksForTodolist.filter(task => task.isDone)
                        }
                        return <Grid item key={todolist.id}>
                            <Paper style={{padding: '10px'}} elevation={3}>
                                <Todolist
                                    key={todolist.id}
                                    todolistID={todolist.id}
                                    title={todolist.title}
                                    filter={todolist.filter}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    onChangeTaskTitle={changeTaskTitle}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    deleteTodolist={deleteTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>

                        </Grid>})}
                </Grid>

            </Container>


        </div>
    );
}

export default AppWithRedux;