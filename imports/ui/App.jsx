import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Tasks';
import { Hello } from "./Hello";

export const App = () => {
    const tasks = useTracker(() => TasksCollection.find({}).fetch());
    const [image, setImage] = useState(undefined);
    const onFileChange = (event) => {
        console.log("Event", event.target.files);
        setImage(event.target.files[0]);
    };
    console.log(image);
    return (
        <div>
            <Hello />
            <h1>Welcome to Meteor!</h1>
            <input type="file" onChange={onFileChange} />
            <img alt="Awaiting Image upload" src={image && URL.createObjectURL(image)} style={{ width: 200, aspectRatio: 1 }} />
            <ul>
                { tasks.map((task) => <Task key={task._id} task={task} />) }
            </ul>
        </div>
    );
};
