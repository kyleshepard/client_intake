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
import { documentFields } from "/imports/api/formConstants";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import { Copyright, NavBar } from "../Frequents";

function ClientListItem({ client }) {
    // console.log(client._id);
    return (
        <ListItem button>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={client.fullName} />
        </ListItem>
    );
}

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
    // const { clients, expiring, isLoading } = useTracker(() => {
    const { clients, isLoading } = useTracker(() => {
        // const noData = { clients: [], expiring: []};
        const noData = { clients: [] };

        if (!Meteor.user()) {
            return noData;
        }

        const handler = Meteor.subscribe('clients');
        if (!handler.ready()) {
            return { ...noData, isLoading: true };
        }

        const clients = ClientsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
        const expiring = [];
        // var expiring = ClientsCollection.find({ modifiedAt: { "$gte" : moment().subtract(1, "months").toDate()} }, { sort: { modifiedAt: -1 } }).fetch();
        return { clients };
    });

    /// ////////////This part is for display
    const classes = useStyles();

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
                            { isLoading ? <h2>Loading</h2> : clients.map((client) => <Client key={client._id} clientData={client} onCheckBoxClick={toggleChecked} onDeleteClick={deleteClient} />)}
                        </List>
                    </Paper>
                </Grid>

            </NavBar>
        </div>

    );
};
