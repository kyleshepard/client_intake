import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://worldreliefspokane.org/">
                World Relief Spokane
            </Link>
            {' '}
            {new Date().getFullYear()}
            .
        </Typography>
    );
}

// Treat this button like it was a materialUI button with the extra prop of to which is the path to route to
// It will route after whatever onClick executes
export const LinkButton = ({ to, onClick = () => {}, ...props }) => {
    const history = useHistory();

    return <Button onClick={() => { onClick(); history.push(to); }} {...props} />;
};