import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { CronJob } from 'cron';
import dayjs from 'dayjs';
import "../imports/db/ClientsCollection";
import { FormsCollection } from "/imports/db/FormsCollection";
import "../imports/db/FormFilesCollection";
import { documentFields } from "../imports/api/formConstants";
import "./userConfig";
import '../imports/api/clientsMethods';
import '../imports/api/formsMethods';
import '../imports/api/usersMethods';
import '../imports/api/attachmentsMethods';
import { ClientsCollection } from '../imports/db/ClientsCollection';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';
const FNAME = 'meteorite';

Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
            fname: FNAME,
            lname: "",
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

    new CronJob({
        cronTime: '0 * * * * *', //run once a minute
        // use this wrapper if you want to work with mongo:
        onTick: Meteor.bindEnvironment(() => {

            var expireDate =  dayjs(new Date).subtract(1, 'month');
            clients = ClientsCollection.find({}).fetch();
            // console.log(`checking for clients last modified before : ${expireDate}`);

            clients.forEach((client) => {

                if(dayjs(client.modifiedAt) < expireDate){

                    ClientsCollection.remove({_id: client._id});
                    console.log("deleting " + client.fullName + "...");
                }
            });
        }),
        start: true,
        timeZone: 'America/Los_Angeles',
      });
});
