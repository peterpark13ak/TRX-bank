import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import brand from '~/static/text/brand';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Parallax } from 'react-parallax';
import imgAPI from '~/static/images/crypto/widget-4-bg.jpg';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import useStyles from './benefit-style';
import { useDispatch } from "react-redux";
import { showMessage } from '~/store/actions/main';

function Benefit(props) {
  const classes = useStyles();
  const text = useText();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  let { t, totalInvest, totalDividends, withdrawable, referral, oneSecondIncome } = props;
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000));
  const [seconds, setSeconds] = useState(0);

  const dispatch = useDispatch();

  let referralLink = t('crypto-landing:benefit_nolink');
  if (props.tronAddress) {
    referralLink = brand.crypto.hostingUrl + Buffer.from(props.tronAddress).toString('base64');
  }

  const handleWithdraw = async () => {
    let amount = parseFloat(document.getElementById("amount").value);
    if (amount > 0 && amount * 1000000 <= withdrawable) {
      let contract = await tronWeb.contract().at(brand.crypto.contractAddress);
      await contract.postWithdraw(parseInt(amount * 1000000)).send();  
      setOpen(false);
    }
    else {
      alert("Withdraw amount should be less than maximum and not be zero!");
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      dispatch(showMessage({message: 'COPIED!'}))
    }, () => {
      console.error("Error");
    })
  }

  useEffect(() => {
    setInterval(() => {
      var timeElapsed = Math.floor(Date.now() / 1000) - startTime;
      setSeconds(timeElapsed);
    }, 1000);
  }, [])

  withdrawable += oneSecondIncome * seconds;
  totalDividends += oneSecondIncome * seconds;

  return (
    <div className={classes.root}>
      <div className={classes.parallaxWrap}>
        <Parallax
          bgImage={imgAPI}
          bgImageAlt="benefit"
          strength={100}
        >
          <div style={{height: isMobile ? 900 : 500}} />
        </Parallax>
      </div>
      <Container fixed={isDesktop}>
        <div className={classes.wrapper} style={{textAlign: isMobile ? 'center' : 'left'}}>
          <Grid container spacing={3} justify="center">
            <Grid item md={6} sm={12}>
              <div className={classes.desc}>
                <div style={{display: 'flex', marginBottom: 20, color: 'white'}}>
                  <MonetizationOnIcon style={{fontSize: 54, marginRight: 8}} />
                  <Typography className={classes.title2} variant="h3">
                    {t('crypto-landing:benefit_title1')}
                  </Typography>
                </div>

                <div>
                  <Typography variant="p">
                    {t('crypto-landing:benefit_referral')}
                  </Typography>
                  <br />
                  <Typography variant="p">
                    <strong>{(referral/1000000).toFixed(2)}</strong> TRX
                  </Typography>
                </div>

                <div style={{marginTop: 20}}>
                  <Typography variant="p">
                    {t('crypto-landing:benefit_withdrawable')}
                  </Typography>
                  <br />
                  <Typography variant="p">
                    <strong>{(withdrawable/1000000).toFixed(2)}</strong> TRX
                  </Typography>
                </div>

                <div style={{marginTop: 20, marginBottom: 20}}>
                  <Button onClick={() => setOpen(true)} variant="contained" color="secondary" size="large" fullWidth={isMobile}>
                    {t('crypto-landing:banner_withdraw')}
                  </Button>
                </div>

                <div>
                  <Typography variant="p" style={{color: 'white'}}>
                    {t('crypto-landing:benefit_transactionfeetext')}
                  </Typography>
                </div>

                <div style={{marginTop: 20}}>
                  <Typography component="p" >
                    {t('crypto-landing:benefit_mytotalinvestment')} <strong>{(totalInvest/1000000).toFixed(2)}</strong> TRX
                  </Typography>

                  <Typography component="p">
                    {t('crypto-landing:benefit_totaldividends')} <strong>{(totalDividends/1000000).toFixed(2)}</strong> TRX
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item md={6} sm={12}>
              <div className={classes.desc}>
                <div style={{display: 'flex', marginBottom: 20, color: 'white'}}>
                  <PeopleIcon style={{fontSize: 54, marginRight: 8}} />
                  <Typography className={classes.title2} variant="h3" align={isMobile ? 'center' : 'left'}>
                    {t('crypto-landing:benefit_title2')}
                  </Typography>
                </div>

                <div>
                  <Typography variant="p">
                    {t('crypto-landing:benefit_referrallink')} [<a style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}} onClick={handleCopyLink}>{t('crypto-landing:benefit_copylink')}</a>]:
                  </Typography>
                  <br />
                  <Typography variant="p">
                    <strong>{referralLink}</strong>
                  </Typography>
                  <br/>
                  <Typography variant="p">
                    {t('crypto-landing:benefit_referrallinkcondition')}
                  </Typography>
                </div>

                <div style={{marginTop: 20, marginBottom: 20}}>
                  <Typography variant="p">
                    1 {t('crypto-landing:benefit_ref')} ( {5}% {t('crypto-landing:benefit_referral')}) - <strong>0</strong>
                  </Typography>
                  <br/>
                  <Typography variant="p">
                    2 {t('crypto-landing:benefit_ref')} ( {2}% {t('crypto-landing:benefit_referral')}) - <strong>0</strong>
                  </Typography>
                  <br/>
                  <Typography variant="p">
                    3 {t('crypto-landing:benefit_ref')} ( {0.5}% {t('crypto-landing:benefit_referral')}) - <strong>0</strong>
                  </Typography>
                  <br/>
                  <Typography variant="p">
                    {t('crypto-landing:benefit_invitee')} ( {0.5}% {t('crypto-landing:benefit_ofinvestment')})
                  </Typography>
                </div>

                <div>
                  <Typography variant="p">
                    {t('crypto-landing:benefit_totalreferral')} - <strong>{(referral/1000000).toFixed(2)}</strong> TRX
                  </Typography>
                </div>
              </div>

            </Grid>
          </Grid>
        </div>

        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Withdraw</DialogTitle>
          <DialogContent>
            <FormControl variant="outlined" style={{marginTop: 12}}>
              <OutlinedInput
                id="amount"
                type="number"
                endAdornment={<InputAdornment position="end">TRX</InputAdornment>}
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleWithdraw} color="primary">
              Withdraw
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

Benefit.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['crypto-landing'])(Benefit);
