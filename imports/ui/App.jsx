import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Tasks';
import { Hello } from "./Hello";

export const App = () => {
    const tasks = useTracker(() => TasksCollection.find({}).fetch());

    return (
        <div>
            <Hello />
            <h1>Welcome to Meteor!</h1>

            <ul>
                { tasks.map((task) => <Task key={task._id} task={task} />) }
            </ul>
        </div>
    );
};
