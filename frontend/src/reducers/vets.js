import { FETCH_VETS, SUBMIT_VISIT } from '../actions';
import _ from 'lodash';

export default function (state=[], action){
  if (action.type === FETCH_VETS) {
    //always concat and never set the state = state.newvalue;
    return _.uniqBy(_.flattenDeep([action.payload.data.data, ...state]), '_id');
  }
  return state;
};