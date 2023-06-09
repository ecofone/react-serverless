import { useContext, useMemo } from "react";
import { AppActionKind, AppContextType, AuthContextType } from "../types";
import { Preview } from "./Preview";
import { AppContext } from "../context/FirestoreContext";
import { FireStore } from "../handlers/firestore";
import { Storage } from "../handlers/storage";
import { useAuthContext } from "../context/AuthContext";

export const UploadForm: React.FC = () => {
  const { state, dispatch, fetchItems } = useContext(
    AppContext
  ) as AppContextType;
  const { currentUser } = useAuthContext() as AuthContextType;

  const handleOnChange = (event: any) => {
    if (event.target.name) {
      dispatch({
        type: AppActionKind.UPDATE_INPUT,
        payload: { eventTarget: event.target },
      });
    }
  };

  const username = currentUser?.displayName.split(" ").join("").toLowerCase();
  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    if (state.inputs.title && state.inputs.path) {
      Storage.uploadFile(state.inputs)
        .then(Storage.downloadFile)
        .then((url) => {
          FireStore.writeDoc(
            { ...state.inputs, path: url, user: username },
            "stocks"
          ).then(() => {
            fetchItems();
          });
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
