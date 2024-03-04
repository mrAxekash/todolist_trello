import {userReducer} from "./user-reducer";


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