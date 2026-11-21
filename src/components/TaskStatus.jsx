import { GoDotFill } from "react-icons/go";
import { CheckCheck, TriangleExclamationPoint } from "lucide-react";
export default function TaskStatus({ status, theme }) {
  let color, svg, background;
  if (status === "completed") {
    color = theme === "dark" ? "59, 171, 132" : "0 ,108, 73";
    svg = <CheckCheck />;
  } else if (status === "pending") {
    color = theme === "dark" ? "255, 185, 95" : "217, 119, 6";
    svg = <GoDotFill />;
  } else if (status === "overdue") {
    color = theme === "dark" ? "255, 180, 171" : "186, 26, 26";
    svg = <TriangleExclamationPoint />;
    background =  theme === "dark" ? "#2e0d1e" : "#FEF2F2";
  }
  return (
    <span
      className="task-status task-status-sm"
      style={{
        backgroundColor: background ? background : `rgba(${color},0.15)`,
        border: `2px solid rgba(${color},0.25)`,
        color: `rgb(${color})`,
      }}
    >
      {svg}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
