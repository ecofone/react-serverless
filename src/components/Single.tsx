import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "./Card";
import { useContext } from "react";
import { AppContext } from "../context/FirestoreContext";
import { AppContextType } from "../types";

export const Single = () => {
  const navigate = useNavigate();
  const { state } = useContext(AppContext) as AppContextType;
  const { state: routerState } = useLocation();

  const item = state.items.find((item) => item.id === routerState.id);

  return (
    <>
      <button className="btn" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="d-flex justify-content-center mb-5">
        {item && <Card item={item} />}
      </div>
    </>
  );
};
