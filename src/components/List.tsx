import React from "react";
import { Card } from "./Card";

export const List: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <div className="row">
      {items.map((photo, index) => (
        <Card key={index} src={photo} />
      ))}
    </div>
  );
};
