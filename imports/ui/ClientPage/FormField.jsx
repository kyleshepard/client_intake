// import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
    List, ListItem, Paper, Grid, Checkbox, TextField,
} from "@material-ui/core";
import { useTracker } from "meteor/react-meteor-data";
import EditIcon from '@material-ui/icons/Edit';
import { FormsCollection } from "/imports/db/FormsCollection";
import { fieldTypes } from "../../api/formConstants";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import { FileUpload } from "./FileUpload";

export const FormField = ({ fieldData, clientData }) => {
    const children = useTracker(() => FormsCollection.find({ parentId: fieldData._id }).fetch());
    let editor;
    const value = clientData && clientData.data && clientData.data[fieldData._id];
    const updateFunc = (newData) => { // TODO: this function should have a submit button instead of constantly updating the database
        const temp = clientData && clientData.data;
        temp[fieldData._id] = newData;
        Meteor.call('clients.set', clientData._id, {
            data: temp
        });
    };
    if (fieldData.type) {
        if (fieldData.type === fieldTypes.string) {
            editor = <TextField value={value} onChange={(e) => updateFunc(e.target.value)} />;
        } else if (fieldData.type === fieldTypes.bool) {
            editor = <Checkbox checked={value} onChange={() => updateFunc(!value)} />;
        } else if (fieldData.type === fieldTypes.file) {
            editor = <FileUpload clientId={clientData._id} fieldId={fieldData._id} />;
        }
    }
    return (
        <ListItem>
            <Paper style={{ padding: 5, width: '100%' }} elevation={3}>
                <Grid container direction="column">
                    <Grid item container direction="row" alignItems="center" spacing={1}>
                        <Grid item>
                            <EditIcon />
                        </Grid>
                        <Grid item>
                            {`${fieldData.name}: `}
                        </Grid>
                        <Grid item>
                            {editor}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <List>
                            {children.map((child) => <FormField clientData={clientData} key={child._id} fieldData={child} />)}
                        </List>
                    </Grid>
                </Grid>

            </Paper>
        </ListItem>
    );
};
