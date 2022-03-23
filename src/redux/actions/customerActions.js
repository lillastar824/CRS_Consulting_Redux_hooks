export const getCustomers = () => async (dispatch) => {
  try {
    await fetch("https://tester.crs-consulting.com/api/entries")
      .then((data) => data.json())
      .then((data) => {
        dispatch({
          type: "SET_CUSTOMER_DATA",
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_CUSTOMER_DATA_ERROR",
        });
        alert("Something went rong while fetching users");
      });
  } catch (error) {
    return false;
  }
};
