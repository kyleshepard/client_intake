import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Hello } from "./Hello";
import { ImagesCollection } from "../api/ImagesCollection";

export const App = () => {
    const images = useTracker(() => ImagesCollection.find({}).fetch());
    const [image, setImage] = useState(undefined);
    const onFileChange = (e) => {
        console.log("Event", e.target.files);
        setImage(e.target.files[0]);
    };
    const onUpload = () => {
        ImagesCollection.insert({ file: image });
    };
    console.log("Images", images.map((i)=>i));
    return (
        <div>
            <ul>
                {images.map((item) => {
                    console.log(item, item.link)
                    const x = ImagesCollection.findOne({ _id: item._id }).link();
                    return <img src={x} style={{height:200, aspectRatio:1}} />;
                })}
            </ul>
            <Hello />
            <h1>Welcome to Meteor!</h1>
            <input type="file" onChange={onFileChange} />
            <img alt="Awaiting Image upload" src={image && URL.createObjectURL(image)} style={{ width: 200, aspectRatio: 1 }} />
            {images && (
                <button onClick={onUpload}>
                    Upload Image
                </button>
            )}
            <ul />
        </div>
    );
};
