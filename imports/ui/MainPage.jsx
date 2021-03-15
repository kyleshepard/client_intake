import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TaskForm } from "./TaskForm";
import { Task } from "./Task";
import { documentFields } from "../api/formConstants";
import { TasksCollection } from "../api/TasksCollection";

const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
        $set: {
            isChecked: !isChecked,
        },
    });
};

export const MainPage = () => {
    console.log("FIELDS", documentFields);
    const deleteTask = ({ _id }) => TasksCollection.remove(_id);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const [hideCompleted, setHideCompleted] = useState(false);
    const tasks = useTracker(() => TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());
    const pendingTasksCount = useTracker(() => TasksCollection.find(hideCompletedFilter).count());
    const pendingTasksTitle = `${
        pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;
    return (
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
        </>
    );
};
