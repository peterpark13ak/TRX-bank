import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import Title from '../Title';
import useStyles from './invest-style';
import Card from '@material-ui/core/Card';
import brand from '~/static/text/brand';

import { get_plans } from '~/store/actions/main';

function Invest(props) {
  const classes = useStyles();
  const text = useText();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t, tronAddress, tronBalance, allInvest } = props;

  const dispatch = useDispatch();
  const plans = useSelector(state => state.main.data.plans);

  useEffect(() => {
    if (plans === null) {
      dispatch(get_plans());
    }
  }, [plans]);

  const handleInvest = async (planId) => {
    var amount = parseFloat(document.getElementById("amount" + planId).value);
    if (amount >= 10) {
      if (tronWeb) {
        try {
          var tx = await tronWeb.transactionBuilder.sendTrx(brand.crypto.trxTo, (amount + 2.5) * 1000000, tronAddress)
          var signedTx = await tronWeb.trx.sign(tx)
          var broastTx = await tronWeb.trx.sendRawTransaction(signedTx)
          if (broastTx.result === true) {
            let planIdx = _.findIndex(plans, {id: planId});
            let contract = await tronWeb.contract().at(brand.crypto.contractAddress);

            await contract.postInvest(
              amount * 1000000,
              parseInt(plans[planIdx].dailyIncome * 1000000 / 3600 / 24),
              plans[planIdx].days * 3600 * 24).send();
            console.log(broastTx)
            window.location.reload();
          }
        } catch(e) {
          alert(e)
        }
      }
    }
    else {
      alert("You should invest more than 10 TRX.")
    }
  }

  const handleCompound = async (planId) => {
    var amount = parseFloat(document.getElementById("amount" + planId).value);
    if (amount >= 10) {
      if (tronWeb) {
        try {
          let planIdx = _.findIndex(plans, {id: planId});
          let contract = await tronWeb.contract().at(brand.crypto.contractAddress);

          await contract.postCompound(
            amount * 1000000,
            parseInt(plans[planIdx].dailyIncome * 1000000 / 3600 / 24),
            plans[planIdx].days * 3600 * 24).send();
          window.location.reload();
        } catch(e) {
          alert(e)
        }
      }
    }
    else {
      alert("You should invest more than 10 TRX.")
    }
  }

  const PlanCard = (plan) => {
    return (
      <Card className={classes.card}>
        <Typography className={classes.greyText} align="center">
          {plan.name}
        </Typography>
        <br />
        <Typography className={classes.greyText} align="center">
          [ <span style={{color: 'red'}}>{t('crypto-landing:invest_dailyroi')}</span> ]
        </Typography>
        <br />
        <Typography className={classes.percent} align="center">{plan.dailyIncome}%</Typography>
        <br />

        <div className={classes.textContent}>
          <div style={{display: 'flex', marginBottom: 8}}>
            <DoneOutlineIcon style={{color: 'green', fontSize: 18, marginRight: 4}} />
            <Typography align="left" style={{fontSize: 14}}>
              {t('crypto-landing:invest_dividendsper')}
            </Typography>
          </div>
          <div style={{display: 'flex', marginBottom: 8}}>
            <DoneOutlineIcon style={{color: 'green', fontSize: 18, marginRight: 4}} />
            <Typography align="left" style={{fontSize: 14}}>
              <strong>{plan.days === 0 ? t('crypto-landing:invest_forever') : plan.days + ' ' + t('crypto-landing:invest_days') }</strong>
            </Typography>
          </div>
          <div style={{display: 'flex', marginBottom: 8}}>
            <DoneOutlineIcon style={{color: 'green', fontSize: 18, marginRight: 4}} />
            <Typography align="left" style={{fontSize: 14}}>
              {t('crypto-landing:invest_totalreturn')} {plan.days > 0 && <strong>{(plan.days * plan.dailyIncome).toFixed(1)}%</strong>}
            </Typography>
            {plan.days === 0 && <strong style={{fontSize: 26, marginTop: -4, marginLeft: 4}}> ∞</strong>}
          </div>
          <div style={{display: 'flex', marginBottom: 8}}>
            <DoneOutlineIcon style={{color: 'green', fontSize: 18, marginRight: 4}} />
            <Typography align="left" style={{fontSize: 14}}>
              {t('crypto-landing:invest_mininvestment')} <strong>10</strong> TRX
            </Typography>
          </div>

          <FormControl variant="outlined" style={{marginTop: 12}}>
            <OutlinedInput
              id={"amount"+plan.id}
              type="number"
              endAdornment={<InputAdornment position="end">TRX</InputAdornment>}
              inputProps={{
                'aria-label': 'weight',
              }}
            />
          </FormControl>

          <Typography align="center" style={{color: 'red', marginTop: 10, fontSize: 14}}>
            {t('crypto-landing:invest_mintransaction')}
          </Typography>
          <br />
        </div>

        <div style={{textAlign: 'center'}}>
          <Button variant="contained" color="secondary" size="large" onClick={() => handleInvest(plan.id)} fullWidth>
            {t('crypto-landing:header_invest')}
          </Button>

          <Button variant="contained" color="secondary" size="large" onClick={() => handleCompound(plan.id)} style={{marginTop: 12}} fullWidth>
            {t('crypto-landing:header_compound')}
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className={classes.mainInvest}>
      <Container fixed>
        <div>
          <Typography className={classes.greyText} align="center">
            {t('crypto-landing:invest_totalinvested')}
          </Typography>
          <Typography className={classes.trxText} align="center">
            {allInvest / 1000000} TRX
          </Typography>
          <Typography align="center">
            {t('crypto-landing:invest_yourwalllet')}: <strong>{tronAddress}</strong>
          </Typography>
          <Typography align="center">
            {t('crypto-landing:invest_walletbalance')}: <strong>{(tronBalance/1000000).toFixed(2)}</strong> TRX
          </Typography>
        </div>
        <Grid container spacing={3} style={{marginTop: 20}}>
          {plans !== null && plans.map((plan) => 
            <Grid item md={3} sm={6} xs={12} key={plan.id}>
              {PlanCard(plan)}
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}

Invest.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['crypto-landing'])(Invest);
