// import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
    List, ListItem, Paper, Grid, Checkbox, TextField,
} from "@material-ui/core";
import { useTracker } from "meteor/react-meteor-data";
import EditIcon from '@material-ui/icons/Edit';
import { FormsCollection } from "/imports/db/FormsCollection";
import { fieldTypes } from "../../api/formConstants";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import { FileUpload } from "./FileUpload";

/*
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
*/

export const FormField = ({ fieldData, clientData }) => {
    const children = useTracker(() => FormsCollection.find({ parentId: fieldData._id }).fetch());
    let editor;
    const value = clientData && clientData.data && clientData.data[fieldData._id];
    const updateFunc = (newData) => { // TODO: this function should have a submit button instead of constantly updating the database
        const temp = clientData && clientData.data;
        temp[fieldData._id] = newData;
        Meteor.call('clients.set', clientData._id, {
            data: temp
        });
    };
    if (fieldData.type) {
        if (fieldData.type === fieldTypes.string) {
            editor = <TextField value={value} onChange={(e) => updateFunc(e.target.value)} />;
        } else if (fieldData.type === fieldTypes.bool) {
            editor = <Checkbox checked={value} onChange={() => updateFunc(!value)} />;
        } else if (fieldData.type === fieldTypes.file) {
            editor = <FileUpload clientId={clientData._id} fieldId={fieldData._id} />;
        }
    }
    return (
        <ListItem>
            <Paper variant="outlined" style={{ padding: 5, width: '100%' }} elevation={3}>
                <Grid container direction="column">
                    <Grid item container direction="row" alignItems="center" spacing={1}>
                        {/*<Grid item>
                            <EditIcon />
                        </Grid>*/}
                        <Grid item>
                            {`${fieldData.name}: `}
                        </Grid>
                        <Grid item>
                            {editor}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <List>
                            {children.map((child) => <FormField clientData={clientData} key={child._id} fieldData={child} />)}
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        </ListItem>
    );
};

/*
const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function FileSystemNavigator() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
        <TreeItem nodeId="3" label="Chrome" />
        <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="Material-UI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" />
            <TreeItem nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
};
*/
