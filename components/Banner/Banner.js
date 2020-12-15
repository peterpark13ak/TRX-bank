import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import useStyles from './banner-style';

function Banner(props) {
  const classes = useStyles();
  const text = useText();
  const elem = useRef(null);

  const { t } = props;
  const theme = useTheme();

  const [hide, setHide] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleScroll = () => {
    if (!elem.current) {
      return;
    }
    const doc = document.documentElement;
    const elTop = elem.current.offsetTop - 200;
    const elBottom = elTop + elem.current.getBoundingClientRect().height;
    if (doc.scrollTop > elTop && doc.scrollTop < elBottom) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  useEffect(() => {
    // window.particlesJS('particles_backgrond', {
    //   particles: {
    //     number: {
    //       value: 80,
    //       density: {
    //         enable: true,
    //         value_area: 800
    //       }
    //     },
    //     color: {
    //       value: '#ffffff'
    //     },
    //     shape: {
    //       type: 'circle',
    //       stroke: {
    //         width: 0,
    //         color: '#000000'
    //       },
    //       polygon: {
    //         nb_sides: 5
    //       }
    //     },
    //     opacity: {
    //       value: 0.5,
    //       random: false,
    //       anim: {
    //         enable: false,
    //         speed: 1,
    //         opacity_min: 0.1,
    //         sync: false
    //       }
    //     },
    //     size: {
    //       value: 3,
    //       random: true,
    //       anim: {
    //         enable: false,
    //         speed: 40,
    //         size_min: 0.1,
    //         sync: false
    //       }
    //     },
    //     line_linked: {
    //       enable: true,
    //       distance: 150,
    //       color: '#ffffff',
    //       opacity: 0.4,
    //       width: 1
    //     },
    //     move: {
    //       enable: true,
    //       speed: 2,
    //       direction: 'none',
    //       random: false,
    //       straight: false,
    //       out_mode: 'out',
    //       bounce: false,
    //       attract: {
    //         enable: false,
    //         rotateX: 600,
    //         rotateY: 1200
    //       }
    //     }
    //   },
    //   interactivity: {
    //     detect_on: 'canvas',
    //     events: {
    //       onhover: {
    //         enable: true,
    //         mode: 'repulse'
    //       },
    //       onclick: {
    //         enable: true,
    //         mode: 'push'
    //       },
    //       resize: true
    //     },
    //     modes: {
    //       grab: {
    //         distance: 400,
    //         line_linked: {
    //           opacity: 1
    //         }
    //       },
    //       bubble: {
    //         distance: 400,
    //         size: 40,
    //         duration: 2,
    //         opacity: 8,
    //         speed: 3
    //       },
    //       repulse: {
    //         distance: 200,
    //         duration: 0.4
    //       },
    //       push: {
    //         particles_nb: 4
    //       },
    //       remove: {
    //         particles_nb: 2
    //       }
    //     }
    //   },
    //   retina_detect: true
    // });
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <div className={classes.root} ref={elem}>
      <div className={classes.canvasWrap}>
        <div className={classes.overlay}>
          <div className={clsx(classes.decoInner, hide && classes.hide)}>
            <div id="particles_backgrond" className={classes.particleBackground} />
          </div>
        </div>
      </div>
      <Container fixed>
        <div className={classes.bannerWrap}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={8}>
              <div className={classes.text}>
                <Typography variant="h2" className={text.title}>
                  {t('crypto-landing:banner_title')}
                </Typography>
                <Typography component="p" className={text.subtitle} style={{marginTop: 20}}>
                  {t('crypto-landing:banner_subtitle')}
                </Typography>
              </div>
              <div className={classes.btnArea}>
                <AnchorLink href="#invest" style={{textDecoration: 'none'}}>
                  <Button variant="contained" color="secondary" size="large" fullWidth={isMobile}>
                    {t('crypto-landing:banner_investnow')}
                  </Button>
                </AnchorLink>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <figure className={classes.objectArt}>
                <img src="/static/images/crypto/banner-art.png" alt="illustration" />
              </figure>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className={classes.decoBottom}>
        <svg>
          <use xlinkHref="/static/images/crypto/deco-banner.svg#main" />
        </svg>
      </div>
    </div>
  );
}

Banner.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['crypto-landing'])(Banner);
