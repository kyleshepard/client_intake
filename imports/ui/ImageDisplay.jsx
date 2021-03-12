import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { ImagesCollection } from "../api/ImagesCollection";

export function ImageDisplay({ clientid }) {
    const images = useTracker(() => ImagesCollection.find(clientid && { meta: { clientid: clientid } }).fetch());
    const [image, setImage] = useState(undefined);
    const onFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    const onUpload = () => {
        ImagesCollection.insert({ file: image, meta: { clientid: clientid } });
        setImage(undefined);
    };
    const remove = (item) => {
        ImagesCollection.remove({ _id: item._id });
    };

    return (
        <div style={{ display: "flex", flexDirection: 'row' }}>
            {clientid}
            <input type="file" onChange={onFileChange} />
            {image && (
                <img
                    alt="Image Missing"
                    src={image && URL.createObjectURL(image)}
                    style={{ height: 200, aspectRatio: 1 }}
                />
            )}
            {image && (
                <button onClick={onUpload}>
                    Upload Image
                </button>
            )}
            <ul>
                {images.map((item) => {
                    const link = ImagesCollection.findOne({ _id: item._id }).link('original', window.location.href);
                    return (
                        <div key={item._id}>
                            <a href={link} target="_blank">
                                <img src={link} style={{ width: 100, aspectRatio: 1 }} />
                            </a>

                            <button onClick={() => remove(item)}>
                                Delete
                            </button>
                        </div>
                    );
                })}
            </ul>

        </div>
    );
}
