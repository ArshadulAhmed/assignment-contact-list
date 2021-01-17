import {
  LOAD_CONTACT_START,
  LOAD_CONTACT_SUCCESS,
  DELETE_CONTACT_START,
  DELETE_CONTACT_SUCCESS,
  PREF_FAV_CONTACT_SUCCESS,
  SEARCH_CONTACT_SUCCESS,
  ADD_NEW_CONTACT_SUCCESS,
  LOAD_NEW_CONTACT_SUCCESS,
  LOAD_NEW_CONTACT_SUCCESS_DEC,
} from "../utils/types";

export const loadContactList = (id1) => (dispatch) => {
  dispatch({ type: LOAD_CONTACT_START });
  dispatch({
    type: LOAD_CONTACT_SUCCESS,
    payload: { id1 },
  });
};

export const removeContactFromList = (id) => (dispatch) => {
  dispatch({ type: DELETE_CONTACT_START });
  dispatch({
    type: DELETE_CONTACT_SUCCESS,
    payload: id,
  });
};

export const changeFavouritePreferene = (id) => (dispatch) => {
  dispatch({
    type: PREF_FAV_CONTACT_SUCCESS,
    payload: id,
  });
};

export const searchFriendName = (userInput) => (dispatch) => {
  dispatch({
    type: SEARCH_CONTACT_SUCCESS,
    payload: userInput,
  });
};

export const addFriendToList = (userInput) => (dispatch) => {
  dispatch({
    type: ADD_NEW_CONTACT_SUCCESS,
    payload: userInput,
  });
};

export const handleIncrement = (id2) => (dispatch) => {
  dispatch({
    type: LOAD_NEW_CONTACT_SUCCESS,
    payload: { id2 },
  });
};

export const handleDecremnt = (id1, id2) => (dispatch) => {
  dispatch({
    type: LOAD_NEW_CONTACT_SUCCESS_DEC,
    payload: { id1, id2 },
  });
};
