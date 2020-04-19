import { SUBMIT_VISIT } from '../actions';

export default function (state = {}, action) {
  if (action.type === SUBMIT_VISIT) {
    //always concat and never set the state = state.newvalue;
    return action.payload;
  }
  return state;
};