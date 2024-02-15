import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = 'all' | 'active' | 'completed'
function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Redux-toolkit', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')



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
    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks

    if(filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />

        </div>
    );
}

export default App;
