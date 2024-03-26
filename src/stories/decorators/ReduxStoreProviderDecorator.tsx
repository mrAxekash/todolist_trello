import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../state/store";
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../../state/todolists-reducer";
import {tasksReducer} from "../../state/tasks-reducer";
import {v1} from "uuid";



const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalStore = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: true}
        ]

    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalStore as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}