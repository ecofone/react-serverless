import React from "react";

export type Input = {
  title: string | null;
  file: string | null;
  path: string | null;
};

export type eventTarget = {
  name: string;
  value: string;
  files: any;
};

export enum AppActionKind {
  UPDATE_INPUT = "UPDATE_INPUT",
  SET_ITEMS = "SET_ITEMS",
  CHANGE_FORM_VISIBILITY = "CHANGE_FORM_VISIBILITY",
  FILTER_ITEMS = "FILTER_ITEMS",
}

export type Item = {
  title: string;
  path: string;
  createdAt: any;
  user: string;
  id: string;
};

export type AppState = {
  inputs: Input;
  items: Item[];
  itemsFromDB: Item[];
  isFormVisible: boolean;
};

export type AppActionPayload = {
  eventTarget?: eventTarget;
  item?: Item;
  isFormVisible?: boolean;
  items?: Item[];
  filteredItems?: Item[];
};

export type AppAction = {
  type: AppActionKind;
  payload: AppActionPayload;
};

export type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  fetchItems: () => void;
  filterItems: (search: string) => void;
};

export type AuthContextType = {
  login: () => void;
  logout: () => void;
  currentUser: any;
  authenticate: any;
};
