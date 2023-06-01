import React from "react";
import { Item } from "../types";

export const Card: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div className="col mb-5">
      <div className="card" style={{ width: "18rem" }}>
        <img src={item.path} className="card-img-top" alt={item.title} />
      </div>
    </div>
  );
};
