import {TasksFortodolistType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";


// type ActionType = {
//     type: string,
//     [key: string]: any
// }

export const tasksReducer = (state: TasksFortodolistType, action: TasksReducerType): TasksFortodolistType => {
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
        // case 'ADD-TODOLIST': {
        //     const newTodolistID = v1()
        //     const newTodolist:TodolistType = {id: newTodolistID, title: action.payload.newName, filter: 'all'}
        //     return [...state, newTodolist]
        // }
        // case 'CHANGE-TODOLIST-TITLE': {
        //     return state.map(todo => todo.id === action.payload.todolistID ? {...todo, title: action.payload.newTitle} : todo)
        // }
        // case 'CHANGE-TODOLIST-FILTER': {
        //     return state.map(todo => todo.id === action.payload.todolistID ? {...todo, filter: action.payload.newFilterValue} : todo)
        // }
        default: {
            throw new Error('I don\'t understand this type')
        }

    }
}

export type TasksReducerType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
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
// type todolistReducerType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType
//
// export type removeTodolistACType = ReturnType<typeof removeTodolostAC>
// export type addTodolistACType = ReturnType<typeof addTodolostAC>
// export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
// export type changeTodolistFilterACType =  ReturnType<typeof changeTodolistFilterAC>
//
// export const removeTodolostAC = (todolistID: string) => {
//     return {
//         type: 'REMOVE-TODOLIST',
//         payload: {
//             todolistID
//         }
//     } as const
// }
//
// export const addTodolostAC = (newName: string) => {
//     return {
//         type: 'ADD-TODOLIST',
//         payload: {
//             newName
//         }
//     } as const
// }
//
// export const changeTodolistTitleAC = (newTitle: string, todolistID: string) => {
//     return {
//         type: 'CHANGE-TODOLIST-TITLE',
//         payload: {
//             newTitle, todolistID
//         }
//     } as const
// }
//
// export const changeTodolistFilterAC = (todolistID: string, newFilterValue: FilterValueType) => {
//     return {
//         type: 'CHANGE-TODOLIST-FILTER',
//         payload: {
//             todolistID, newFilterValue
//         }
//     } as const
// }