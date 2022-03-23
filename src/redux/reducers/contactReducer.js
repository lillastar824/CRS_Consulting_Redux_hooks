const contactReducer = (
  state = { customerDetails: [], error: false },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CUSTOMER_DATA":
      return {
        ...state,
        customerDetails: payload,
      };
    case "SET_CUSTOMER_DATA_ERROR":
      return { customerDetails: [], error: true };
    default:
      return state;
  }
};
export default contactReducer;
