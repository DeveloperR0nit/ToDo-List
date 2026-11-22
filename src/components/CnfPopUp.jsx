import { Check, PenLine, Trash, Plus, Palette } from "lucide-react";
import { TaskContext } from "./TaskContext";
import { useContext } from "react";

export default function CnfPopUp() {
  const { cnfPopUpType, theme } = useContext(TaskContext);
  function popUpDetails() {
    if (cnfPopUpType === "completed-all") {
      return {
        styles: {
          color: theme === "dark" ? "#ffae00" : "#ffae00",
          backgroundColor:
            theme === "dark" ? "rgba(255,185,95,0.15)" : "#FFFBEB",
          border: "2px solid rgba(255,185,95,0.3)",
        },
        text: (
          <p>
            mission passed!
            <br />
            <span>respect+</span>
            <br />
            <span className="small-text">You've finished all tasks 🙌🙌🙌</span>
          </p>
        ),
      };
    } else if (cnfPopUpType === "completed") {
      return {
        styles: {
          color: theme === "dark" ? "rgb(78, 222, 163)" : "#006C49",
          backgroundColor:
            theme === "dark" ? "rgba(78,222,163,0.15)" : "#ecfdf5",
          border: "2px solid rgba(78,222,163,0.3)",
        },
        svg: <Check />,
        text: "Task Completed 🥳🥳🥳",
      };
    } else if (cnfPopUpType === "edit") {
      return {
        styles: {
          color: theme === "dark" ? "rgb(255,185,95)" : "#B45309",
          backgroundColor:
            theme === "dark" ? "rgba(255,185,95,0.15)" : "#fffbeb",
          border: "2px solid rgba(255,185,95,0.3)",
        },
        svg: <PenLine />,
        text: "Task Edited Successfully 😉",
      };
    } else if (cnfPopUpType === "delete") {
      return {
        styles: {
          color: theme === "dark" ? "rgb(255,180,171)" : "#BA1A1A",
          backgroundColor: theme === "dark" ? "rgba(147,0,10,0.3)" : "#FEF2F2",
          border: "2px solid rgba(255,180,171,0.3)",
        },
        svg: <Trash />,
        text: "Task Delted from Workspace 😉",
      };
    } else if (cnfPopUpType === "add") {
      return {
        styles: {
          color: theme === "dark" ? "#D3E4FE" : "#4F46E5",
          backgroundColor:
            theme === "dark" ? "rgba(192,193,255,0.15)" : "#FEF2F2",
          border: "2px solid rgba(192,193,255,0.3)",
        },
        svg: <Plus />,
        text: "Task Added to Workspace 😉",
      };
    } else if (cnfPopUpType === "switch-theme") {
      return {
        styles: {
          color: theme === "dark" ? "white" : "black",
          backgroundColor: theme === "dark" ? "rgba(0,0,0,0.7)" : "#FEF2F2",
          border: "2px solid grey",
        },
        svg: <Palette />,
        text: "Theme Switched !!!",
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
