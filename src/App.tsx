import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type FilterValueType = 'all' | 'active' | 'completed'
function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Redux-toolkit', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')



    const removeTask = (id: number) => {
        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
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
            />

        </div>
    );
}

export default App;
