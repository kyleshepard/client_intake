import React, { Fragment } from 'react';
import { ImageDisplay } from "./ImageDisplay";
import { Li } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Span } from '@material-ui/core';
import { Button } from '@material-ui/core';

export const Client = ({ task, onCheckBoxClick, onDeleteClick }) => {
    // console.log(task._id);
    return (
        <Li>
            <Input type="checkbox" checked={!!task.isChecked} onClick={() => onCheckBoxClick(task)} readOnly />
            <Span>{task.text}</Span>
            <ImageDisplay clientid={task && task._id} />
            <Button onClick={() => onDeleteClick(task)}>Delete Client</Button>
        </Li>
    );
};
