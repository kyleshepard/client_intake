import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { ClientForm } from "./ClientForm";
import { Client } from "./Client";
import { documentFields } from "../api/formConstants";
import { ClientsCollection } from "../api/ClientsCollection";

const toggleChecked = ({ _id, isChecked }) => {
    ClientsCollection.update(_id, {
        $set: {
            isChecked: !isChecked,
        },
    });
};

export const MainPage = () => {
    console.log("FIELDS", documentFields);
    const deleteClient = ({ _id }) => ClientsCollection.remove(_id);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const [hideCompleted, setHideCompleted] = useState(false);
    const tasks = useTracker(() => ClientsCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());
    const pendingClientsCount = useTracker(() => ClientsCollection.find(hideCompletedFilter).count());
    const pendingClientsTitle = `${
        pendingClientsCount ? ` (${pendingClientsCount})` : ''
    }`;
    return (
        <>
            <button onClick={Meteor.logout}>Log out</button>
            <h1>
                Clients
                {pendingClientsTitle}
            </h1>

            <ClientForm />
            <div className="filter">
                <button onClick={() => setHideCompleted(!hideCompleted)}>
                    {hideCompleted ? 'Show All' : 'Hide Completed'}
                </button>
            </div>
            <ul>
                { tasks.map((task) => <Client key={task._id} task={task} onCheckBoxClick={toggleChecked} onDeleteClick={deleteClient} />)}
            </ul>
        </>
    );
};
