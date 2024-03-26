import type { Meta, StoryObj } from '@storybook/react';

import {action} from "@storybook/addon-actions"
import {ChangeEvent, FC, memo, useCallback, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import * as React from "react";
import {Task, TaskPropsType} from "../Task";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../components/EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLIST/Task',
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    //backgroundColor: { control: 'color' },
    // addItem: {
    //   description: 'Clicked button inside form',
    //   // action: 'clicked'
    // }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { task: {id: '1', title: 'milk', isDone: true},
    deleteTask: action('Delete task is done'),
    // onChangeTaskTitle: action('Change task title'),
    // changeTaskStatus: action('Change task status'),
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const TaskToogle= () => {

  const [task, setTask] = useState({id: '1', title: 'milk', isDone: true})

  return <Task
      task={task}
      deleteTask={action('Task is deleted')}
      changeTaskStatus={(taskId, newStatus) => setTask({...task, isDone: newStatus})}
      onChangeTaskTitle={(taskID, newTitle) => setTask({...task, title: newTitle})}/>

};

export const TaskIsDoneStory: Story = {};
export const TaskIsNotDoneStory: Story = {
  args: {
    task: {id: '1', title: 'milk', isDone: false},
  }
};

export const ToogleTask: Story = {
  render: () => <TaskToogle />
}
