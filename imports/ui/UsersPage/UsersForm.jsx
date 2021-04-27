import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { List, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
// import { UsersCollection } from "/imports/db/UsersCollection";
import { NavBar, useStyles } from "../Frequents";
import { useTrackerSubscription } from "/imports/api/customHooks";
import { User } from "./User";

const drawerWidth = 240;

const toggleActive = ({_id, isActive}) => {
    // Meteor.call('users.set', _id, {
    Meteor.call('users.setPrivileged', _id, {
        isActive: !isActive
    });
}

const toggleAdmin = ({_id, isAdmin}) => {
    // Meteor.call('users.set', _id, {
    Meteor.call('users.setPrivileged', _id, {
        isAdmin: !isAdmin
    });
}

export function UsersForm() {
    const { data: users, isLoading: isLoadingUsers } = useTrackerSubscription('users', () => Meteor.users.find({}, { sort: { isActive: -1}}));
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
                                // <h1>{user.fname ?? "no name"}</h1>
                                <User
                                    key={user._id}
                                    userData={user}
                                    onActiveClick={toggleActive}
                                    onAdminClick={toggleAdmin}
                                />
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
