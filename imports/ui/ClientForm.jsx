import React, { useState } from 'react';
import { ClientsCollection } from '../api/ClientsCollection';
import { Form, Input, Button } from '@material-ui/core';

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
        <Form className="task-form" onSubmit={handleSubmit}>
            <Input type="text" placeholder="Type to add new entries" value={text} onChange={(e) => setText(e.target.value)} />
            <Button type="submit">Add It!</Button>
        </Form>
    );
};
