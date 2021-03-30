import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {Form} from "../ClientPage/Form";

export function FormDialog({ clientId }) {
    const [open, setOpen] = React.useState(false);

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
                </DialogTitle>
                <Form clientId={clientId} />

            </Dialog>
        </div>
    );
}
