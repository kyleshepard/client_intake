import React, {createContext, useContext} from 'react';
import {
    BrowserRouter as Router, Route, Switch, Redirect,
} from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { MainPage } from "./MainPage/MainPage.jsx";
import { Form } from "./ClientPage/Form.jsx";
import { LoginForm } from "./LoginForm.jsx";

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
function PrivateRoute({ children, ...rest }) {
    console.log("PRIVATE ROUTE");
    const user = useUser();
    console.log("USER", user);
    return (

        <Route
            {...rest}
            render={({ location }) => (user ? (
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

export const Routing = () => {
    const x = 1;
    return (
        <ProvideUser>
            <Router>
                <Switch>
                    <Route path="/about">
                        About
                    </Route>
                    <Route path="/users">
                        Users
                    </Route>
                    <Route path="/client/:clientId">
                        <Form />
                    </Route>
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
};
