import React, { useState } from 'react';
import { ClientsCollection } from '../api/ClientsCollection';
import { Input, Button } from '@material-ui/core';
import { FormsCollection } from '../api/FormsCollection';

export const ClientForm = () => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text) return;

        let client = {
            text: text.trim(),
            data: {},
            createdAt: Date()
        };

        //initialize every piece of data as boolean. how do we take in tons of values programmatically?
        FormsCollection.find({}).fetch().forEach(field => {
            client['data'][field._id] = false;
        });

        ClientsCollection.insert(client);

        setText("");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <Input type="text" placeholder="Type to add new client" value={text} onChange={(e) => setText(e.target.value)} />
            <Button type="submit">Add Client</Button>
        </form>
    );
};
