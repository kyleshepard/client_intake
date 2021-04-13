import { useTracker } from "meteor/react-meteor-data";
import { List, Typography } from "@material-ui/core";
import React from "react";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import { FormsCollection } from "/imports/db/FormsCollection";
import { useParams } from 'react-router-dom';
import { FormField } from "./FormField";

export function Form() {
    const { clientId } = useParams();
    const { clientData } = useTracker(() => {
        const noData = { clientData: undefined };
        if (!Meteor.user()) {
            return noData;
        }
        const handler = Meteor.subscribe('clients');
        if (!handler.ready()) {
            return { ...noData, isLoading: true };
        }
        return { clientData: ClientsCollection.findOne({ _id: clientId }) };
    });
    console.log("CLIENT", clientId, clientData, ClientsCollection.find({}).fetch());
    const { topLevelFields, isLoading } = useTracker(() => {
        const noData = { topLevelFields: undefined };
        if (!Meteor.user()) {
            return noData;
        }
        const handler = Meteor.subscribe('Forms');
        if (!handler.ready()) {
            return { ...noData, isLoading: true };
        }
        return { topLevelFields: FormsCollection.find({ parentId: undefined }).fetch(), isLoading: false };
    });
    return clientData ? (
        <>

            <List>
                <Typography variant="h4">{clientData.fullName}</Typography>
                {isLoading ? <h1>Loading</h1> : topLevelFields.map((fieldData) => (
                    <FormField
                        clientData={clientData}
                        key={fieldData._id}
                        fieldData={fieldData}
                    />
                ))}
            </List>
        </>

    ) : (
        <div>
            Client Not Found
        </div>
    );
}
