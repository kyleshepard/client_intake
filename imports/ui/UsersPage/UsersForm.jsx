import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { List, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
// import { UsersCollection } from "/imports/db/UsersCollection";
import { NavBar, useStyles } from "../Frequents";
import { useTrackerSubscription } from "/imports/api/customHooks";

const drawerWidth = 240;

const deleteUser = ({ _id }) => {
    Meteor.call('users.remove', _id);
};

export function UsersForm() {
    const { data: users, isLoading: isLoadingUsers } = useTrackerSubscription('users', () => Meteor.users.find({}, { sort: { isActive: -1 } }).fetch());
    const classes = useStyles();
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const handleFieldEdit = ({id, field, props}) => {
        // console.log(id, field, props);
        // console.log(props.value);
        switch(field){
            case "isAdmin":
                Meteor.call('users.setPrivileged', id, {
                    isAdmin: props.value,
                });
                break;
            case "isActive":
                Meteor.call('users.setPrivileged', id, {
                    isActive: props.value,
                });
                break;
        }
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 70, hide: true, identity: true },
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'fname', headerName: 'First name', width: 130 },
        { field: 'lname', headerName: 'Last name', width: 130 },
        {
          field: 'isActive',
          headerName: 'Active',
          type: 'boolean',
          editable: true
        //   width: 90,
        },
        {
          field: 'isAdmin',
          headerName: 'Admin',
          type: 'boolean',
          editable: true
        //   width: 90,
        },
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (params) =>
        //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        // },
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
                                    getRowId={(e) => e._id} //point to different key as unique id, in this case it is "_id" instead of "id"
                                    // onEditCellChangeCommitted={({id}) => {console.log(id)}}
                                    onEditCellChange={handleFieldEdit}
                                />
                            </div>
                            )
                    }
                </Paper>
            </Grid>
        </NavBar>

    );
}
