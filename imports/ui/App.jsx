import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { MuiThemeProvider } from "@material-ui/core";
import { LoginForm } from './LoginForm.jsx';
import { MainPage } from "./MainPage.jsx";
import { theme } from "../api/theme";
import Dashboard from "./dashboard_example/Dashboard";

export const App = () => {
    const user = useTracker(() => Meteor.user());
    return (
        <div className="main">
            <MuiThemeProvider theme={theme}>

                { user ? (
                    <MainPage />
                ) : (
                    <LoginForm />
                )}
            </MuiThemeProvider>
        </div>
    );
};
