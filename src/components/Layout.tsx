import React from "react";
import Navbar from "./Navbar";
import { UploadForm } from "./Uploadform";
import { Input } from "../types";

export const Layout: React.FC<{
  children: any;
  toggleForm: () => void;
  isFormVisible: boolean;
  onChange: (event: any) => void;
  onSubmit: (event: any) => void;
  inputs: Input;
}> = ({ children, toggleForm, isFormVisible, onChange, onSubmit, inputs }) => {
  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <button className="btn btn-success float-end" onClick={toggleForm}>
          {isFormVisible ? "Close" : "+ Add"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm
          inputs={inputs}
          isVisible={isFormVisible}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        {children}
      </div>
    </>
  );
};
