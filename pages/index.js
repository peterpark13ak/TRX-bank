import React, { useState, useEffect } from 'react';
import _ from '~/@lodash';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Home from '../components/Home';
import Invest from '../components/Invest';
import Benefit from '../components/Benefit';
import About from '../components/About';
import FooterWithCounter from '../components/Footer/FooterWithCounter';
import PageNav from '../components/PageNav';
import brand from '../static/text/brand';
import { useDispatch } from "react-redux";
import { withTranslation } from '~/i18n';
import { showMessage } from '../store/actions/main';

const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.type === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
  },
  spaceBottom: {
    marginBottom: sectionMargin(theme.spacing()),
    [theme.breakpoints.down('md')]: {
      marginBottom: sectionMargin(6),
    }
  },
  spaceTop: {
    marginTop: sectionMargin(6),
    [theme.breakpoints.down('md')]: {
      marginTop: sectionMargin(6),
    }
  },
  spaceBottomShort: {
    marginBottom: sectionMargin(theme.spacing() / 2),
  },
  spaceTopShort: {
    marginTop: sectionMargin(theme.spacing() / 2),
  },
  containerWrap: {
    marginTop: -40,
    '& > section': {
      position: 'relative'
    }
  }
}));

function Landing(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { t, onToggleDark, onToggleDir } = props;
  const [userInfo, setUserInfo] = useState({
    totalInvest: 0,
    totalIncome: 0,
    totalReferral: 0,
    totalWithdraw: 0,
    oneSecondIncome: 0,
    allInvest: 0
  })
  const [tronAddress, setTronAddress] = useState("");
  const [tronBalance, setTronBalance] = useState(0);
  const dispatch = useDispatch();

  const loadSmartContract = async () => {
    setTronAddress(tronWeb.defaultAddress.base58)
    let balance = await tronWeb.trx.getBalance(tronWeb.defaultAddress.base58);
    setTronBalance(balance);

    let contract = await tronWeb.contract().at(brand.crypto.contractAddress);
    let result = await contract.getTotalInvest().call();
    let totalInvest = parseInt(result.ret._hex);
    
    result = await contract.getTotalIncome().call();
    let totalIncome = parseInt(result.ret._hex);
    
    result = await contract.getTotalWithdraw().call();
    let totalWithdraw = parseInt(result.ret._hex);

    result = await contract.getTotalReferral().call();
    let totalReferral = parseInt(result.ret._hex);

    result = await contract.getOneSecondIncome().call();
    let oneSecondIncome = parseInt(result.ret._hex);

    // result = await contract.getAllTotalInvest().call();
    // let allInvest = parseInt(result.ret._hex);
    let allInvest = 0;

    console.log(totalIncome, totalInvest, totalWithdraw, totalReferral, oneSecondIncome, allInvest)
    setUserInfo({totalIncome, totalInvest, totalWithdraw, totalReferral, oneSecondIncome, allInvest});
  }

  useEffect(async () => {
    let timer = setInterval(async () => {
      clearInterval(timer)
      if (process.browser) {
        if (tronWeb) {
          await loadSmartContract();

          if (props.token !== null && props.token !== undefined) {
            var decodedToken = Buffer.from(props.token, 'base64').toString();
      
            let contract = await tronWeb.contract().at(brand.crypto.contractAddress);
            const addressInHex = tronWeb.address.toHex(decodedToken);
            let result = await contract.postReferral(addressInHex).send();

            if (result) {
              dispatch(showMessage({message: t('crypto-landing:referral_success')}))
            }
          }
        }
      }
    }, 3000)
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Home Page
        </title>
      </Head>
      <CssBaseline />
      <section id="home" />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
        />
        <main className={classes.containerWrap}>
          <section id="banner">
            <Banner />
          </section>
          <section id="home">
            <Home totalInvest={userInfo.totalInvest} totalDividends={userInfo.totalIncome + userInfo.totalReferral} />
          </section>
          <section id="invest" className={isTablet ? classes.spaceTopShort : ''}>
            <Invest tronAddress={tronAddress} tronBalance={tronBalance} allInvest={userInfo.allInvest} />
          </section>
          <section id="benefit" className={classes.spaceTopShort} style={{height: isMobile ? 900 : 500}}>
            <Benefit tronAddress={tronAddress} totalInvest={userInfo.totalInvest} totalDividends={userInfo.totalIncome + userInfo.totalReferral}
            withdrawable={userInfo.totalIncome + userInfo.totalReferral - userInfo.totalWithdraw} referral={userInfo.totalReferral} oneSecondIncome={userInfo.oneSecondIncome} />
          </section>
          <section id="about" className={classes.spaceTop}>
            <About />
          </section>
        </main>
        <FooterWithCounter toggleDir={onToggleDir} />
        <Hidden mdDown>
          <PageNav />
        </Hidden>
        <script src="/static/scripts/particles.min.js" />
        <script src="/static/scripts/stats.min.js" />
      </div>
    </React.Fragment>
  );
}

Landing.getInitialProps = async ({query: { token }}) => ({
  namespacesRequired: ['common', 'crypto-landing'],
  token: token
});

Landing.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};


export default withTranslation(['crypto-landing'])(Landing);
