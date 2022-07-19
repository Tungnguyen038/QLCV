import React from "react";
import { v4 } from "uuid";
import AssignItems from "./AssignItems";

const YourWorkAssign = ({ dataAssign }) => {
  console.log("dataAssign", dataAssign);
  return (
    <div className="flex flex-col mb-6">
      <h2>{dataAssign.title}</h2>
      <div
        id="style-15"
        className="h-[200px] mt-1 border border-slate-400 rounded-lg overflow-y-auto"
      >
        {dataAssign.items.map((item) => (
          <AssignItems key={v4()} assignItem={item}></AssignItems>
        ))}
      </div>
    </div>
  );
};

export default YourWorkAssign;
