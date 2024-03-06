import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string,
    [key: string]: any
}

export const todolistsReducer = (state: TodolistType[], action: todolistReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todo => todo.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            const newTodolistID = v1()
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
            throw new Error('I don\'t understand this type')
        }

    }
}

type todolistReducerType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

export type removeTodolistACType = ReturnType<typeof removeTodolostAC>
export type addTodolistACType = ReturnType<typeof addTodolostAC>
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

export const addTodolostAC = (newName: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newName
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