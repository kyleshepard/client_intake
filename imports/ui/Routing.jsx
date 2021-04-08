import React, { createContext, useContext } from 'react';
import {
    BrowserRouter as Router, Route, Switch, Redirect,
} from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { MainPage } from "./MainPage/MainPage.jsx";
import { LoginForm } from "./LoginForm.jsx";
import { SignUp } from "./SignUp";
import { ClientPage } from "./ClientPage/ClientPage";

const authContext = createContext(null);

function useUser() {
    return useContext(authContext);
}

function ProvideUser({ children }) {
    const user = useTracker(() => Meteor.user());
    console.log("USER2", user);
    return (
        <authContext.Provider value={user}>
            {children}
        </authContext.Provider>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, authUser = (user, location) => user, ...rest }) {
    const user = useUser();
    return (
        <Route
            {...rest}
            render={({ location }) => (authUser(user, location) ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: location },
                    }}
                />
            ))}
        />
    );
}

export const Routing = () => (
    <ProvideUser>
        <Router>
            <Switch>
                <Route path="/about">
                    About
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
                <PrivateRoute path="/forms">
                    Forms
                </PrivateRoute>
                <PrivateRoute path="/users">
                    Users
                </PrivateRoute>
                <PrivateRoute path="/client/:clientId">
                    <ClientPage />
                </PrivateRoute>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <PrivateRoute exact path="/">
                    <MainPage />
                </PrivateRoute>
                <Route path="*">
                    404 No Page Found
                </Route>
            </Switch>
        </Router>
    </ProvideUser>
);
