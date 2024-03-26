import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './Button';
import {AddItemForm, AddItemFormType} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions"
import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";
import * as React from "react";
import {EditableSpan, EditableSpanProps} from "../components/EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    //backgroundColor: { control: 'color' },

  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

const EditableSpanToogle = () => {

  const[title, setTitle] = useState('Orange')

  return <EditableSpan oldTitle={title} onClick={(newValue) => setTitle(newValue)} />
}

export const ToogleEditableSpan: Story = {
  render: () => <EditableSpanToogle />
}

// export const IsNotToogleSpan: Story = {
//   args: {
//     oldTitle: 'Old title',
//     onClick: action('Title is changed')
//   }
// }


const EditableSpanAtSpan = memo(({oldTitle, onClick}: EditableSpanProps) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const [newTitle, setNewTitle] = useState(oldTitle)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  const onChangeEditMode = () => {
    setEditMode(editMode)
    // if(editMode) {
    onClick(newTitle)
    // }
  }

  return (
      <>
        {editMode ?
            <TextField value={newTitle}
                       onBlur={onChangeEditMode}
                       autoFocus
                       onChange={onChangeHandler} />
            :
            <span
                onDoubleClick={onChangeEditMode}
            >
                    {oldTitle}
                </span>
        }
      </>
  );
});


export const EditableSpanAtSPAN:Story = {
  render: () => <EditableSpanAtSpan onClick={(newValue) => {action('Double click')}} oldTitle={'Span at span'}/>
}

const EditableSpanAtInputElement = memo(({oldTitle, onClick}: EditableSpanProps) => {
  const [editMode, setEditMode] = useState<boolean>(true)

  const [newTitle, setNewTitle] = useState(oldTitle)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  const onChangeEditMode = () => {
    setEditMode(editMode)
    // if(editMode) {
    onClick(newTitle)
    // }
  }

  return (
      <>
        {editMode ?
            <TextField value={newTitle}
                       onBlur={onChangeEditMode}
                       autoFocus
                       onChange={onChangeHandler} />
            :
            <span
                onDoubleClick={onChangeEditMode}
            >
                    {oldTitle}
                </span>
        }
      </>
  );
});

export const EditableSpanAtInput:Story = {
  render: () => <EditableSpanAtInputElement onClick={(newValue) => {action('Double click')}} oldTitle={'Span at span'}/>
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const AddItemFormStory: Story = {
//   args: {
//     addItem: action('Clicked button inside form')
//   },
// };

// const AddItemFormError = React.memo((props: AddItemFormType) => {
//   const [taskName, setTaskName] = useState('')
//   const [errorMessage, setErrorMessage] = useState<string | null>('This field is required')
//
//   const addTask = () => {
//     if(taskName.trim() !== '') {
//       props.addItem(taskName.trim())
//       setTaskName('')
//     } else {
//       setErrorMessage('This field is required')
//     }
//
//   }
//   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement> ) => {
//     if(errorMessage) {
//       setErrorMessage(null)
//     }
//     if(e.charCode === 13) {
//       addTask()
//     }
//   }
//   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setTaskName(e.currentTarget.value)
//   }
//
//
//   return (
//       <div>
//           <TextField
//               size={'small'}
//   variant={'outlined'}
//   value={taskName}
//   onChange={onChangeHandler}
//   onKeyDown={onKeyPressHandler}
//   error={!!errorMessage}
//   helperText={errorMessage}
//   />
//   <IconButton onClick={addTask} color={'primary'}>
//       <AddBox/>
//       </IconButton>
//       </div>
// );
// })
//
// // export const ErrorAddItemForm: Story = {
//   render: () => <AddItemFormError addItem={action('Clicked button inside form')}/>
// };
