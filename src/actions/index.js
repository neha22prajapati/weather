export const GET_WEATHER = "GET_WEATHER";
export const ERROR = "ERROR";
export const CLEAR_DATA = "CLEAR_DATA";

const getId = (json) => {
  const action = {
    type: GET_WEATHER,
    json,
  };

  return action;
};

const postId = (id) => {
  return fetch(`https://www.metaweather.com/api/location/${id}`).then((res) =>
    res.json()
  );
};

export const getWeather = (id) => {
  return function (dispatch) {
    return postId(id).then((json) => dispatch(getId(json)));
  };
};

export const getError = (error) => {
  return {
    type: ERROR,
    error,
  };
};

export const clearData = () => {
  return {
    type: CLEAR_DATA,
  };
};
