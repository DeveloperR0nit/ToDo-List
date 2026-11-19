import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export default function SideBarBtns({
  children,
  icon,
  color,
  danger,
  count,
  taskStatus,
}) {
  const { sideBarActive, setSideBarActive } = useContext(TaskContext);
  return (
    <button
      className={`aside-btn ${danger ? "danger" : ""} ${sideBarActive === taskStatus ? "active" : ""}`}
      style={{ color }}
      onClick={() => setSideBarActive(taskStatus)}
    >
      {icon}
      <span>{children}</span>
      <div className="count-box" style={{ color }}>
        {count}
      </div>
    </button>
  );
}
