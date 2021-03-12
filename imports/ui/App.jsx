import React, { useState, Fragment } from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from '/imports/ui/TaskForm';
import { LoginForm } from './LoginForm';
import {ImageDisplay} from "./ImageDisplay";

const toggleChecked = ({_id, isChecked }) => {
    TasksCollection.update(_id, {
        $set: {
            isChecked: !isChecked
        }
    })
};




export const App = () => {
    const user = useTracker(() => Meteor.user());
    const deleteTask = ({_id}) => TasksCollection.remove(_id);
    const hideCompletedFilter = {isChecked: { $ne: true} };
    const userFilter = user ? {userId: user._id} : {};
    const [hideCompleted, setHideCompleted] = useState(false);
    const tasks = useTracker(() => TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {sort: {createdAt: -1}} ).fetch());
    const pendingTasksCount = useTracker(() => TasksCollection.find(hideCompletedFilter).count());
    const pendingTasksTitle = `${
        pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;

    return (
        <div className="main">
            { user ? (
                <Fragment>
                    <h1>The Best Animes{pendingTasksTitle}</h1>

                    <TaskForm/>
                    <div className="filter">
                        <button onClick={() => setHideCompleted(!hideCompleted)}>
                            {hideCompleted ? 'Show All' : 'Hide Completed'}
                        </button>
                    </div>
                    <ul>
                        { tasks.map(task => <Task key={task._id} task={ task } onCheckBoxClick={toggleChecked} onDeleteClick={deleteTask}/>)}
                    </ul>
                    <ImageDisplay/>
                </Fragment>
            ) : (
                <LoginForm/>
            )}
        </div>
    );
};
