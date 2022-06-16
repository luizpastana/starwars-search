const ASC = 'ASC';
const DESC = 'DESC';

export const initialOrderState = [
  {
    order: {
      colunm: '',
      sort: '',
    },
  },
];

export function orderReducer(state, action) {
  switch (action.type) {
  case ASC:
    return state;
  case DESC:
    return state;
  default:
    return state;
  }
}
