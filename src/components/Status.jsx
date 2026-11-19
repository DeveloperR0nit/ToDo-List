// import React from "react";
import { GoDotFill } from "react-icons/go";

export default function Status({ children }) {
  return (
    <span className="status">
      <GoDotFill />
      {children}
    </span>
  );
}
