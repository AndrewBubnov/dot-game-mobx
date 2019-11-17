import { makeStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: grey,
    },
    typography: {useNextVariants: true}
})

const margin = window.innerWidth <= 380 ? 1 : 7

export const controlStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(margin),
        marginBottom: theme.spacing(2),
        width: '100%',
        height: 50,
    },
    selectEmpty: {
        margin: theme.spacing(2),
    },
    button: {
        width: '100%',
        height: 50,
    },
    textField: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(margin),
        width: '100%',
        height: 50,
    },
    slider: {
        color: '#808080'
    },
}));
