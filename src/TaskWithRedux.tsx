import * as React from 'react';
import {ChangeEvent, FC, memo, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskWithReduxPropsType = {
    // task: TaskType
    // deleteTask: (taskID: string) => void
    // changeTaskStatus: (taskId: string, newStatus: boolean) => void
    // onChangeTaskTitle: (taskID: string, newTitle: string) => void
    taskID: string
    todolistID: string
};
export const TaskWithRedux: FC<TaskWithReduxPropsType> = memo(({taskID, todolistID}) => {

    // const state = useSelector<AppRootStateType>(state => state)
    // const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistID].filter((task) => task.id === taskID)[0])

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistID].find(t => t.id === taskID) as TaskType)

    const dispatch = useDispatch()
    console.log(task)

    const removeTask = () => {
        dispatch(removeTaskAC(todolistID, taskID))
        // deleteTask(task.id)
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(taskID, e.currentTarget.checked, todolistID ))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(todolistID, title, taskID))
    }

    // const changeTaskTitle = useCallback((newTitle: string) => {
    //     onChangeTaskTitle(task.id, newTitle)
    // }, [onChangeTaskTitle, task.id])

    return (
        <div>
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Checkbox color={'primary'} checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan oldTitle={task.title} onClick={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        </div>
    )

});