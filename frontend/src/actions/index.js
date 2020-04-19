import axios from 'axios';

export const FETCH_VETS = 'FETCH_VETS';
export const FETCH_PETS = 'FETCH_PETS';
export const SUBMIT_VISIT = 'SUBMIT_VISIT';

const VET_URL = 'http://' + (process.env.REST_HOST ? process.env.REST_HOST : 'localhost') + ':5000/vets';
const PET_URL = 'http://' + (process.env.REST_HOST ? process.env.REST_HOST : 'localhost') + ':5000/pets';
const VISIT_URL = 'http://' + (process.env.REST_HOST ? process.env.REST_HOST : 'localhost') + ':5000/visits';

export function selectedVet(vet) {
  // selectedVet is an actionCreator it need to return action object
  // with property type.
  return {
    type: 'SELECTED_VET',
    payload: vet,
  }
}

export function selectedPet(vet) {
  // selectedPet is an actionCreator it need to return action object
  // with property type.
  return {
    type: 'SELECTED_PET',
    payload: pet,
  }
}

export function fetchVets() {
  const request = axios.get(VET_URL);
  return {
    type: FETCH_VETS,
    payload: request,
  }
}


export function fetchPets() {
  const request = axios.get(PET_URL);
  return {
    type: FETCH_PETS,
    payload: request,
  }
}

export function submit(payload) {
  const request = axios.post(VISIT_URL, payload)
    return {
      type: SUBMIT_VISIT,
      payload: request
    }
}
