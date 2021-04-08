import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import {
    Button, CircularProgress, LinearProgress,
} from '@material-ui/core';
import { FormFilesCollection } from "/imports/db/FormFilesCollection";

export function FileUpload({ clientId, fieldId }) {
    const images = useTracker(() => FormFilesCollection.find(
        clientId && fieldId && { meta: { client_id: clientId, field_id: fieldId } },
    ).fetch());
    const [uploading, setUploading] = useState(false);
    const [fileProgress, setFileProgress] = useState(0);
    const startUploading = () => { setUploading(true); setFileProgress(0); };
    const stopUploading = () => { setUploading(false); setFileProgress(0); };
    const onUpload = (e) => {
        FormFilesCollection.insert(
            {
                file: e.target.files[0],
                meta: { client_id: clientId, field_id: fieldId }, // Defines which client and which field
                onBeforeUpload: () => { startUploading(); setFileProgress(0); return true; },
                onUploaded: stopUploading,
                onError: stopUploading,
                onProgress: (v) => { setFileProgress(v); },
            },
        );
    };
    const remove = (item) => {
        FormFilesCollection.remove({ _id: item._id });
    };

    return (
        <div style={{ display: "flex", flexDirection: 'row' }}>
            {!uploading && (
                <Button
                    color="primary"
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        type="file"
                        onChange={onUpload}
                        hidden
                    />

                </Button>
            )}
            {uploading
            && (
                <CircularProgress
                    color="primary"
                    variant={fileProgress ? "determinate" : "indeterminate"}
                    value={fileProgress}
                />
            )}
            <ul>
                {images.map((item) => {
                    const link = FormFilesCollection.findOne({ _id: item._id }).link('original', window.location.href);
                    return (
                        <div key={item._id}>
                            <a href={link} target="_blank" rel="noreferrer">
                                <img alt={link} src={link} style={{ width: 100, aspectRatio: 1 }} />
                            </a>

                            <Button type="button" onClick={() => remove(item)}>
                                Delete
                            </Button>
                        </div>
                    );
                })}
            </ul>

        </div>
    );
}
