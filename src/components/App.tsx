import { List } from "./List";
import { useReducer } from "react";
import { AppAction, AppActionKind, AppState, Input } from "../types";
import { Layout } from "./Layout";

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

const initialState: AppState = {
  inputs: {
    title: null,
    file: null,
    path: null,
  },
  items: [],
  isFormVisible: false,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnChange = (event: any) => {
    if (event.target.name) {
      dispatch({
        type: AppActionKind.UPDATE_INPUT,
        payload: { eventTarget: event.target },
      });
    }
  };

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    if (state.inputs.title && state.inputs.path) {
      dispatch({
        type: AppActionKind.ADD_ITEM,
        payload: {
          item: { title: state.inputs.title, path: state.inputs.path },
        },
      });
    }
  };

  const toggleFormVisible = () =>
    dispatch({ type: AppActionKind.CHANGE_FORM_VISIBILITY, payload: {} });
  return (
    <Layout
      toggleForm={toggleFormVisible}
      isFormVisible={state.isFormVisible}
      onChange={handleOnChange}
      onSubmit={handleOnSubmit}
      inputs={state.inputs}
    >
      <h1>Gallery</h1>
      {`You have ${state.items.length} images`}
      <List items={state.items} />
    </Layout>
  );
};

export default App;
