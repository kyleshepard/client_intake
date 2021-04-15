import { List, Typography } from "@material-ui/core";
import React from "react";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import { FormsCollection } from "/imports/db/FormsCollection";
import { useParams } from 'react-router-dom';
import { FormField } from "./FormField";
import { useTrackerSubscription } from "../../api/customHooks";

export function Form() {
    const { clientId } = useParams();
    const { data: clientData } = useTrackerSubscription('clients', () => ClientsCollection.findOne({ _id: clientId }));
    const { data: topLevelFields } = useTrackerSubscription('Forms', () => FormsCollection.find({ parentId: undefined }).fetch());

    return clientData ? (
        <>

            <List>
                <Typography variant="h4">{clientData.fullName}</Typography>
                {topLevelFields.map((fieldData) => (
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
