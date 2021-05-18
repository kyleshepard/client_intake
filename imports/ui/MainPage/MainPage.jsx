import React, { useState } from "react";
import { List, Typography, IconButton, Tooltip } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ClientForm } from "./ClientForm";
import { Client } from "./Client";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import { NavBar } from "../Frequents";
import { useTrackerSubscription } from "../../api/customHooks";
import { SearchBar } from "/imports/ui/SearchBar";
import { useHistory } from "react-router-dom";

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

const filterClients = (clients, query) => {
    if (!query || clients === undefined) {
        return clients;
    }

    return clients.filter((client) => {
        const clientName = client.fullName.toLowerCase();
        return clientName.includes(query.toLowerCase());
    });
};

export const MainPage = () => {
    const history = useHistory();
    // This part is for  logic
    const deleteClient = ({ id }) => Meteor.call('clients.remove', id);
    const { data: clients, isLoading } = useTrackerSubscription("clients",
        () => ClientsCollection.find({}, { sort: { createdAt: -1 } }).fetch());

    /// ////////////This part is for display
    const classes = useStyles();

    // const { search } = window.location;
    // const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState("");
    const filteredClients = filterClients(clients, searchQuery)
    const columns = [
        { field: 'fullName', headerName: 'Full Name', width: 300 },
        {
            field: '_id',
            headerName: 'Actions',
            width: 150,
          //   hide: true, 
            renderCell: (params) => (
              <strong>
                <IconButton
                  variant="contained"
                  size="small"
                  style={{ marginLeft: 16 }}
                  value={params.value._id}
                  onClick={() => {history.push(`/client/${params.id}`)}}
                >
                    <Tooltip title="Edit Client" placement="bottom">
                        <EditOutlinedIcon/>
                    </Tooltip>
                </IconButton>
                <IconButton
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: 16 }}
                  value={params.value._id}
                  onClick={() => {window.confirm(`Are you sure you wish to delete this client?`) && deleteClient({id: params.id})}}
                >
                    <Tooltip title="Delete Client" placement="bottom">
                        <DeleteOutlineIcon/>
                    </Tooltip>
                </IconButton>
              </strong>
            )
           },
      ];

    return (
        <NavBar>
            {/* Add New Clients */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <ClientForm />
                    <SearchBar
                        searchQuery={searchQuery}
                        onSearchUpdate={setSearchQuery}
                    />
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
                        { isLoading
                            ? <Typography>Loading Information...</Typography>
                            :  (
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid 
                                        rows={filteredClients}
                                        columns={columns}
                                        pageSize={5} 
                                        getRowId={(e) => e._id} //point to different key as unique id, in this case it is "_id" instead of "id"
                                    />
                                </div>
                               )
                        }
                    </List>
                </Paper>
            </Grid>
        </NavBar>
    );
};
