import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import brand from '../static/text/brand';
import Login from '../components/Login';

const useStyles = makeStyles(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  containerWrap: {
    width: '100%',
    height: '100%',
  },
}));

function Admin(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Login
        </title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <main className={classes.containerWrap}>
            <section>
              <Login />
            </section>
        </main>
      </div>
    </React.Fragment>
  );
}

Admin.propTypes = {
};

Admin.getInitialProps = async () => ({
  namespacesRequired: ['common', 'crypto-landing'],
});

export default Admin;
