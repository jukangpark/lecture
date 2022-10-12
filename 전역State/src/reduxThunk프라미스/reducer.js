import { GET_DATAS, GET_DATAS_ERROR, GET_DATAS_SUCCESS } from "./action";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATAS:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case GET_DATAS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null,
      };
    case GET_DATAS_ERROR:
      return {
        ...state,
        loading: true,
        data: [],
        error: action.error,
      };
    default:
      return state;
  }
}
