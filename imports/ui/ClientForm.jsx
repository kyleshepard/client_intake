import React, { useState } from 'react';
import { ClientsCollection } from '../api/ClientsCollection';

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
            <input type="text" placeholder="Type to add new entries" value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit">Add It!</button>
        </form>
    );
};
