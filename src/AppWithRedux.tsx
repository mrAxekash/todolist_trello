import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import React, {Reducer, useReducer, useState} from "react";
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

    let todolistID1 = v1()
    let todolistID2 = v1()



    let [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistType[], TodolistReducerType>>(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])



    let [tasks, dispatchToTasks] = useReducer<Reducer<TasksFortodolistType, TasksReducerType>>(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Redux-toolkit', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: false}
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        let action = removeTaskAC(todolistId, taskId)
        dispatchToTasks(action)
        //setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    const addTask = (todolistId: string, taskName: string) => {
        // const newTask: TaskType = {
        //     id: v1(), title: taskName, isDone: false
        // }
        // setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
        dispatchToTasks(addTaskAC(taskName, todolistId))
    }
    const changeFilter = (value: FilterValueType, todolistId: string) => {
        // setFilter(value)
        // const newTodolists = todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: value} : todolist)
        // setTodolists(newTodolists)
        dispatchToTodolists(changeTodolistFilterAC(todolistId, value))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatus: boolean) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: newStatus} : task)})
        dispatchToTasks(changeTaskStatusAC(taskId, newStatus, todolistId))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, title: newTitle} : task)})
        //
        dispatchToTasks(changeTaskTitleAC(todolistID, newTitle, taskID))
    }

    const deleteTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        // delete tasks[todolistId]
        // setTasks({...tasks})

        dispatchToTodolists(removeTodolostAC(todolistId))
        dispatchToTasks(removeTodolostAC(todolistId))
    }

    const addTodolist = (title: string) => {
        // let todolistId = v1()
        // const newTodolist: TodolistType = {id: todolistId, title, filter: 'all' }
        // setTodolists([...todolists, newTodolist])
        // setTasks({...tasks, [todolistId]: [] })
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }

    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        // setTodolists(todolists.map(todolist => todolist.id === todolistID ? {...todolist, title: newTitle} : todolist))
        dispatchToTodolists(changeTodolistTitleAC(newTitle, todolistID))
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