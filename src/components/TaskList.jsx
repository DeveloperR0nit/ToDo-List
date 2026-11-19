import { useContext } from "react";
import TaskStatus from "./TaskStatus";
import BigTaskStatus from "./BigTaskStatus";
import { GoDotFill } from "react-icons/go";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TaskContext } from "./TaskContext";

export default function Tasklist() {
  const {
    data,
    setNewData,
    setUpdateTask,
    setIsOpenModal,
    sideBarActive,
    statsObj,
    searchFilter,
  } = useContext(TaskContext);
  function handleDelete(id) {
    const filteredTasks = data.filter((e) => e.id !== id);
    setNewData(filteredTasks);
  }
  function handleColmpletedCheck(e, id) {
    const updatedData = data.map((task) =>
      task.id === id ? { ...task, isCompleted: e.target.checked } : task,
    );
    setNewData(updatedData);
  }
  function getDueStatusSmall(dueDate, isCompleted) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate + "T00:00:00");

    const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));

    if (isCompleted) return "completed";
    else if (diff < 0) return "overdue";
    else return "pending";
  }
  function getDueStatusBig(dueDate, isCompleted) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate + "T00:00:00");

    const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));

    if (isCompleted) return "completed";
    if (diff < 0) return "overdue";
    if (diff === 0) return "due-today";
    if (diff === 1) return "due-tomorrow";

    return "due";
  }
  function formatDate(date) {
    if (!date) return "";

    return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
  const filteredStatsData = data.filter((task) =>
    statsObj[sideBarActive + "TasksList"].includes(task.id),
  );
  const filteredSearchData =
    filteredStatsData !== ""
      ? filteredStatsData.filter(
          (task) =>
            task.title.includes(searchFilter) ||
            task.description.includes(searchFilter) ||
            task.date.includes(searchFilter),
        )
      : filteredStatsData;
  const AllTasks =
    filteredSearchData.length !== 0 ? (
      filteredSearchData.toReversed().map((task) => (
        <div
          className={`task-box ${task.isCompleted ? "completed" : ""}`}
          key={task.id}
        >
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={task.isCompleted}
            onChange={(e) => handleColmpletedCheck(e, task.id)}
          />
          <div className="task-content">
            <h3>
              {task.title}
              <TaskStatus
                status={getDueStatusSmall(task.date, task.isCompleted)}
              />
            </h3>
            <p className="desc">{task.description}</p>
            <div className="stat">
              <BigTaskStatus
                status={getDueStatusBig(task.date, task.isCompleted)}
                date={formatDate(task.date)}
              />
            </div>
          </div>
          <div className="buttons-wrapper">
            <button
              className="edit"
              onClick={() => {
                (setIsOpenModal(true), setUpdateTask(task.id));
              }}
            >
              <MdOutlineEdit />
            </button>
            <button className="delete" onClick={() => handleDelete(task.id)}>
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      ))
    ) : searchFilter ? (
      <h2 className="error-msg">No Tasks found! 😊</h2>
    ) : (
      <h2 className="error-msg">No Tasks to do. Take a Chill-Pill 😎 or add Tasks</h2>
    );
  return (
    <>
      <div className="tasks-heading">
        <span>
          Showing {filteredSearchData.length} of {data.length} tasks
        </span>
        <span className="right">
          {" "}
          <GoDotFill /> Real-time sync
        </span>
      </div>
      {AllTasks}
    </>
  );
}
