import { makeStyles } from '@material-ui/core/styles';

const investStyles = makeStyles(theme => ({
  mainInvest: {
    position: 'relative',
    display: 'block',
    paddingTop: theme.spacing(6),
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(8),
    }
  },
  greyText: {
    color: '#899ea7',
    fontWeight: 'bold'
  },
  trxText: {
    color: '#0db0c2',
    fontSize: 40,
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#f4fbfd',
    padding: theme.spacing(3),
    lineHeight: 1.0
  },
  percent: {
    lineHeight: '128px',
    width: '128px',
    height: '128px',
    borderRadius: '50%',
    backgroundColor: '#dee4e7',
    color: '#000000',
    fontSize: 52,
    fontWeight: 700,
    fontFamily: 'Segoe UI, sans-serif',
    position: 'relative',
    margin: '20px auto 25px auto'
  },
  textContent: {
    minWidth: 200,
    margin: '10px auto 10px auto',
    fontFamily: 'Segoe UI',
    color: 'black'
  },
}));

export default investStyles;
