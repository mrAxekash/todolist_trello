import {TasksFortodolistType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";


const initialState: TasksFortodolistType = {}
export const tasksReducer = (state = initialState, action: TasksReducerType): TasksFortodolistType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.id !== action.payload.taskID)}
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {id: v1(), title: action.payload.newTitle, isDone: false}

            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskID ? {...task, isDone: action.payload.value} : task)}
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskID ? {...task, title: action.payload.title} : task)}
        }
        case 'ADD-TODOLIST': {
            const newTodolistId: string = action.payload.todolistId
            return {...state, [newTodolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            delete state[action.payload.todolistID]
            return {...state}
        }
        default: {
            return state
        }

    }
}

export type TasksReducerType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | addTodolistACType | removeTodolistACType

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID, taskID
        }
    } as const
}

export const addTaskAC = (newTitle: string, todolistID: string, ) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID, newTitle
    }
    } as const
}

export const changeTaskStatusAC = (taskID: string, value: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskID, value, todolistID
        }
    } as const
}

export const changeTaskTitleAC = (todolistID: string, title: string, taskID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistID, title, taskID
        }
    } as const
}
