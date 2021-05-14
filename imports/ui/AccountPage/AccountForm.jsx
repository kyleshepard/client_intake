import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Button, useScrollTrigger} from '@material-ui/core'
import { NavBar, useStyles } from "../Frequents";
import {
    Formik, Field, Form,
} from "formik";
import Yup from 'yup';
import { useTrackerSubscription } from "/imports/api/customHooks";
import { TextField } from 'formik-material-ui';
const drawerWidth = 240;

export function AccountForm() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const { data: user, isLoading: isLoading } = useTrackerSubscription('user', () => Meteor.users.findOne({_id: Meteor.userId}));

    if(isLoading){
        return <Typography>Loading</Typography>
    }
    else{
        return (
            <NavBar>
                {/* Password, Password Confirmation, First Name, last Name*/}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper style={{padding:15}}>
                    {Meteor.user() && <Formik
                        initialValues={{
                            fname : user.fname ?? '',
                            lname: user.lname ?? '',
                            password: '',
                            passwordConfirm: '',
                        }}
                        validationSchema={Yup.object({
                            fname: Yup.string(),
                                // .max(15, 'Must be 15 characters or less')
                                //.required('Required'),
                            lname: Yup.string(),
                                // .max(20, 'Must be 20 characters or less')
                                //.required('Required'),
                            password: Yup.string()
                                .min(8, "Password must be at least 8 characters"),
                                //.required('Required'),
                            passwordConfirm: Yup.string()
                                .oneOf([Yup.ref('password')], 'Passwords must match'),
                                //.required('Required'),
                        })}
                        onSubmit={({
                            fname, lname, password, ...values
                        }) => {
                            // alert("SUBMIT", fname, lname, password);
                            try {
                                Meteor.call('users.update',
                                    fname,
                                    lname,
                                    password);
                            } catch (error) {
                                alert(error);
                            }
                        }}
                    >
                        {({ submitForm }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={TextField}
                                            autoComplete="fname"
                                            name="fname"
                                            id="fname"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="First Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={TextField}
                                            autoComplete="lname"
                                            name="lname"
                                            id="lname"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Last Name"
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
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="passwordConfirm"
                                            label="Confirm Password"
                                            type="password"
                                            id="passwordConfirm"
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={submitForm}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>}
                    </Paper>
                </Grid>         
            </NavBar>
        );
    }
}
