import { FETCH_PETS } from '../actions';

export default function (state = [], action) {
  if (action.type === FETCH_PETS) {
    //always concat and never set the state = state.newvalue;
    return _.uniqBy(_.flattenDeep([action.payload.data.data, ...state]), '_id');
  }
  return state;
};