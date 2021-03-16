import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ClientsCollection } from "../imports/api/ClientsCollection";
import { ImagesCollection } from "../imports/api/ImagesCollection";

const insertClient = (taskText) => ClientsCollection.insert({ text: taskText });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
    console.log(ImagesCollection);
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }
});
