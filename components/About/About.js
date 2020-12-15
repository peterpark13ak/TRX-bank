import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import useStyle from './about-style';
import img1 from '~/static/images/crypto/widget-1-1.png';
import img2 from '~/static/images/crypto/widget-1-2.png';
import img3 from '~/static/images/crypto/widget-1-3.png';
import img21 from '~/static/images/crypto/widget-7-elm-1.png';
import img22 from '~/static/images/crypto/widget-7-elm-2.png';
import img23 from '~/static/images/crypto/widget-7-elm-3.png';
import img24 from '~/static/images/crypto/widget-7-elm-4.png';

function About(props) {
  const classes = useStyle();
  const text = useText();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = props;
  
  return (
    <div className={classes.root}>
      <Container fixed={isDesktop}>
        <Grid container spacing={4}>
          <Grid item md={4} sm={4} xs={12}>
            <div style={{textAlign: 'center'}}>
              <img src={img1} alt="img1" />
              <Typography>
                <p className={classes.subtitle}>{t('crypto-landing:about_subtitle1')}</p>
                <p className={classes.subtext}>{t('crypto-landing:about_subtext1')}</p>
              </Typography>
            </div>
          </Grid>
          <Grid item md={4} sm={4} xs={12}>
            <div style={{textAlign: 'center'}}>
              <img src={img2} alt="img2" />
              <Typography>
                <p className={classes.subtitle}>{t('crypto-landing:about_subtitle2')}</p>
                <p className={classes.subtext}>{t('crypto-landing:about_subtext2')}</p>
              </Typography>
            </div>
          </Grid>
          <Grid item md={4} sm={4} xs={12}>
            <div style={{textAlign: 'center'}}>
              <img src={img3} alt="img3" />
              <Typography>
                <p className={classes.subtitle}>{t('crypto-landing:about_subtitle3')}</p>
                <p className={classes.subtext}>{t('crypto-landing:about_subtext3')}</p>
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item md={3} sm={6} xs={12}>
            <div style={{textAlign: 'center', marginTop: isDesktop ? 120 : 0}}>
              <img src={img21} alt="img21" />
              <Typography>
                <p className={classes.subtitle}>{t('crypto-landing:about_nexttitle1')}</p>
                <p className={classes.subtext}>{t('crypto-landing:about_nexttext1_1')} <a target="_blank" href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec?utm_source=chrome-ntp-icon">TronLink</a> {t('crypto-landing:about_nexttext1_2')}</p>
              </Typography>
            </div>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <div style={{textAlign: 'center'}}>
              <img src={img22} alt="img22" />
              <Typography>
                <p className={classes.subtitle}>{t('crypto-landing:about_nexttitle2')}</p>
                <p className={classes.subtext}>{t('crypto-landing:about_nexttext2')}</p>
              </Typography>
            </div>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <div style={{textAlign: 'center', marginTop: isDesktop ? 120 : 0}}>
              <img src={img23} alt="img23" />
              <Typography>
                <p className={classes.subtitle}>{t('crypto-landing:about_nexttitle3')}</p>
                <p className={classes.subtext}>{t('crypto-landing:about_nexttext3')}</p>
              </Typography>
            </div>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <div style={{textAlign: 'center'}}>
              <img src={img24} alt="img24" />
              <Typography>
                <p className={classes.subtitle}>{t('crypto-landing:about_nexttitle4')}</p>
                <p className={classes.subtext}>{t('crypto-landing:about_nexttext4')}</p>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

About.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['crypto-landing'])(About);
