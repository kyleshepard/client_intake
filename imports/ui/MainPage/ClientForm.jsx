import React, { useState } from 'react';
import {
    Button, Grid, TextField, Checkbox, FormControlLabel,
} from '@material-ui/core';
import { useTracker } from "meteor/react-meteor-data";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import { ClientsCollection } from '../api/ClientsCollection';
import { Meteor } from 'meteor/meteor';
import { FormsCollection } from '/imports/db/FormsCollection';
import { fieldTypes } from "../../api/formConstants";

export const ClientForm = () => {
    const [primaryData, setPrimaryData] = useState({});
    const [fullName, setFullName] = useState("");

    const fields = useTracker(() => FormsCollection.find({ primary: true }).fetch());

    const handleSubmit = (e) => {
        e.preventDefault();
        const client = {
            fullName: fullName,
            data: {}
        };
        let finishFlag = true;
        fields.forEach((field) => {
            if (field.type === fieldTypes.string && !(Object.keys(primaryData).includes(field._id))) {
                finishFlag = false;
            }
        });

        if (!finishFlag) return;

        // initialize every piece of data as boolean. how do we take in tons of values programmatically?
        FormsCollection.find({}).fetch().forEach((field) => {
            client.data[field._id] = field.type === fieldTypes.string ? "" : false;
            if (primaryData[field._id]) {
                client.data[field._id] = primaryData[field._id];
            }
        });

        // ClientsCollection.insert(client);
        Meteor.call('clients.insert', client);
        setPrimaryData({});
        setFullName("");
    };

    const modVal = (id, newVal) => {
        const temp = { ...primaryData };
        temp[id] = newVal;
        // console.log("TEMP", temp, primaryData);
        setPrimaryData(temp);
    };
    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <PersonAddIcon />
                </Grid>

                <Grid key="Full Name" item>
                    <TextField
                        label="Full Name"
                        value={fullName || ""}
                        onChange={(e) => {
                            e.preventDefault();
                            setFullName(e.target.value);
                        }}
                    />
                </Grid>

                {fields.map((field) => (
                    <Grid key={field._id} item>
                        { (field.type === fieldTypes.string
                            ? (
                                <TextField
                                    value={primaryData[field._id] || ""}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        modVal(field._id, e.target.value);
                                    }}
                                    placeholder={field.name}
                                />
                            )
                            : (
                                <FormControlLabel
                                    control={(
                                        <Checkbox

                                            checked={primaryData[field._id] || false}
                                            onClick={() => modVal(field._id, !primaryData[field._id])}
                                        />
                                    )}
                                    label={field.name}
                                />
                            ))}
                    </Grid>
                ))}
                <Grid item>
                    <Button type="submit">Add Client</Button>
                </Grid>
            </Grid>
        </form>
    );
};
