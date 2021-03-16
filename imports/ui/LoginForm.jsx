import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Label, Input, Button } from '@material-ui/core';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e) => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password);
    };

    return (
        <form onSubmit={submit} className="login-form">
            <Label htmlFor="username">Username</Label>

            <Input
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
            />

            <Label htmlFor="password">Password</Label>

            <Input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit">Log In</Button>
        </form>
    );
};
