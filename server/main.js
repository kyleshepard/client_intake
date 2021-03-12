import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from "../imports/api/TasksCollection";
import {ImagesCollection} from "../imports/api/ImagesCollection";

const insertTask = taskText => TasksCollection.insert({ text: taskText });
 
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password'

Meteor.startup(() => {
  console.log(ImagesCollection);
  if(!Accounts.findUserByUsername(SEED_USERNAME)){
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    });
  }

  if (TasksCollection.find().count() === 0) {
    [
      'Courage the Cowardly Dog',
      'Johnny Bravo'
    ].forEach(insertTask)
  }
});