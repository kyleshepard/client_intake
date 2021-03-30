import React from 'react';
import {
    Input, Button, Checkbox, ListItem, Divider, Paper, Grid, Dialog, TextField, FormControlLabel,
} from '@material-ui/core';
import { useTracker } from "meteor/react-meteor-data";
import { useHistory } from "react-router-dom";
import { fieldTypes } from "../../api/formConstants";
import { FormsCollection } from "../../api/FormsCollection";

const LinkButton = ({ to }) => {
    const history = useHistory();

    return Button({ onClick:()=>history.push(to), ...props });
};

export const Client = ({ clientData, onCheckBoxClick, onDeleteClick }) => {
    const fields = useTracker(() => FormsCollection.find({ primary: true }).fetch());
    return (
        <ListItem>
            <Paper
                style={{
                    padding: 5,
                    width: '100%',
                }}
                elevation={3}
            >
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >

                    <Grid key="Full Name" item>
                        <TextField
                            label="Full Name"
                            value={clientData.fullName}
                        />
                    </Grid>
                    {fields.map((field) => (
                        <Grid key={field._id} item>
                            { (field.type === fieldTypes.string
                                ? (

                                    <TextField label={field.name} value={clientData.data[field._id]} />

                                )
                                : (
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                checked={clientData.data[field._id]}
                                            />
                                        )}
                                        label={field.name}
                                    />
                                ))}
                        </Grid>
                    ))}
                    <Grid item sm={4}>
                        <LinkButton to={`/client/${clientData._id}`}>Open Client</LinkButton>
                    </Grid>
                    <Grid item sm={4}>
                        <Button onClick={() => onDeleteClick(clientData)}>Delete Client</Button>
                    </Grid>
                </Grid>
            </Paper>
        </ListItem>
    );
};
