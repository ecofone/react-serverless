import { useContext, useMemo } from "react";
import { AppActionKind, AppContextType } from "../types";
import { Preview } from "./Preview";
import { AppContext } from "./Context";
import { FireStore } from "../handlers/firestore";
const { writeDoc } = FireStore;

export const UploadForm: React.FC = () => {
  const { state, dispatch } = useContext(AppContext) as AppContextType;

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
    writeDoc(state.inputs, "stocks").then(console.log);
    if (state.inputs.title && state.inputs.path) {
      dispatch({
        type: AppActionKind.ADD_ITEM,
        payload: {
          item: { title: state.inputs.title, path: state.inputs.path },
        },
      });
    }
  };

  const isDisabled = useMemo(
    () => Object.values(state.inputs).some((value) => !value),
    [state.inputs]
  );
  return (
    <>
      {state.isFormVisible && (
        <>
          <p className="display-6 text-center mb-3">Upload Stock Image</p>
          <Preview />
          <div className="mb-5 d-flex align-items-center justify-content-center">
            <form
              className="mb-2"
              style={{ textAlign: "left" }}
              onSubmit={handleOnSubmit}
            >
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="title"
                  aria-describedby="text"
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={handleOnChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success float-end"
                disabled={isDisabled}
              >
                Save changes
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};
