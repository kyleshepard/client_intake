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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
            // .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                // .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const submit = (e) => {
        e.preventDefault();
        // console.log(userData);
        // alert(password);
        try {
            Meteor.call('users.register',
                firstName,
                lastName,
                username,
                password);
            setHasSubmitted(true);
            // return <Redirect exact to="/home" />;
        } catch (error) {
            alert(error);
        }
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
    };
    if (hasSubmitted) {
        history.push("/");
    }
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
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        password: Yup.string()
                            .required('Required'),
                    })}
                    onSubmit={(values) => {
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
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
                                    name="email"
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
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
                </Formik>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>

        </Container>
    );

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validate={(values) => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                }, 500);
            }}
        >
            {({ submitForm, isSubmitting }) => (
                <Form>
                    <Field
                        component={TextField}
                        name="email"
                        type="email"
                        label="Email"
                    />
                    <br />
                    <Field
                        component={TextField}
                        type="password"
                        label="Password"
                        name="password"
                    />
                    {isSubmitting && <LinearProgress />}
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
