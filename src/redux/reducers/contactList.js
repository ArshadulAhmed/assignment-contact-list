import {
  LOAD_CONTACT_START,
  LOAD_CONTACT_SUCCESS,
  LOAD_CONTACT_FAIL,
} from "../utils/types";

import mainDatas from "../../assets/data";

const initialState = {
  isLoading: false,
  data: null,
  mainData: mainDatas,
};

export default function (state = initialState, action) {
  const catchDataFromStorage = state.mainData;
  switch (action.type) {
    case LOAD_CONTACT_START:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      };
    case LOAD_CONTACT_SUCCESS:
      let iiii;

      let lastInd = catchDataFromStorage.indexOf(
        catchDataFromStorage[catchDataFromStorage.length - 1]
      );

      let rangeInd = catchDataFromStorage.indexOf(
        catchDataFromStorage[catchDataFromStorage.length - 1 - 3]
      );
      if (catchDataFromStorage.length > 4) {
        iiii = catchDataFromStorage.slice(rangeInd, lastInd + 1).reverse();
      } else {
        iiii = [...catchDataFromStorage];
      }
      return {
        ...state,
        data: [...iiii],
        isLoading: false,
      };

    case LOAD_CONTACT_FAIL:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
