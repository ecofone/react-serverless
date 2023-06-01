import { useContext } from "react";
import { AppContextType } from "../types";
import { AppContext } from "./Context";

export const Preview: React.FC = () => {
  const { state } = useContext(AppContext) as AppContextType;

  return (
    <>
      {state.inputs.path && (
        <div
          className="rounded p-1 m-5"
          style={{
            width: "30%",
            height: "300px",
            backgroundImage: `url(${state.inputs.path}`,
            backgroundSize: "cover",
          }}
        ></div>
      )}
    </>
  );
};
