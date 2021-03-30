import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const baseTheme = createMuiTheme({
    palette: {
        common: { black: "#000", white: "#fff" },
        background: {
            paper: "#fff",
            default: "#fafafa",
        },
        primary: {
            // 1 - blue
            //main: "#3F51B5",

            // 2 - green
            main: "#1FA504",

            // 3 - lighter blue
            //main: "#007fff",

            // 4 - yellow
            //main: "#E6E602",

            // 5 - orange
            //main: "#C58403",
        },
        secondary: {
            // 1 - red
            main: "#FF0000",

            //2 - orange
            //main: "#FF9500",
        },
        error: {
            main: "#f44336",
        },
    },
});

export const theme = responsiveFontSizes(baseTheme);
