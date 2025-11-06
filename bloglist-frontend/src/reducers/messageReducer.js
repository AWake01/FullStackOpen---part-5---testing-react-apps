const messageReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return (state = action.payload);
    case "CLEAR_MESSAGE":
      return (state = "");
    default:
      return state;
  }
};

export const setMessage = (message) => {
  return {
    type: "SET_MESSAGE",
    payload: message,
  };
};

export default messageReducer;
