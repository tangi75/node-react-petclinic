// state in reducer is not application state but reducer specific state
// state = null for initial state when no vet is selected.
// return current state if no action.type is found.
export default function (state = null, action) {
  if(action.type === 'SELECTED_VET'){
    return action.payload;
  }

  return state;
}