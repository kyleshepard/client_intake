import React, { useState } from 'react';
import { ClientsCollection } from 'imports/db/ClientsCollection';
import { Input, Button } from '@material-ui/core';

export const ClientForm = () => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text) return;

        ClientsCollection.insert({
            text: text.trim(),
            createdAt: new Date(),
        });

        setText("");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <Input type="text" placeholder="Type to add new entries" value={text} onChange={(e) => setText(e.target.value)} />
            <Button type="submit" variant="text" >Add It!</Button>
        </form>
    );
};
