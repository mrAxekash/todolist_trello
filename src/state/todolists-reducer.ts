import {TodolistType} from "../App";


type ActionType = {
    type: string,
    [key: string]: any
}

export const todolistsReducer = (state: TodolistType[], action: todolistReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todo => todo.id !== action.payload.todolistID)
        }
        // case '3333': {
        //     return state
        // }
        default: {
            throw new Error('I don\'t understand this type')
        }

    }
}

type todolistReducerType = removeTodolistACType

export type removeTodolistACType = ReturnType<typeof removeTodolostAC>
export const removeTodolostAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}

export type addTodolistAC = () => {
    return {

}as const
}

