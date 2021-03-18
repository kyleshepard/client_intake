import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
<<<<<<< HEAD
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <ul>
        { tasks.map(task => <Task key={ task._id } task={ task }/>) }
      </ul>
    </div>
  );
=======
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
>>>>>>> cd58cdc3b4560beacac4fde24f98443e81e35d4c
};
