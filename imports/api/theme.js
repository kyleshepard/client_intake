import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const baseTheme = createMuiTheme({
    palette: {
        common: { black: "#000", white: "#fff" },
        background: {
            paper: "#fff",
            default: "#fafafa",
        },
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
        error: {
            main: "#f44336",
        },
    },
});

export const theme = responsiveFontSizes(baseTheme);
