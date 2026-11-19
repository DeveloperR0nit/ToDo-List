import { GoDotFill } from "react-icons/go";
import { CheckCheck, TriangleExclamationPoint } from "lucide-react";
export default function TaskStatus({ status }) {
  let color, svg, background;
  if (status === "completed") {
    color = "59, 171, 132";
    svg = <CheckCheck />;
  } else if (status === "pending") {
    color = "255, 185, 95";
    svg = <GoDotFill />;
  } else if (status === "overdue") {
    color = "255, 180, 171";
    svg = <TriangleExclamationPoint />;
    background = "#2e0d1e"
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
