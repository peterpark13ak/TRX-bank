import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import hexaBg from '~/static/images/crypto/hexa-nav.png';

const testiStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(20)
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 200
    }
  },
  subtitle: {
    lineHeight: 2,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Segoe UI'
  },
  subtext: {
    lineHeight: 2,
    fontSize: 16,
    fontFamily: 'Segoe UI'
  }
}));

export default testiStyles;
