import React from 'react';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPage } from "./MainPage/MainPage";
import { SignUp } from "./SignUp";

export const Routing = () => {
    const x = 1;
    return (
        <Router>
            <Switch>
                <Route path="/about">
                    About
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
                <Route path="/users">
                    Users
                </Route>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route path="*">
                    404 No Page Found
                </Route>
            </Switch>
        </Router>
    )
};
