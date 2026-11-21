import { Check, PenLine, Trash } from "lucide-react";
import { TaskContext } from "./TaskContext";
import { useContext } from "react";

export default function CnfPopUp() {
  const { cnfPopUpType } = useContext(TaskContext);
  function popUpDetails() {
    if (cnfPopUpType === "add") {
      return {
        styles: {
          color: "rgb(78, 222, 163)",
          backgroundColor: "rgba(78,222,163,0.15)",
          border: "2px solid rgba(78,222,163,0.3)",
        },
        svg: <Check />,
        text: "Task Added to Workspace 😉",
      };
    } else if (cnfPopUpType === "edit") {
      return {
        styles: {
          color: "rgb(255,185,95)",
          backgroundColor: "rgba(255,185,95,0.15)",
          border: "2px solid rgba(255,185,95,0.3)",
        },
        svg: <PenLine />,
        text: "Task Edited Successfully 😉",
      };
    } else if (cnfPopUpType === "delete") {
      return {
        styles: {
          color: "rgb(255,180,171)",
          backgroundColor: "rgba(147,0,10,0.3)",
          border: "2px solid rgba(255,180,171,0.3)",
        },
        svg: <Trash />,
        text: "Task Delted from Workspace 😉",
      };
    } else return false;
  }
  return (
    <div className={`modal-bg popup ${popUpDetails() ? "" : "hide"}`}>
      <div className="modal-wrapper popup" style={popUpDetails().styles}>
        {popUpDetails().svg}
        <h3>{popUpDetails().text}</h3>
      </div>
    </div>
  );
}
