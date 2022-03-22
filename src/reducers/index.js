import { GET_WEATHER, ERROR, CLEAR_DATA } from "../actions";

const getLocationId = (state = [], action) => {
  switch (action.type) {
    case GET_WEATHER:
      return action.json;
    case ERROR:
      return action.error;
    case CLEAR_DATA:
      return [];
    default:
      return state;
  }
};

export default getLocationId;
