import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTrackerSubscription } from "/imports/api/customHooks";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { useHistory } from "react-router-dom";
import { Button, List } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import Tooltip from "@material-ui/core/Tooltip";
import dayjs from 'dayjs';
import { ClientForm } from "./MainPage/ClientForm";
import { Client } from "./MainPage/Client";

export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://worldreliefspokane.org/">
                World Relief Spokane
            </Link>
            {' '}
            {new Date().getFullYear()}
            .
        </Typography>
    );
}

// Treat this button like it was a materialUI button with the extra prop of to which is the path to route to
// It will route after whatever onClick executes
export const LinkButton = ({
    to, onClick = () => {}, isLink = false, ...props
}) => {
    const history = useHistory();

    return isLink ? <Link href={''} onClick={() => { onClick(); history.push(to); }} {...props} /> : <Button onClick={() => { onClick(); history.push(to); }} {...props} />;
};

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
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

export const NavBar = ({ children }) => {
    /// ////////////This part is for display
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const history = useHistory();
    const { data: user, isLoading: isLoadingUser } = useTrackerSubscription('users', () => Meteor.users.findOne({_id: Meteor.userId}));
    const expireDate =  dayjs(new Date).subtract(1, 'month');
    const clients = ClientsCollection.find().fetch();
    var expiringClients =[];
    var myClients = [];

    clients.forEach((client) => {
        if(dayjs(client.modifiedAt) > expireDate && dayjs(client.modifiedAt) < expireDate.add(7, 'days')){
            expiringClients.push(client);
        }
        if(client.modifiedBy == Meteor.userId()){
            myClients.push(client);
        }
    });
    // console.log(user);
    const ClientListItem = ({ client }) =>
        // console.log(client._id);
        (
            <ListItem button onClick={() => history.push(`/client/${client._id}`)}>
                <ListItemIcon>
                    <Tooltip title={open ? "" : client.fullName} placement="right">
                        <PersonIcon />
                    </Tooltip>
                </ListItemIcon>
                <ListItemText primary={client.fullName} />
            </ListItem>
        );

    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <Tooltip title="View Sidebar" placement="right">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>

                    <IconButton color="inherit" onClick={() => { history.push("/account"); }}>
                        <Tooltip title="Account Management" placement="bottom">
                            <PersonIcon />
                        </Tooltip>
                        {/* <Badge badgeContent={4} color="secondary">
                            <PersonIcon />
                        </Badge> */}
                    </IconButton>
                    <IconButton color="inherit" onClick={Meteor.logout}>
                        <Tooltip title="Log Out" placement="bottom">
                            <ExitToAppIcon />
                        </Tooltip>
                    </IconButton>
                    {/* <Button onClick={Meteor.logout} variant="contained">Log out</Button> */}

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <div>
                        <ListItem button onClick={() => history.push(`/`)}>
                            <ListItemIcon>
                                <Tooltip title={open ? "" : "Clients"} placement="right">
                                    <PeopleIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary="Clients" />
                        </ListItem>
                        {
                            (isLoadingUser ? false : user.isAdmin)
                            ?
                                <ListItem button onClick={() => history.push(`/users`)}>
                                    <ListItemIcon>
                                        <Tooltip title={open ? "" : "Manage Users"} placement="right">
                                            <BarChartIcon />
                                        </Tooltip>
                                    </ListItemIcon>
                                    <ListItemText primary="Users" />
                                </ListItem>
                            :
                                ""

                        }
                        <ListItem button onClick={() => history.push(`/forms`)}>
                            <ListItemIcon>
                                <Tooltip title={open ? "" : "Forms"} placement="right">
                                    <LayersIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary="Form Editor" />
                        </ListItem>
                    </div>
                </List>
                <Divider />
                <List>
                    <ListSubheader inset>Clients Expiring Soon</ListSubheader>
                    {expiringClients.map((client) => <ClientListItem key={client._id} client={client} />)}
                </List>
                <Divider />
                <List>
                    <ListSubheader inset>My Clients</ListSubheader>
                    {myClients.map((client) => <ClientListItem key={client._id} client={client} />)}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {children}
                    </Grid>
                </Container>
            </main>
        </div>
    );
};
