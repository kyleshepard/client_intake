import React from 'react';
import { useTracker } from "meteor/react-meteor-data";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import { ClientsCollection } from "../api/ClientsCollection";
import { FormsCollection } from "../api/FormsCollection";
import { FormField } from "./FormField";

export function Form({ clientId }) {
    const clientData = useTracker(() => ClientsCollection.findOne({ _id: clientId }));
    const topLevelFields = useTracker(() => FormsCollection.find({ parentId: undefined }).fetch());
    return (
        <>
            <List>
                {topLevelFields.map((fieldData) => <FormField clientData={clientData} key={fieldData._id} fieldData={fieldData} />)}
            </List>
        </>

    );
}

export function FormDialog({ clientId }) {
    const [open, setOpen] = React.useState(false);
    const client = useTracker(() => ClientsCollection.findOne({_id: clientId}));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open Client
            </Button>

            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">
                    Modify This Client<br/>
                    <b>{client.fullName}</b>
                </DialogTitle>
                <Form clientId={clientId} />

            </Dialog>
        </div>
    );
}
