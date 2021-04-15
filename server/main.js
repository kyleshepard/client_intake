import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import "../imports/db/ClientsCollection";
import { FormsCollection } from "/imports/db/FormsCollection";
import "../imports/db/FormFilesCollection";
import { documentFields } from "../imports/api/formConstants";
import "./userConfig";
import '../imports/api/clientsMethods';
import '../imports/api/formsMethods';
import '../imports/api/usersMethods';
import '../imports/api/attachmentsMethods';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
            isActive: true,
            isAdmin: true,
        });
    }

    function uploadToMeteor(dataArray, collection, parentId) {
        dataArray.forEach(({
            description,
            childFields,
            name,
            childFieldsUnique,
            type,
        }) => {
            collection.insert({
                description, parentId, name, childFieldsUnique, type,
            },
            (e, _id) => childFields && uploadToMeteor(childFields, collection, _id));
        });
    }

    Meteor.call('forms.remove', {});
    if (FormsCollection.find({}).fetch().length === 0) {
        uploadToMeteor(documentFields, FormsCollection);
    }
});
