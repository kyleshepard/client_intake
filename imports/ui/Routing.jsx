import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPage } from "./MainPage/MainPage.jsx";
import {Form} from "./ClientPage/Form.jsx";

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
                <Route path="/client/:clientId">
                    <Form/>
                </Route>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route path="*">
                    404 No Page Found
                </Route>
            </Switch>
        </Router>
    );
};
