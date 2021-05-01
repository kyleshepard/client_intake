import React, { createContext, useContext } from 'react';
import {
    BrowserRouter as Router, Route, Switch, Redirect,
} from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { MainPage } from "./MainPage/MainPage.jsx";
import { LoginForm } from "./LoginForm.jsx";
import { SignUp } from "./SignUp";
import { ClientPage } from "./ClientPage/ClientPage";
import { AccountForm } from "./AccountPage/AccountForm.jsx";
import { UsersForm } from "./UsersPage/UsersForm.jsx";
import { FormManagementPage } from "./FormManagementPage/FormManagementPage";

const authContext = createContext(null);

function useUser() {
    return useContext(authContext);
}

function ProvideUser({ children }) {
    const user = useTracker(() => Meteor.user());
    return (
        <authContext.Provider value={user}>
            {children}
        </authContext.Provider>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, authUser = (user, location) => !!user, ...rest }) {
    const user = useUser();
    console.log("USER", user);
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
                <PrivateRoute path="/forms">
                    <FormManagementPage />
                </PrivateRoute>
                <PrivateRoute path="/account">
                    <AccountForm />
                </PrivateRoute>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
                <PrivateRoute path="/client/:clientId">
                    <ClientPage />
                </PrivateRoute>
                <PrivateRoute path="/users">
                    <UsersForm />
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
