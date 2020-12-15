import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    mainContainer: {
        marginTop: theme.spacing(30),
    },
    label: {
        fontSize: 24,
        fontFamily: 'Calibri',
        fontWeight: 600,
        marginTop: theme.spacing(),
    },
    btnArea: {
      marginTop: theme.spacing(3),
      '& button': {
          fontSize: 20,
      },
    },
}));

export default useStyles;