import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    List, Typography, IconButton, Tooltip,
} from "@material-ui/core";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
// import { UsersCollection } from "/imports/db/UsersCollection";
import { NavBar, useStyles } from "../Frequents";
import { useTrackerSubscription } from "/imports/api/customHooks";

const drawerWidth = 240;

const deleteUser = ({ id }) => {
    // alert(_id);
    window.confirm(`Are you sure you want to delete this user?`) && Meteor.call('users.remove', id);
};

const onAdminClick = ({ id, isAdmin }) => {
    Meteor.call('users.setPrivileged', id, {
        isAdmin,
    });
};

const onActiveClick = ({ id, isActive }) => {
    Meteor.call('users.setPrivileged', id, {
        isActive,
    });
};

export function UsersForm() {
    const { data: users, isLoading: isLoadingUsers } = useTrackerSubscription('users', () => Meteor.users.find({}, { sort: { isActive: -1 } }).fetch());
    const classes = useStyles();
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const handleFieldEdit = ({ id, field, props }) => {
        // console.log(id, field, props);
        console.log(props.value);
        switch (field) {
        case "isAdmin":
            if (id === Meteor.userId()) {
                alert("You cannot edit your own account");
            } else {
                onAdminClick({ id, isAdmin: !!props.value });
            }
            break;
        case "isActive":
            if (id === Meteor.userId()) {
                alert("You cannot edit your own account");
            } else {
                onActiveClick({ id, isActive: !!props.value });
            }
            break;
        }
    };

    const columns = [
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'fname', headerName: 'First Name', width: 130 },
        { field: 'lname', headerName: 'Last Name', width: 130 },
        {
            field: 'isActive',
            headerName: 'Active',
            type: 'boolean',
            editable: true,
        //   width: 90,
        },
        {
            field: 'isAdmin',
            headerName: 'Admin',
            type: 'boolean',
            editable: true,
        //   width: 90,
        },
        {
            field: '_id',
            headerName: 'Actions',
            width: 100,
            //   hide: true,
            renderCell: (params) => (
                <strong>
                    {/* {params.value.getFullYear()} */}
                    <IconButton
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        value={params.value._id}
                        onClick={() => { console.log(params); deleteUser({ id: params.id }); }}
                    >
                        <Tooltip title="Delete User" placement="bottom">
                            <DeleteOutlineIcon />
                        </Tooltip>
                    </IconButton>
                </strong>
            ),
        },
    ];

    return (
        <NavBar>
            {/* Display Users */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {/* <Typography variant="h4">Users</Typography> */}
                    { isLoadingUsers
                        ? <Typography>Loading Information...</Typography>
                        : (
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={users}
                                    columns={columns}
                                    pageSize={5}
                                    getRowId={(e) => e._id} // point to different key as unique id, in this case it is "_id" instead of "id"
                                    // onEditCellChangeCommitted={({id}) => {console.log(id)}}
                                    onEditCellChange={handleFieldEdit}
                                />
                            </div>
                        )}
                </Paper>
            </Grid>
        </NavBar>

    );
}
