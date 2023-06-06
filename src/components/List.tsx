import React, { useContext } from "react";
import { Card } from "./Card";
import { AppContextType } from "../types";
import { AppContext } from "../context/FirestoreContext";

export const List: React.FC = () => {
  const { state } = useContext(AppContext) as AppContextType;
  return (
    <div className="row">
      {state.items.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
};
