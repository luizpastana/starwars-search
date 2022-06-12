const ADD_FILTER = 'ADD_FILTER';
const REMOVE_FILTER = 'REMOVE_FILTER';
const RESETE = 'RESETE';

export const initialState = [
  {
    id: 0,
    column: '',
    comparison: '',
    value: '',
  },
];

export function reducer(state, action) {
  switch (action.type) {
  case ADD_FILTER:
    return [...state, action.payload];
  case REMOVE_FILTER:
    return [...state.filter((item) => item.id !== action.payload)];
  case RESETE:
    return initialState;
  default:
    return state;
  }
}
