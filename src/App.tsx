import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}
function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Redux-toolkit', isDone: false},
    ])
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},

    ])




    const removeTask = (id: string) => {
        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
    }
    const addTask = (taskName: string) => {
        const newTask: TaskType = {
            id: v1(), title: taskName, isDone: false
        }
        setTasks([...tasks, newTask])

    }
    const changeFilter = (value: FilterValueType, todolistId: string) => {
        // setFilter(value)
        const newTodolists = todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: value} : todolist)
        setTodolists(newTodolists)

    }

    const changeTaskStatus = (taskId: string, newStatus: boolean) => {
        const newState = tasks.map(task => task.id === taskId ? {...task, isDone: newStatus} : task)
        return setTasks(newState)
    }


    return (
        <div className="App">
            {todolists.map(todolist => {
                let tasksForTodolist = tasks

                if(todolist.filter === 'active') {
                    tasksForTodolist = tasks.filter(task => !task.isDone)
                }
                if(todolist.filter === 'completed') {
                    tasksForTodolist = tasks.filter(task => task.isDone)
                }
                return <Todolist
                    key={todolist.id}
                    id={todolist.id}
                    title={todolist.title}
                    filter={todolist.filter}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                />})}
            {/*<Todolist*/}
            {/*    title={'What to learn'}*/}
            {/*    filter={filter}*/}
            {/*    tasks={tasksForTodolist}*/}
            {/*    removeTask={removeTask}*/}
            {/*    changeFilter={changeFilter}*/}
            {/*    addTask={addTask}*/}
            {/*    changeTaskStatus={changeTaskStatus}*/}
            {/*/>*/}

        </div>
    );
}

export default App;
