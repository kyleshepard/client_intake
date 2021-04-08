import { useTracker } from "meteor/react-meteor-data";
import { List, Typography, ListSubheader } from "@material-ui/core";
import React from "react";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import { FormsCollection } from "/imports/db/FormsCollection";
import { useParams } from 'react-router-dom';
import { FormField } from "./FormField";

export function Form() {
    const { clientId } = useParams();
    const clientData = useTracker(() => ClientsCollection.findOne({ _id: clientId }));
    const topLevelFields = useTracker(() => FormsCollection.find({ parentId: undefined }).fetch());
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

    ):<div>
        Client Not Found
    </div>;
}
