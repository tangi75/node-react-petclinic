import { combineReducers } from 'redux';
import VetsReducer from './vets'
import SelectedVetReducer from './selected-vet';

import PetsReducer from './pets'
import SelectedPetReducer from './selected-pet';

import VisitRequestReducer from './visit-request'

const rootReducer = combineReducers({
  vets: VetsReducer,
  pets: PetsReducer,
  visitRequest: VisitRequestReducer,
  selectedVet: SelectedVetReducer,
  selectedPet: SelectedPetReducer
})

export default rootReducer;
