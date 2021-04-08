import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import { ClientForm } from "./ClientForm";
import { Client } from "./Client";
import { ClientsCollection } from "../../api/ClientsCollection";
import { Copyright, NavBar } from "../Frequents";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('clients.set', _id, {
        isChecked: !isChecked,
    });
};

export const MainPage = () => {
    /// //
    // This part is for  logic
    const deleteClient = ({ _id }) => Meteor.call('clients.remove', _id);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const [hideCompleted, setHideCompleted] = useState(false);
    const tasks = useTracker(() => ClientsCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());
    const pendingClientsCount = useTracker(() => ClientsCollection.find(hideCompletedFilter).count());
    const pendingClientsTitle = `${
        pendingClientsCount ? ` (${pendingClientsCount})` : ''
    }`;

    /// ////////////This part is for display
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <NavBar>

                {/* Add New Clients */}
                <Grid item xs={12}>
                    <Paper className={classes.paper} color="primary">
                        <ClientForm />
                    </Paper>
                </Grid>
                {/* Display Clients */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>
                            Potential Clients
                        </h1>
                        <List style={{
                            width: '100%',
                        }}
                        >
                            { tasks.map((task) => <Client key={task._id} clientData={task} onCheckBoxClick={toggleChecked} onDeleteClick={deleteClient} />)}
                        </List>
                    </Paper>
                </Grid>

            </NavBar>
        </div>

    );
};
