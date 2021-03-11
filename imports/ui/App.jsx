import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ImagesCollection } from "../api/ImagesCollection";

export const App = () => {
    const images = useTracker(() => ImagesCollection.find({}).fetch());
    const [image, setImage] = useState(undefined);
    const [name, setName] = useState("");
    const onFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    const onUpload = () => {
        ImagesCollection.insert({ file: image, meta: { name } });
        setImage(undefined);
        setName("");
    };
    const remove = (item) => {
        ImagesCollection.remove({ _id: item._id });
    };

    return (
        <div>
            <h1>Welcome to Meteor!</h1>
            <input type="file" onChange={onFileChange} />
            {image && (
                <img
                    alt={name}
                    src={image && URL.createObjectURL(image)}
                    style={{ height: 200, aspectRatio: 1 }}
                />
            )}
            {image && <input onChange={(e) => setName(e.target.value)} value={name} />}
            {image && name && (
                <button onClick={onUpload}>
                    Upload Image
                </button>
            )}
            <ul>
                {images.map((item) => {
                    const x = ImagesCollection.findOne({ _id: item._id }).link('original', window.location.href);
                    return (
                        <div key={item._id}>
                            <img src={x} style={{ width: 100, aspectRatio: 1 }} />
                            {item.meta && item.meta.name}

                            <button onClick={() => remove(item)}>
                                Delete
                            </button>
                        </div>
                    );
                })}
            </ul>

        </div>
    );
};
