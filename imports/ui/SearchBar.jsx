import React, { useState } from "react";
import {
    Button, Grid, TextField, Checkbox, FormControlLabel,
} from '@material-ui/core';
import { useTracker } from 'meteor/react-meteor-data';
import { useTrackerSubscription } from '/imports/api/customHooks';
import SearchIcon from '@material-ui/icons/Search';
import { Meteor } from 'meteor/meteor';
import { FormsCollection } from '/imports/db/FormsCollection';
import { fieldTypes } from '../api/formConstants';
import { ClientsCollection } from '../db/ClientsCollection';

export const SearchBar = ({searchQuery, onSearchUpdate}) => {
    
    // const { search } = window.location;
    // const query = new URLSearchParams(search).get('s');
    const [searchTerm, setSearchTerm] = useState(searchQuery || "")
    // const [searchQuery, setSearchQuery] = useState(query || "");

    return (
        <form action="/" method="get">
            <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <SearchIcon />
                </Grid>

                <Grid key="Search Clients" item>
                    <TextField
                        label="Client Name"
                        value={searchTerm || ""}
                        onChange={e => setSearchTerm(e.target.value)}
                        onInput={e => console.log(searchTerm)}
                        type="text"
                        id="header-search"
                        name="s"
                    />
                </Grid>

                <Grid item>
                    <Button 
                        type="submit"
                        onClick={e => {e.preventDefault(); onSearchUpdate(searchTerm);}}
                        >Search</Button>
                </Grid>

            </Grid>
        </form>
    );
};
