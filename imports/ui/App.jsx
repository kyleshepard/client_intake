import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task.jsx';
import { TasksCollection } from '../api/TasksCollection';
import { TaskForm } from './TaskForm.jsx';
import { LoginForm } from './LoginForm.jsx';
import { ImageDisplay } from "./ImageDisplay.jsx";

const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
        $set: {
            isChecked: !isChecked,
        },
    });
};

export const App = () => {
    const user = useTracker(() => Meteor.user());
    const deleteTask = ({ _id }) => TasksCollection.remove(_id);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const userFilter = user ? { userId: user._id } : {};
    const [hideCompleted, setHideCompleted] = useState(false);
    const tasks = useTracker(() => TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());
    const pendingTasksCount = useTracker(() => TasksCollection.find(hideCompletedFilter).count());
    const pendingTasksTitle = `${
        pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;

    return (
        <div className="main">
            { user ? (
                <>
                    <h1>
                        Users
                        {pendingTasksTitle}
                    </h1>

                    <TaskForm />
                    <div className="filter">
                        <button onClick={() => setHideCompleted(!hideCompleted)}>
                            {hideCompleted ? 'Show All' : 'Hide Completed'}
                        </button>
                    </div>
                    <ul>
                        { tasks.map((task) => <Task key={task._id} task={task} onCheckBoxClick={toggleChecked} onDeleteClick={deleteTask} />)}
                    </ul>
                    <ImageDisplay />
                </>
            ) : (
                <LoginForm />
            )}
        </div>
    );
};
