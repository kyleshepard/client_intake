import React, { useState } from 'react';
import { ClientsCollection } from '../api/ClientsCollection';
import { documentFields } from "../api/formConstants";

export const ClientForm = () => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text) return;

        // ClientsCollection.insert({
        //     text: text.trim(),
        //     createdAt: new Date(),
        // });

        // Object.keys(documentFields).forEach(key => {
        //     console.log(documentFields[key]._id);
        // });

        let client = {
            text: text.trim(),
            formData: {},
            createdAt: Date()
        };
        
        function recursive(field){
            //intialize object
            formData = {
                field_name: field.name,
                data: field.type
            }
            // console.log(field);
            //if there are sub-fields with data that we need
            if(field.childFields){
                // console.log('in child fields');
                //initialize childFields field
                childFormData = {};
                console.log(field.childFields);
                //add each one to our set of child fields
                field.childFields.forEach(childField => {
                    // console.log(childField.name + " " + childField._id);
                    // console.log(`--${childField.name} is a child of ${field.name} and has ${(childField.childFields != void(0)) ? childField.childFields.length : 0} children itself`);
                    
                //    childFormData[childField._id] = recursive(childField);
                   console.log(childFormData[childField._id], field);
                });
                formData['childFormData'] = childFormData;
            }
            return formData;
        }
        
        //eventually this will be a mongo collection, for now its defined in formConstants.ts
        documentFields.forEach(field => {
            // client['formData'][field._id] = {
            //     field_name:  field.name,
            //     data: null
            // };
            
            client['formData'][field._id] = recursive(field);
        });
        ClientsCollection.insert(client);

        setText("");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Type name of new client" value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit">Add New Client</button>
        </form>
    );
};
