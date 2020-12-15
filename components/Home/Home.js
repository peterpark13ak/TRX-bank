import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import 'react-animated-slider/build/horizontal.css';
import useStyles from './home-style';
import '~/vendors/animate-slider.css';
import imgAPI from '~/static/images/imgAPI';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import widgetImage from '../../static/images/crypto/widget-2-1.png';

function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  const text = useText();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { t, totalInvest, totalDividends } = props;
  return (
    <div className={classes.root}>
      <Container fixed={isDesktop}>
        <div className={classes.sliderWrap}>
          <div className="slider-wrapper">
            <Grid container spacing={8}>
              {isDesktop && 
                <Grid item md={6} sm={12}>
                  <img src={widgetImage} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="widget-2-1" />
                </Grid>
              }
              <Grid item md={6} sm={12}>

                <div style={{marginTop: isDesktop ? 150 : 30, textAlign: isDesktop ? 'left' : 'center'}}>
                  <Typography component="p" className={text.title3} style={{marginTop: 40, marginBottom: 30}}>
                    <AccountBalanceIcon className={text.title3} style={{paddingTop: 10}} />{t('crypto-landing:banner_myinvestments')}
                  </Typography>

                  <Typography component="p" style={{marginLeft: 10}}>
                    {t('crypto-landing:benefit_mytotalinvestment')} <strong>{(totalInvest/1000000).toFixed(2)}</strong> TRX
                  </Typography>

                  <Typography component="p" style={{marginLeft: 10, marginTop: 8}}>
                    {t('crypto-landing:benefit_totaldividends')} <strong>{(totalDividends/1000000).toFixed(2)}</strong> TRX
                  </Typography>

                  <AnchorLink href="#invest" style={{textDecoration: 'none'}}>
                    <Button variant="contained" color="secondary" size="large" fullWidth={isMobile} style={{marginTop: 30}}>
                      {t('crypto-landing:banner_investnow')}
                    </Button>
                  </AnchorLink>

                </div>

              </Grid>
            </Grid>

          </div>
        </div>
      </Container>
    </div>
  );
}

Home.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['crypto-landing'])(Home);
