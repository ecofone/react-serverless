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
    case AppActionKind.ADD_ITEMS:
      return action.payload.items
        ? {
            ...state,
            items: [...action.payload.items],
          }
        : { ...state };
    case AppActionKind.ADD_ITEM:
      return state.inputs.path
        ? {
            inputs: {
              title: null,
              file: null,
              path: null,
            },
            items: action.payload.item
              ? [...state.items, { ...action.payload.item }]
              : [...state.items],
            isFormVisible: false,
          }
        : { ...state };
    case AppActionKind.CHANGE_FORM_VISIBILITY:
      return {
        ...state,
        isFormVisible: action.payload.isFormVisible ?? !state.isFormVisible,
      };
  }
};

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchItems = async () => {
    const items = await readDocs("stocks");
    dispatch({ type: AppActionKind.ADD_ITEMS, payload: { items } });
  };
  return (
    <AppContext.Provider value={{ state, dispatch, fetchItems }}>
      {children}
    </AppContext.Provider>
  );
};
