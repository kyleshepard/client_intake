import React from 'react';
import {
    Input, Button, Checkbox, ListItem, Divider,
} from '@material-ui/core';

import { ImageDisplay } from "./ImageDisplay";

export const Client = ({ task, onCheckBoxClick, onDeleteClick }) => (
    <>
        <ListItem>
            <Checkbox checked={task.isChecked} onClick={() => onCheckBoxClick(task)} />
            <span>{task.text}</span>
            <ImageDisplay clientid={task && task._id} />
            <Button onClick={() => onDeleteClick(task)}>Delete Client</Button>
        </ListItem>

        <Divider />
    </>
);
