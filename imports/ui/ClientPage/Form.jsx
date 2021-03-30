import { useTracker } from "meteor/react-meteor-data";
import { List, Typography, ListSubheader } from "@material-ui/core";
import React from "react";
import { ClientsCollection } from "../../api/ClientsCollection";
import { FormsCollection } from "../../api/FormsCollection";
import { FormField } from "./FormField";

export function Form({ clientId }) {
    const clientData = useTracker(() => ClientsCollection.findOne({ _id: clientId }));
    const topLevelFields = useTracker(() => FormsCollection.find({ parentId: undefined }).fetch());
    return (
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

    );
}
