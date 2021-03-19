import { useState } from "react";

export const useToggle = (initState = false):[boolean, ()=>void] => {
    const [val, setVal] = useState(initState);
    const toggle = () => setVal((x) => !x);
    return [val, toggle];
};
