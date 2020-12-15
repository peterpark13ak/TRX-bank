import * as Actions from '../../actions/main/index';

const initialState = {
  plans: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Actions.GET_PLANS:
      return {...state, plans: action.payload };
    default:
      return state;
  }
};
