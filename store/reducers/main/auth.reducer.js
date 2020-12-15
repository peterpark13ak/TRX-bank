import * as Actions from '../../actions/main/index';

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
  case Actions.LOGIN:
    return { token: action.payload };
  case Actions.LOGOUT:
    return { token: null };
  default:
    return state;
  }
};
