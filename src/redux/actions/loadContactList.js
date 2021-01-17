import { LOAD_CONTACT_START, LOAD_CONTACT_SUCCESS } from "../utils/types";

export const loadContactList = (id1) => (dispatch) => {
  dispatch({ type: LOAD_CONTACT_START });
  dispatch({
    type: LOAD_CONTACT_SUCCESS,
    payload: { id1 },
  });
};
