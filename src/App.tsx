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
export type TasksFortodolistType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<TasksFortodolistType>({
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


    // const [tasks, setTasks] = useState([
    //     {id: v1(), title: 'HTML & CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: false},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false},
    //     {id: v1(), title: 'Redux-toolkit', isDone: false},
    // ])




    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    const addTask = (todolistId: string, taskName: string) => {
        const newTask: TaskType = {
            id: v1(), title: taskName, isDone: false
        }
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})

    }
    const changeFilter = (value: FilterValueType, todolistId: string) => {
        // setFilter(value)
        const newTodolists = todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: value} : todolist)
        setTodolists(newTodolists)

    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatus: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: newStatus} : task)})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {todolists.map(todolist => {
                let allTasksForTodolist = tasks[todolist.id]
                let tasksForTodolist = allTasksForTodolist

                if(todolist.filter === 'active') {
                    tasksForTodolist = allTasksForTodolist.filter(task => !task.isDone)
                }
                if(todolist.filter === 'completed') {
                    tasksForTodolist = allTasksForTodolist.filter(task => task.isDone)
                }
                return <Todolist
                    key={todolist.id}
                    todolistID={todolist.id}
                    title={todolist.title}
                    filter={todolist.filter}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    deleteTodolist={deleteTodolist}
                />})}

        </div>
    );
}

export default App;
