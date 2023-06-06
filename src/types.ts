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
  ADD_ITEM = "ADD_ITEM",
  ADD_ITEMS = "ADD_ITEMS",
  CHANGE_FORM_VISIBILITY = "CHANGE_FORM_VISIBILITY",
}

export type Item = {
  title: string;
  path: string;
  createdAt: any;
  user: string;
};

export type AppState = {
  inputs: Input;
  items: Item[];
  isFormVisible: boolean;
};

export type AppActionPayload = {
  eventTarget?: eventTarget;
  item?: Item;
  isFormVisible?: boolean;
  items?: Item[];
};

export type AppAction = {
  type: AppActionKind;
  payload: AppActionPayload;
};

export type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  fetchItems: () => void;
};

export type AuthContextType = {
  login: () => void;
  logout: () => void;
  currentUser: any;
  authenticate: any;
};
