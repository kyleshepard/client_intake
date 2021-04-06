import React from 'react';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPage } from "./MainPage/MainPage";
import { FormPage } from "./FormPage/FormPage";

export const Routing = () => {
    const x = 1;
    return (
        <Router>
            <Switch>
                <Route path="/about">
                    About
                </Route>
                <Route path="/users">
                    Users
                </Route>
                <Route path="/forms">
                    <FormPage />
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
