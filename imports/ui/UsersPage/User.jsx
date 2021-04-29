import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Button, Checkbox, FormControlLabel, Grid, ListItem, Paper, TextField, Switch, Typography} from '@material-ui/core';
import {useTracker} from "meteor/react-meteor-data";
import {fieldTypes} from "../../api/formConstants";
import {LinkButton} from "../Frequents";

export const User = ({ userData, onActiveClick, onAdminClick, onDeleteClick }) => {
    return (
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
                    <Grid key="Full Name" item>
                        <Typography>
                            {userData.fname + " " + (userData.lname ?? "")}
                        </Typography>
                    </Grid>

                    <Grid key="Full Name" item>
                        <Typography>
                            {userData.username}
                        </Typography>
                    </Grid>

                    <Grid item sm={3}>
                        <FormControlLabel
                            control={<Switch
                                checked={!!userData.isActive}
                                onChange={() => {
                                    if (userData._id == Meteor.userId() && userData.isActive){
                                        window.confirm("Are you sure you want to set your own account as inactive?") && onActiveClick(userData);
                                    }
                                    else{
                                        onActiveClick(userData);
                                    }
                                }}
                            />}
                            label="Active"
                        />
                    </Grid>

                    <Grid item sm={3}>
                        <FormControlLabel
                            control={<Switch
                                checked={!!userData.isAdmin}
                                onChange={() => {
                                    if (userData._id == Meteor.userId() && userData.isAdmin){
                                        window.confirm("Are you sure you want to remove your own admin privileges? This cannot be undone on this account.") && onAdminClick(userData);
                                    }
                                    else{
                                        onAdminClick(userData);
                                    }
                                }}
                            />}
                            label="Admin"
                        />
                    </Grid>

                    <Grid item sm={3}>
                        <Button onClick={() => window.confirm("Are you sure you wish to delete user: " + userData.username + "?") && onDeleteClick(userData)}>
                            Delete User
                        </Button>
                    </Grid>

                </Grid>
            </Paper>
        </ListItem>
    );
};
