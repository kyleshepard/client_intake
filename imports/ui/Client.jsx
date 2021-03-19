import React from 'react';
import {
    Input, Button, Checkbox, ListItem, Divider, Paper, Grid,
} from '@material-ui/core';
import { theme } from "../api/theme";
import { ImageDisplay } from "./ImageDisplay";

export const Client = ({ task, onCheckBoxClick, onDeleteClick }) => (

    <ListItem>
        <Paper
            style={{
                padding: 5,
                width: '100%',
            }}
            elevation={3}
        >
            <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item sm={4}>
                    {task.text}
                </Grid>
                <Grid item sm={4}>
                    <ImageDisplay clientid={task && task._id} />
                </Grid>
                <Grid item sm={4}>
                    <Button onClick={() => onDeleteClick(task)}>Delete Client</Button>
                </Grid>
            </Grid>
        </Paper>
    </ListItem>

);
