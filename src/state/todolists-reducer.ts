import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";


const initialState:TodolistType[] = []
export const todolistsReducer = (state= initialState, action: TodolistReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todo => todo.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            const newTodolistID = action.payload.todolistId
            const newTodolist:TodolistType = {id: newTodolistID, title: action.payload.newName, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todo => todo.id === action.payload.todolistID ? {...todo, title: action.payload.newTitle} : todo)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todo => todo.id === action.payload.todolistID ? {...todo, filter: action.payload.newFilterValue} : todo)
        }
        default: {
            return state
        }

    }
}

export type TodolistReducerType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

export type removeTodolistACType = ReturnType<typeof removeTodolostAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterACType =  ReturnType<typeof changeTodolistFilterAC>

export const removeTodolostAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}

export const addTodolistAC = (newName: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newName,
            todolistId: v1()
        }
    } as const
}

export const changeTodolistTitleAC = (newTitle: string, todolistID: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            newTitle, todolistID
        }
    } as const
}

export const changeTodolistFilterAC = (todolistID: string, newFilterValue: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistID, newFilterValue
        }
    } as const
}