import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { ClientForm } from "./ClientForm";
import { Client } from "./Client";
import { documentFields } from "../api/formConstants";
import { ClientsCollection } from "../api/ClientsCollection";
import { H1, Div, Ul, Button } from '@material-ui/core';

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
            <H1>
                Clients
                {pendingClientsTitle}
            </H1>

            <ClientForm />
            <Div className="filter">
                <Button onClick={() => setHideCompleted(!hideCompleted)}>
                    {hideCompleted ? 'Show All' : 'Hide Completed'}
                </Button>
            </Div>
            <Ul>
                { tasks.map((task) => <Client key={task._id} task={task} onCheckBoxClick={toggleChecked} onDeleteClick={deleteClient} />)}
            </Ul>
        </>
    );
};
