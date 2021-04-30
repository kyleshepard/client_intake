import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Chart from './Files/ClientChart';
import Deposits from './Files/ClientTotal';
import Orders from './Files/ClientList';
import { NavBar, useStyles } from "../Frequents";

const drawerWidth = 240;

export function AccountForm() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <NavBar>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <Deposits />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Orders />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <TextField
                        label="Username"
                        value="Average Joe"
                        onChange={(e) => {
                            e.preventDefault();
                            setFullName(e.target.value);
                        }}
                    />
                    <TextField
                        label="Email"
                        value="defaultemail@email.com"
                        onChange={(e) => {
                            e.preventDefault();
                            setFullName(e.target.value);
                        }}
                    />
                    <TextField
                        label="Password"
                        value="123456"
                        onChange={(e) => {
                            e.preventDefault();
                            setFullName(e.target.value);
                        }}
                    />
                    <TextField
                        label="Location"
                        value="NewCastle, UK"
                        onChange={(e) => {
                            e.preventDefault();
                            setFullName(e.target.value);
                        }}
                    />
                </Paper>
            </Grid>
        </NavBar>

    );
}
