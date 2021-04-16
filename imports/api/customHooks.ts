import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

export const useToggle = (initState = false):[boolean, ()=>void] => {
    const [val, setVal] = useState(initState);
    const toggle = () => setVal((x) => !x);
    return [val, toggle];
};

export const useTrackerSubscription = (subscriptionName:string, queryCallback) => useTracker(() => {
    const handler = Meteor.subscribe(subscriptionName);
    if (!handler.ready()) {
        return { data: undefined, isLoading: true };
    }
    return { data: queryCallback(), isLoading: false };
});
