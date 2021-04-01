import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip'

export const mainListItems = ({open})=> (
    <div>
        <ListItem button>
            <ListItemIcon>
                <Tooltip title={open ? "" : "Clients"} placement="right">
                    <PeopleIcon />
                </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Clients" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Tooltip title={open ? "" : "Users"} placement="right">
                    <BarChartIcon />
                </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Software Users" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Tooltip title={open ? "" : "Forms"} placement="right">
                    <LayersIcon />
                </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Form Editor" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Recently Viewed Clients</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="John Doe" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Jane O'Real" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Mark McPerson" />
        </ListItem>
    </div>
);
