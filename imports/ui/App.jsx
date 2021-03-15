import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm.jsx';
import { MainPage } from "./MainPage.jsx";

export const App = () => {
    const user = useTracker(() => Meteor.user());
    return (
        <div className="main">
            { user ? (
                <MainPage />
            ) : (
                <LoginForm />
            )}
        </div>
    );
};
