import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import { LoginForm } from './LoginForm.jsx';
import { MainPage } from "./MainPage/MainPage.jsx";
import { theme } from "../api/theme";
import {Routing} from "./Routing";

export const App = () => {
    const user = useTracker(() => Meteor.user());
    return (
        <div className="main">

            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                { user ? (
                    <Routing />
                ) : (
                    <LoginForm />
                )}
            </MuiThemeProvider>
        </div>
    );
};
