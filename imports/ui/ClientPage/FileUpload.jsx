import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import {
    Input, Button, Ul, A,
} from '@material-ui/core';
import { ImagesCollection } from "../../api/ImagesCollection";

export function FileUpload({ clientId, fieldId }) {
    const images = useTracker(() => ImagesCollection.find(clientId && { meta: { client_id: clientId, field_id: fieldId } }).fetch());
    const [image, setImage] = useState(undefined);
    const onFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    const onUpload = () => {
        ImagesCollection.insert({ file: image, meta: { client_id: clientId, field_id: fieldId } }); // Defines which client and which field associated
        setImage(undefined);
    };
    const remove = (item) => {
        ImagesCollection.remove({ _id: item._id });
    };

    return (
        <div style={{ display: "flex", flexDirection: 'row' }}>
            <Button
                color="primary"
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type="file"
                    onChange={onFileChange}
                    hidden
                />
            </Button>
            {image && (
                <img
                    alt="File Missing"
                    src={image && URL.createObjectURL(image)}
                    style={{ height: 200, aspectRatio: 1 }}
                />
            )}
            {image && (
                <Button type="button" onClick={onUpload}>
                    Upload Image
                </Button>
            )}
            <ul>
                {images.map((item) => {
                    const link = ImagesCollection.findOne({ _id: item._id }).link('original', window.location.href);
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
