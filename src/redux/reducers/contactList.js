import {
  LOAD_CONTACT_START,
  LOAD_CONTACT_SUCCESS,
  LOAD_CONTACT_FAIL,
  DELETE_CONTACT_START,
  DELETE_CONTACT_SUCCESS,
  PREF_FAV_CONTACT_SUCCESS,
  SEARCH_CONTACT_SUCCESS,
  ADD_NEW_CONTACT_SUCCESS,
  LOAD_NEW_CONTACT_SUCCESS,
  LOAD_NEW_CONTACT_SUCCESS_DEC,
} from "../utils/types";

import mainDatas from "../../assets/data";

const initialState = {
  isLoading: false,
  data: null,
  mainData: mainDatas,
};

function array_move(arr) {
  return arr;
}

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
        iiii = catchDataFromStorage
          .slice(rangeInd, lastInd + 1)
          .reverse()
          .sort(function (a, b) {
            return b.isFav - a.isFav;
          });
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

    case DELETE_CONTACT_START:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      };

    case DELETE_CONTACT_SUCCESS:
      let itemsAfterRemovedFromMainArray = catchDataFromStorage.filter(
        (item) => item.id !== action.payload
      );
      let findIndexMain =
        itemsAfterRemovedFromMainArray[
          itemsAfterRemovedFromMainArray.length - 1
        ];
      findIndexMain = itemsAfterRemovedFromMainArray.indexOf(findIndexMain);
      return {
        ...state,
        data:
          itemsAfterRemovedFromMainArray.length > 4
            ? itemsAfterRemovedFromMainArray
                .slice(findIndexMain - 3, findIndexMain + 1)
                .reverse()
            : itemsAfterRemovedFromMainArray,
        mainData: [...itemsAfterRemovedFromMainArray],
        isLoading: false,
      };

    case PREF_FAV_CONTACT_SUCCESS:
      return {
        ...state,
        data: state.data
          .map((item) => {
            if (item.id === action.payload) {
              item.isFav = !item.isFav;
              const index = state.mainData.indexOf(item);
              state.mainData[index].isFav = item.isFav;
              return item;
            }
            return item;
          })
          .sort(function (a, b) {
            return b.isFav - a.isFav;
          }),
      };

    case SEARCH_CONTACT_SUCCESS:
      let searchedItem = [];
      catchDataFromStorage.filter((item) => {
        if (item.name.toLowerCase().includes(action.payload.toLowerCase())) {
          searchedItem.push(item);
          // return searchedItem;
        }

        return searchedItem;
      });

      return {
        ...state,
        // data: searchedItem.length > 4 ? searchedItem.slice(0, 4) : searchedItem,

        data:
          searchedItem.length > 4
            ? searchedItem.slice(0, 4).sort(function (a, b) {
                return b.isFav - a.isFav;
              })
            : searchedItem.sort(function (a, b) {
                return b.isFav - a.isFav;
              }),

        isLoading: false,
      };

    case ADD_NEW_CONTACT_SUCCESS:
      const entryToMainArray = {
        id:
          catchDataFromStorage.length === 0
            ? parseInt(0)
            : parseInt(
                catchDataFromStorage[catchDataFromStorage.length - 1].id + 1
              ),
        name: `${action.payload}`,
        isFav: false,
      };

      var newMainArray = array_move([
        ...catchDataFromStorage,
        entryToMainArray,
      ]);
      return {
        ...state,
        mainData: [...catchDataFromStorage, entryToMainArray],
        data:
          newMainArray.length >= 4
            ? newMainArray.slice(0, 4).sort(function (a, b) {
                return b.isFav - a.isFav;
              })
            : newMainArray.slice(0, 4).sort(function (a, b) {
                return b.isFav - a.isFav;
              }),
      };

    case LOAD_NEW_CONTACT_SUCCESS:
      let lastContactListItemIndex = action.payload.id2;
      let part2;

      if (lastContactListItemIndex > 4) {
        part2 = catchDataFromStorage
          .slice(lastContactListItemIndex - 3, lastContactListItemIndex + 1)
          .reverse();
      } else {
        part2 = catchDataFromStorage
          .slice(0, lastContactListItemIndex + 1)
          .reverse();
      }
      return {
        ...state,
        data: part2.sort(function (a, b) {
          return b.isFav - a.isFav;
        }),
        isLoading: false,
      };

    case LOAD_NEW_CONTACT_SUCCESS_DEC:
      let catchDataFromStorageDec = catchDataFromStorage;
      let part1Dec = catchDataFromStorageDec.slice(
        action.payload.id1 - 5,
        action.payload.id1
      );
      return {
        ...state,
        data:
          part1Dec.length >= 4
            ? part1Dec.slice(0, 4).sort(function (a, b) {
                return b.isFav - a.isFav;
              })
            : part1Dec,
        isLoading: false,
      };
    default:
      return state;
  }
}
