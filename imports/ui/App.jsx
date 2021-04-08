import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { LoginForm } from './LoginForm.jsx';
import { theme } from "../api/theme";
import { Routing } from "./Routing.jsx";

export const App = () => {
    const logging = useTracker(()=>Meteor.loggingIn())
    return (
        <div className="main">
            {!logging
            && (
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />

                    <Routing />

                </MuiThemeProvider>
            )}
        </div>
    );
};
