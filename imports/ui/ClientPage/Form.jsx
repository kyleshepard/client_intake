import { List, Typography } from "@material-ui/core";
import React from "react";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import { FormsCollection } from "/imports/db/FormsCollection";
import { useParams } from 'react-router-dom';
import { FormField } from "./FormField";
import { GmailTreeView } from "./FormField2";
import { useTrackerSubscription } from "../../api/customHooks";

export function Form() {
    const { clientId } = useParams();
    const { data: clientData, isLoading: isLoadingClient } = useTrackerSubscription('clients', () => ClientsCollection.findOne({ _id: clientId }));
    const { data: topLevelFields, isLoading: isLoadingFields } = useTrackerSubscription('forms', () => FormsCollection.find({ parentId: undefined }).fetch());

    return clientData ? (
        <>
            <GmailTreeView />
            {/*<List>*/}
                <Typography variant="h4">{clientData.fullName}</Typography>
                {
                    (isLoadingClient || isLoadingFields)
                        ? <Typography>Loading Information...{`${isLoadingClient}, ${isLoadingFields}`}</Typography>
                        : topLevelFields.map((fieldData) => (
                          <FormField
                              clientData={clientData}
                              key={fieldData._id}
                              fieldData={fieldData}
                          />

                        ))
                }
            {/*</List>*/}
        </>

    ) : (
        <div>
            Client Not Found
        </div>
    );
}
