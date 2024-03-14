import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksFortodolistType} from "../App";


test ('correct task should be deleted from correct array\'', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()
    const startState: TasksFortodolistType = {
        [todolistID1]: [
            {id: '1', title: 'HTML & CSS', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
            {id: '5', title: 'Redux-toolkit', isDone: false},
        ],
        [todolistID2]: [
            {id: '1', title: 'milk', isDone: true},
            {id: '2', title: 'bread', isDone: false}
        ]
    }

    const action = removeTaskAC(todolistID1, '3')

    const endState = tasksReducer(startState, action)

    expect(endState[todolistID1].length).toBe(4)
    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', title: 'HTML & CSS', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
            {id: '5', title: 'Redux-toolkit', isDone: false},
        ],
        [todolistID2]: [
            {id: '1', title: 'milk', isDone: true},
            {id: '2', title: 'bread', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const startState: TasksFortodolistType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
    const startState: TasksFortodolistType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
})
