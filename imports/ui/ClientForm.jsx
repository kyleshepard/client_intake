import React, { useState } from 'react';
import { Input, Button, Grid } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { ClientsCollection } from '../api/ClientsCollection';
import { FormsCollection } from '../api/FormsCollection';

export const ClientForm = () => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text) return;

        const client = {
            text: text.trim(),
            data: {},
            createdAt: Date(),
        };

        // initialize every piece of data as boolean. how do we take in tons of values programmatically?
        FormsCollection.find({}).fetch().forEach((field) => {
            client.data[field._id] = false;
        });

        ClientsCollection.insert(client);

        setText("");
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
                <Grid item>
                    {' '}
                    <Input type="text" placeholder="Type to add new client" value={text} onChange={(e) => setText(e.target.value)} />
                </Grid>
                <Grid item>
                    <Button type="submit">Add Client</Button>
                </Grid>
            </Grid>
        </form>
    );
};
