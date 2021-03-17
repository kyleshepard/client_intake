import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { Input, Button } from '@material-ui/core';
import { ImagesCollection } from "../api/ImagesCollection";

export function ImageDisplay({ clientid }) {
    const images = useTracker(() => ImagesCollection.find(clientid && { meta: { clientid } }).fetch());
    const [image, setImage] = useState(undefined);
    const onFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    const onUpload = () => {
        ImagesCollection.insert({ file: image, meta: { clientid } });
        setImage(undefined);
    };
    const remove = (item) => {
        ImagesCollection.remove({ _id: item._id });
    };

    return (
        <div style={{ display: "flex", flexDirection: 'row' }}>
            <Input type="file" onChange={onFileChange} />
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
