import { List, Typography, Paper, Divider, Box } from "@material-ui/core";
import React from "react";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import { FormsCollection } from "/imports/db/FormsCollection";
import { useParams } from 'react-router-dom';
import { FormField3 } from "./FormField3";
import { useTrackerSubscription } from "../../api/customHooks";
import { sizing } from '@material-ui/system';


export function Form() {
    const { clientId } = useParams();
    const { data: clientData, isLoading: isLoadingClient } = useTrackerSubscription('clients', () => ClientsCollection.findOne({ _id: clientId }));

    return clientData ? (
        <>
            <Box variant="outlined" boxShadow={2} bgcolor="background.paper" height={1300} width={800}>
              <Typography gutterBottom align="center" variant="h4">{clientData.fullName}</Typography>
              <Divider variant="middle" />
              {
                    (isLoadingClient)
                        ? <Typography>Loading Information...</Typography>
                        : (
                            <FormField3
                                clientData={clientData}
                            />
                        )
                }
            </Box>
        </>

    ) : (
        <div>
            Client Not Found
        </div>
    );
}
