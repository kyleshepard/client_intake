import React, { Fragment } from 'react';
import { Input, Button } from '@material-ui/core';

import { ImageDisplay } from "./ImageDisplay";

export const Client = ({ task, onCheckBoxClick, onDeleteClick }) => {
    // console.log(task._id);
    return (
        <li>
            <Input type="checkbox" checked={!!task.isChecked} onClick={() => onCheckBoxClick(task)} readOnly />
            <span>{task.text}</span>
            <ImageDisplay clientid={task && task._id} />
            <Button onClick={() => onDeleteClick(task)}>Delete Client</Button>
        </li>
    );
};
