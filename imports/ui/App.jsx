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

export const App = () => {
    const user = useTracker(() => Meteor.user());
    return (
        <div className="main">
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                { user ? (
                    <MainPage />
                ) : (
                    <LoginForm />
                )}
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                            </ul>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/about">
                                About
                            </Route>
                            <Route path="/users">
                                Users
                            </Route>
                            <Route path="/">
                                Home

                            </Route>
                        </Switch>
                    </div>
                </Router>
                );
            </MuiThemeProvider>
        </div>
    );
};
