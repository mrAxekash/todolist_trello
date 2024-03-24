import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './Button';
import {AddItemForm, AddItemFormType} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions"
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";
import * as React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    //backgroundColor: { control: 'color' },
    addItem: {
      description: 'Clicked button inside form',
      // action: 'clicked'
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {
  args: {
    addItem: action('Clicked button inside form')
  },
};

const AddItemFormError = React.memo((props: AddItemFormType) => {
  const [taskName, setTaskName] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>('This field is required')

  const addTask = () => {
    if(taskName.trim() !== '') {
      props.addItem(taskName.trim())
      setTaskName('')
    } else {
      setErrorMessage('This field is required')
    }

  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement> ) => {
    if(errorMessage) {
      setErrorMessage(null)
    }
    if(e.charCode === 13) {
      addTask()
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value)
  }


  return (
      <div>
          <TextField
              size={'small'}
  variant={'outlined'}
  value={taskName}
  onChange={onChangeHandler}
  onKeyDown={onKeyPressHandler}
  error={!!errorMessage}
  helperText={errorMessage}
  />
  <IconButton onClick={addTask} color={'primary'}>
      <AddBox/>
      </IconButton>
      </div>
);
})

export const ErrorAddItemForm: Story = {
  render: () => <AddItemFormError addItem={action('Clicked button inside form')}/>
};
