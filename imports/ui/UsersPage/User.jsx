import React from 'react';
import {Button, Checkbox, FormControlLabel, Grid, ListItem, Paper, TextField, Switch, Typography} from '@material-ui/core';
import {useTracker} from "meteor/react-meteor-data";
import {fieldTypes} from "../../api/formConstants";
import {LinkButton} from "../Frequents";

export const User = ({ userData, onActiveClick, onAdminClick }) => {
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
                            {userData.fname + " " + userData.lname}
                        </Typography>
                    </Grid>

                    <Grid item sm={4}>
                        <FormControlLabel
                            control={<Switch checked={!!userData.isActive} onChange={onActiveClick} />}
                            label="Active"
                        />
                    </Grid>

                    <Grid item sm={4}>
                        <FormControlLabel
                            control={<Switch checked={!!userData.isAdmin} onChange={onAdminClick} />}
                            label="Admin"
                        />
                    </Grid>

                    {/* <Grid item sm={4}>
                        <Button onClick={() => window.confirm("Are you sure you wish to delete this client: " + clientData.fullName + "?") && onDeleteClick(clientData)}>
                            Delete Client
                        </Button>
                    </Grid> */}

                </Grid>
            </Paper>
        </ListItem>
    );
};
