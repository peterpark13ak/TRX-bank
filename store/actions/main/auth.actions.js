import Router from 'next/router';
import { setCookie, removeCookie, getCookieFromBrowser } from '~/utils/cookie';
import routeLink from '~/static/text/link';
import api from '~/config/ApiConfig.js'
import jwtDecode from 'jwt-decode';
import * as actions from './message.actions';

export const LOGIN = '[AUTH] AUTHENTICATE';
export const LOGOUT = '[AUTH] DEAUTHENTICATE';

// gets token from the api and stores it in the redux store and in cookie
export const authenticate = ({ username, password }) => {
  return (dispatch) => {
    api.post('login', { username, password })
      .then((response) => {
        console.log(response.data)
        setCookie('token', response.data);
        Router.push(routeLink.crypto.plans);
        dispatch({type: LOGIN, payload: response.data});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Invalid username and password."}));
        // throw new Error(err);
      });
  };
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = () => {
  let token = getCookieFromBrowser('token');
  if ( !token )
  {
    Router.push(routeLink.crypto.admin);
    return (dispatch) => {
      dispatch({type: null});
    };
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if ( decoded.exp < currentTime )
    {
      console.warn('access token expired');
      Router.push(routeLink.hosting.admin);
      removeCookie('token');
      return (dispatch) => {
        dispatch(actions.showMessage({message: "Access token expired."}));
        dispatch({type: null});
      };
    }
  } catch (error) {
    return (dispatch) => {
      dispatch({type: null});
    };    
  }

  return (dispatch) => {
    api.post(`accesstoken`, token)
      .then((response) => {
        setCookie('token', response.data);
        dispatch({type: LOGIN, payload: response.data});
      })
      .catch((err) => {
        Router.push('/error');
        dispatch(actions.showMessage({message: "Invalid access token."}));
      });
  };
};

// removing the token
export const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('token');
    Router.push(routeLink.crypto.home);
    dispatch({type: LOGOUT});
  };
};
