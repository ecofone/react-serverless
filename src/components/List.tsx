import React from "react";
import { Card } from "./Card";
import { Item } from "../types";

export const List: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <div className="row">
      {items.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
};
