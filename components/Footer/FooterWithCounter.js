import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import useStyles from './footer-style';

function FooterWithDeco(props) {
  const classes = useStyles();
  const { toggleDir } = props;
  return (
    <div className={classes.footerCounter}>
      <div className={classes.decoTop}>
        <svg>
          <use xlinkHref="/static/images/crypto/deco-footer.svg#main" />
        </svg>
      </div>
      <Footer toggleDir={toggleDir} />
    </div>
  );
}

FooterWithDeco.propTypes = {
  toggleDir: PropTypes.func.isRequired
};

export default FooterWithDeco;
