import {userReducer} from "./user-reducer";
import exp from "node:constants";


test('user reducer should increment only age', () => {
    const startState = {age: 33, childrenCount: 0, name: 'Alex'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(34)
    expect(endState.childrenCount).toBe(0)
})

test('user reducer should increment only children count', () => {
    const startState = {age: 33, childrenCount: 0, name: 'Alex'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(1)
    expect(endState.age).toBe(33)
})

test ('user reducer should change name of user', () => {
    const startState = {age: 33, childrenCount: 0, name: 'Alex'}
    const newName = 'Victor'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName})

    expect(endState.name).toBe('Victor')
})