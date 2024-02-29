import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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

    const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, title: newTitle} : task)})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title, filter: 'all' }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: [] })
    }

    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistID ? {...todolist, title: newTitle} : todolist))
    }



    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
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
                    onChangeTaskTitle={changeTaskTitle}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    deleteTodolist={deleteTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                />})}

        </div>
    );
}

export default App;
