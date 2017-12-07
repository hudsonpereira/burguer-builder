import * as actions from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actions.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: state.  orders.concat({
          ...action.order,
          id: action.id
        }),
        loading: false
      };
    case actions.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
  return state;
}

export default reducer;