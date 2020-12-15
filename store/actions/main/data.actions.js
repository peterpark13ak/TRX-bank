import api from '~/config/ApiConfig.js'
import * as actions from './message.actions';

export const GET_PLANS = '[DATA] GET PLANS';
export const ADD_PLAN = '[DATA] ADD PLAN';
export const REMOVE_PLAN = '[DATA] REMOVE PLAN';
export const UPDATE_PLAN = '[DATA] UPDATE PLAN';

export const get_plans = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('plans')
      return dispatch({type: GET_PLANS, payload: response.data});
    } catch (error) {
      return dispatch(actions.showMessage({message: "Get the plans failed."}));
    }
  };
};

export const add_plan = (plan) => {
  return async (dispatch) => {
    try {
      await api.post('plans', plan)
      return dispatch({type: ADD_PLAN});
    } catch (error) {
      return dispatch(actions.showMessage({message: "Add a plan failed."}));
    }
  };
};

export const update_plan = (plan) => {
  return async (dispatch) => {
    try {
      await api.put(`plans/${plan.id}`, plan)
      return dispatch(get_plans());
    } catch (error) {
      return dispatch(actions.showMessage({message: "Update plan failed."}));
    }
  };
};

export const remove_plan = (plan) => {
  return async (dispatch) => {
    try {
      await api.delete(`plans/${plan.id}`)
      return dispatch({type: REMOVE_PLAN});
    } catch (error) {
      return dispatch(actions.showMessage({message: "Update plan failed."}));
    }
  };
};
