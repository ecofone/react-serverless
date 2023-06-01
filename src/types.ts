export interface Input {
  title: string | null;
  file: string | null;
  path: string | null;
}

export type eventTarget = {
  name: string;
  value: string;
  files: any;
};

export enum AppActionKind {
  UPDATE_INPUT = "UPDATE_INPUT",
  ADD_ITEM = "ADD_ITEM",
  CHANGE_FORM_VISIBILITY = "CHANGE_FORM_VISIBILITY",
}

export type AppState = {
  inputs: Input;
  items: string[];
  isFormVisible: boolean;
};

export type AppActionPayload = {
  eventTarget?: eventTarget;
  item?: string;
  isFormVisible?: boolean;
};

export type AppAction = {
  type: AppActionKind;
  payload: AppActionPayload;
};
