import { makeStyles } from '@material-ui/core/styles';
import decoBenefit from '~/static/images/crypto/deco-benefit.svg';
import decoList from '~/static/images/crypto/deco-list.png';

const benefitStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    background: 'transparent',
  },
  wrapper: {
    position: 'relative',
    paddingTop: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8)
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    }
  },
  desc: {
    padding: 0,
    fontSize: 16,
    fontFamily: 'Segoe UI',
    '& h4': {
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  parallaxWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  parallaxProps: {
    height: 800,
  },
  title2: {
    fontSize: 36,
    lineHeight: '56px',
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default benefitStyles;
