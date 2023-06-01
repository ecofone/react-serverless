import React, { useContext } from "react";
import Navbar from "./Navbar";
import { UploadForm } from "./Uploadform";
import { AppActionKind, AppContextType } from "../types";
import { AppContext } from "./Context";

export const Layout: React.FC<{
  children: any;
}> = ({ children }) => {
  const { state, dispatch } = useContext(AppContext) as AppContextType;

  const toggleForm = () =>
    dispatch({ type: AppActionKind.CHANGE_FORM_VISIBILITY, payload: {} });

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <button className="btn btn-success float-end" onClick={toggleForm}>
          {state.isFormVisible ? "Close" : "+ Add"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm />
        {children}
      </div>
    </>
  );
};
