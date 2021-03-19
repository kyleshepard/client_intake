import React from 'react';
import {
    List, ListItem, Paper, Grid, Checkbox, TextField,
} from "@material-ui/core";
import { useTracker } from "meteor/react-meteor-data";
import EditIcon from '@material-ui/icons/Edit';
import { FormsCollection } from "../api/FormsCollection";
import { fieldTypes } from "../api/formConstants";

export const FormField = ({ fieldData }) => {
    const children = useTracker(() => FormsCollection.find({ parentId: fieldData._id }).fetch());
    let editor;
    if (fieldData.type) {
        if (fieldData.type === fieldTypes.string) {
            editor = <TextField />;
        } else if (fieldData.type === fieldTypes.bool) {
            editor = <Checkbox />;
        }
    }
    return (
        <ListItem>
            <Paper style={{ padding: 5, width: '100%' }} elevation={9}>
                <Grid container direction="column">
                    <Grid item container direction="row" alignItems="center" justifyContent="center">
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
                            {children.map((child) => <FormField key={child._id} fieldData={child} />)}
                        </List>
                    </Grid>
                </Grid>

            </Paper>
        </ListItem>
    );
};
