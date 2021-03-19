import React, { useState } from 'react';
import { ClientsCollection } from '../api/ClientsCollection';
import { FormsCollection } from '../api/FormsCollection';
import { documentFields } from "../api/formConstants";

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
            <input type="text" placeholder="Type name of new client" value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit">Add New Client</button>
        </form>
    );
};
