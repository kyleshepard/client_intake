import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Label from '@material-ui/icons/Label';
import Divider from '@material-ui/core/Divider';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
    Button, Checkbox, Grid, InputLabel, MenuItem, Paper, Select, Box,
} from "@material-ui/core";
import { useTrackerSubscription } from "../../api/customHooks";
import { FormsCollection } from "../../db/FormsCollection";
import { fieldTypes } from "../../api/formConstants";
import { FileUpload } from "./FileUpload";

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content, &$selected > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}));

function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const {
        labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other
    } = props;

    return (
        <TreeItem
            label={(
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </div>
            )}
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 800,
    },
});

export const FormField3 = ({ clientData }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const { data, loading } = useTrackerSubscription('forms', () => FormsCollection.find({}).fetch());
    const formFields = loading ? [] : data;
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds[0]);
    };
    const updateFunc = (newData) => {
        const temp = clientData && clientData.data;
        temp[fieldData._id] = newData;
        Meteor.call('clients.set', clientData._id, {
            data: temp,
        });
    };

    const renderTree = (fieldData) => {
        const value = clientData && clientData.data && clientData.data[fieldData._id];
        let editor;
        if (fieldData.type) {
            if (fieldData.type === fieldTypes.string) {
                editor = <Grid item><TextField value={value} onChange={(e) => updateFunc(e.target.value)} /></Grid>;
            } else if (fieldData.type === fieldTypes.bool) {
                editor = <Grid item><Checkbox checked={value} onChange={() => updateFunc(!value)} /></Grid>;
            } else if (fieldData.type === fieldTypes.file) {
                editor = <Grid item><FileUpload clientId={clientData._id} fieldId={fieldData._id} /></Grid>;
            } else {
                editor = <div />;
            }
        }
        return (
            <TreeItem
                key={fieldData._id}
                nodeId={(
                    fieldData._id
                )}
                label={(
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Typography>
                                {fieldData.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            {editor}
                        </Grid>

                    </Grid>
                )}
            >

                {data.filter((f) => (f.parentId === fieldData._id)).map((f) => renderTree(f))}

            </TreeItem>
        );
    };
    return (
        <Grid container spacing={2}>
            <Grid item>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    selected={selected}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                >
                    {formFields && formFields.filter((f) => !f.parentId).map((f) => renderTree(f))}
                </TreeView>
            </Grid>
        </Grid>
    );
};
