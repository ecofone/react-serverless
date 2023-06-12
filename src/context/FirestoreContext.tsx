import React, { createContext, useReducer } from "react";
import {
  AppState,
  AppAction,
  AppActionKind,
  Input,
  AppContextType,
} from "../types";

import { FireStore } from "../handlers/firestore";
const { readDocs } = FireStore;

const initialState: AppState = {
  inputs: {
    title: null,
    file: null,
    path: null,
  },
  items: [],
  itemsFromDB: [],
  isFormVisible: false,
};

export const AppContext = createContext<AppContextType | null>(null);

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionKind.UPDATE_INPUT:
      const inputs: Input =
        action.payload.eventTarget?.name === "title"
          ? { ...state.inputs, title: action.payload.eventTarget.value }
          : {
              ...state.inputs,
              file: action.payload.eventTarget?.files[0],
              path: URL.createObjectURL(action.payload.eventTarget?.files[0]),
            };
      return { ...state, inputs };
    case AppActionKind.SET_ITEMS:
      const newItems = action.payload.items ? action.payload.items : [];
      return {
        ...state,
        items: [...newItems],
        itemsFromDB: [...newItems],
      };
    case AppActionKind.FILTER_ITEMS:
      return {
        ...state,
        items: [
          ...(action.payload.filteredItems ? action.payload.filteredItems : []),
        ],
      };

    case AppActionKind.CHANGE_FORM_VISIBILITY:
      return {
        ...state,
        isFormVisible: action.payload.isFormVisible ?? !state.isFormVisible,
      };
    default:
      return { ...state };
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchItems = async () => {
    const items = await readDocs("stocks");
    dispatch({ type: AppActionKind.SET_ITEMS, payload: { items } });
  };
  const filterItems = (search: string) => {
    if (!search || search === "") {
      dispatch({
        type: AppActionKind.SET_ITEMS,
        payload: { items: state.itemsFromDB },
      });
    } else {
      const filteredItems = state.items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      dispatch({
        type: AppActionKind.FILTER_ITEMS,
        payload: { filteredItems },
      });
    }
  };
  return (
    <AppContext.Provider value={{ state, dispatch, fetchItems, filterItems }}>
      {children}
    </AppContext.Provider>
  );
};
