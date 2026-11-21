import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export default function SideBarBtns({
  children,
  icon,
  color,
  danger,
  count,
  taskStatus,
  colorLight,
}) {
  const { sideBarActive, setSideBarActive, theme } = useContext(TaskContext);
  return (
    <button
      className={`aside-btn ${danger ? "danger" : ""} ${sideBarActive === taskStatus ? "active" : ""} ${theme === "light" ? "light" : ""}`}
      style={theme === "dark" ? { color } : { color: colorLight }}
      onClick={() => setSideBarActive(taskStatus)}
    >
      {icon}
      <span>{children}</span>
      <div
        className="count-box"
        style={theme === "dark" ? { color } : { color: colorLight }}
      >
        {count}
      </div>
    </button>
  );
}
