import React, { useState, useEffect } from 'react';
import {  Button, Container, useMediaQuery, Grid, Typography } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './login-style';
import routeLink from '~/static/text/link';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from '~/store/actions/main';
import { getCookieFromBrowser, removeCookie } from '~/utils/cookie';
import Router from 'next/router';

function Login(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  useEffect(() => {
    removeCookie('token');
  }, []);

  const handleSubmit = () => {
    dispatch(authenticate({username: values.username, password: values.password}));
  };
  
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container maxWidth='sm' className={classes.mainContainer}>
      <ValidatorForm
        onError={errors => console.log(errors)}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography className={classes.label}>Username</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextValidator fullWidth
              variant="outlined"
              className={classes.input}
              onChange={handleChange('username')}
              name="username"
              value={values.username}
              validators={['required']}
              errorMessages={['This field is required']}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.label}>Password</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextValidator fullWidth
              variant="outlined"
              type="password"
              className={classes.input}
              validators={['required']}
              onChange={handleChange('password')}
              errorMessages={['This field is required']}
              name="password"
              value={values.password}
            />
          </Grid>
        </Grid>
        <div className={classes.btnArea}>
          <Button size='large' variant="contained" fullWidth type="submit" size="large">
            Sign In
          </Button>
        </div>
      </ValidatorForm>
    
    </Container>
  );
}

export default Login;