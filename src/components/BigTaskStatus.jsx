import {
  CalendarCheck,
  CalendarArrowRight,
  TriangleExclamationPoint,
  Clock,
  CalendarDays,
} from "lucide-react";
export default function BigTaskStatus({ status, date, theme }) {
  let color, svg, background, text;
  if (status === "completed") {
    color = theme === "dark" ? "144, 143, 160" : "0 ,108, 73";
    svg = <CalendarCheck />;
    text = `Completed (${date})`;
  } else if (status === "due-tomorrow") {
    color = theme === "dark" ? "255, 185, 95" : "217, 119, 6";
    svg = <CalendarArrowRight />;
    text = `Due Tomorrow`;
  } else if (status === "overdue") {
    color = theme === "dark" ? "255, 180, 171" : "186, 26, 26";
    svg = <TriangleExclamationPoint />;
    background = theme === "dark" ? "#2e0d1e" : "#FEF2F2";
    text = `Overdue (${date})`;
  } else if (status === "due-today") {
    color = theme === "dark" ? "193, 192, 255" : "79, 70, 229";
    svg = <Clock />;
    text = `Due Today`;
  } else if (status === "due") {
    color = "144, 143, 160";
    svg = <CalendarDays />;
    text = `Due ${date}`;
  }
  return (
    <span
      className="task-status big-task-status"
      style={{
        backgroundColor: background ? background : `rgba(${color},0.15)`,
        border: `2px solid rgba(${color},0.25)`,
        color: `rgb(${color})`,
      }}
    >
      {svg}
      {text}
    </span>
  );
}
