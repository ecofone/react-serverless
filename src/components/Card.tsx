import React, { useMemo } from "react";
import { Item } from "../types";

export const Card: React.FC<{ item: Item }> = ({ item }) => {
  const creationDate = useMemo(() => {
    const date = `${new Date(item.createdAt.seconds * 1000)}`.split(" ");
    return `${date[1]} ${date[2]} ${date[3]}`;
  }, []);
  return (
    <div className="col mb-5">
      <div className="card" style={{ width: "18rem" }}>
        <div
          style={{
            height: "220px",
            backgroundImage: `url(${item.path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <h5 className="text-center">{item.title}</h5>
        <div className="d-flex justify-content-between p-2">
          <p>{creationDate}</p>
          <i>@username</i>
        </div>
      </div>
    </div>
  );
};
