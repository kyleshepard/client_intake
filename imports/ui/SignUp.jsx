import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import {
    useFormik, Formik, Field, Form,
} from "formik";
import Yup from 'yup';
import { LinearProgress } from "@material-ui/core";
import { TextField } from 'formik-material-ui';
import { Copyright } from "./Frequents";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const SignUp = () => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        username: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                        // .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        lastName: Yup.string()
                        // .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                        username: Yup.string()
                            // .email('Invalid email address')
                            .required('Required'),
                        password: Yup.string()
                            .required('Required'),
                    })}
                    onSubmit={({
                        firstName, lastName, username, password, ...values
                    }) => {
                        alert(JSON.stringify({firstName, lastName, username, password, ...values}, null, 2));
                        try {
                            Meteor.call('users.register',
                                firstName,
                                lastName,
                                username,
                                password);
                            // return <Redirect exact to="/home" />;
                            history.push("/");
                        } catch (error) {
                            alert(error);
                        }
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        autoComplete="fname"
                                        name="firstName"
                                        id="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="First Name"
                                        autoFocus

                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
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
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>

        </Container>
    );
};
