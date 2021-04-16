import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { List, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { UsersCollection } from "/imports/db/UsersCollection";
import { NavBar, useStyles } from "../Frequents";
import { useTrackerSubscription } from "/imports/api/customHooks";

const drawerWidth = 240;

export function UsersForm() {
    const { data: userData, isLoading: isLoadingUsers } = useTrackerSubscription('users', () => UsersCollection.find({}, { sort: { isActive: -1}}));
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <NavBar>
            {/* Display Users */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h4">Users</Typography>
                    <List style={{
                        width: '100%',
                    }}
                    >
                        { isLoadingUsers
                            ? <Typography>Loading Information...</Typography>
                            : users.map((user) => (
                                <h1>{user.fullName}</h1>
                                // <Client
                                //     key={client._id}
                                //     clientData={client}
                                //     onCheckBoxClick={toggleChecked}
                                //     onDeleteClick={deleteClient}
                                // />
                            ))}
                    </List>
                </Paper>
            </Grid>
        </NavBar>

    );
}
