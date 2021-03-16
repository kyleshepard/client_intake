import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm.jsx';
import { MainPage } from "./MainPage.jsx";
import { Div } from '@material-ui/core';

export const App = () => {
    const user = useTracker(() => Meteor.user());
    return (
        <Div className="main">
            { user ? (
                <MainPage />
            ) : (
                <LoginForm />
            )}
        </Div>
    );
};
