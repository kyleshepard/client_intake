import React from 'react';
import { ImageDisplay } from "./ImageDisplay";
import { Li, Input, Span, Button } from '@material-ui/core';

export const Client = ({ task, onCheckBoxClick, onDeleteClick }) => {
    console.log(task._id);
    return (
        <Li>
            <Input type="checkbox" checked={!!task.isChecked} onClick={() => onCheckBoxClick(task)} readOnly />
            <Span>{task.text}</Span>
            <ImageDisplay clientid={task && task._id} />
            <Button onClick={() => onDeleteClick(task)}>Delete Client</Button>
        </Li>
    );
};
