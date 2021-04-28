import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Redirect, useHistory } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';

import Yup from "yup";
import { Field, Form, Formik } from "formik";
import { LinearProgress } from "@material-ui/core";
import {Copyright, LinkButton} from "./Frequents";
import SignUp from './SignUp';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(/assets/Spokane_logo_4C.PNG)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#E0FEFF',
        // theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export function LoginForm() {
    const classes = useStyles();

    return (

        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        validationSchema={Yup.object({
                            username: Yup.string()
                                .required('Required'),
                            password: Yup.string()
                                .required('Required'),
                        })}
                        onSubmit={({
                            username, password,
                        }) => {
                            console.log(username, password);
                            try {
                                Meteor.loginWithPassword(username, password);
                                history.push("/");
                            } catch (error) {
                                alert(error);
                            }
                        }}
                    >
                        {({ submitForm, isSubmitting }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Username"
                                            name="username"
                                            autoComplete="username"

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                </Grid>
                                {isSubmitting && <LinearProgress />}
                                <br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Sign in
                                </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link href={'/signup'} variant="body2">
                                            Don't have an account? Sign up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Grid>
        </Grid>
    );
}
