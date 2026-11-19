import {
  CalendarCheck,
  CalendarArrowRight,
  TriangleExclamationPoint,
  Clock,
  CalendarDays,
} from "lucide-react";
export default function BigTaskStatus({ status, date }) {
  let color, svg, background, text;
  if (status === "completed") {
    color = "144, 143, 160";
    svg = <CalendarCheck />;
    text = `Completed (${date})`
  } else if (status === "due-tomorrow") {
    color = "255, 185, 95";
    svg = <CalendarArrowRight />;
    text = `Due Tomorrow`
  } else if (status === "overdue") {
    color = "255, 180, 171";
    svg = <TriangleExclamationPoint />;
    background = "#2e0d1e";
    text = `Overdue (${date})`
  } else if (status === "due-today") {
    color = "193, 192, 255";
    svg = <Clock />;
    text = `Due Today`
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
