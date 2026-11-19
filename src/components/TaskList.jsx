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
  function displayData() {
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

    let notCompletedArray = filteredSearchData.filter(
      (task) => !task.isCompleted,
    );
    notCompletedArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    let completedArray = filteredSearchData.filter((task) => task.isCompleted);
    completedArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    const finalData = [...notCompletedArray, ...completedArray];
    return finalData;
  }
  const displayedTasks = displayData();
  const AllTasks =
    displayedTasks.length !== 0 ? (
      displayedTasks.map((task) => (
        <div
          className={`task-box ${task.isCompleted ? "completed" : ""} ${getDueStatusSmall(task.date, task.isCompleted) === "overdue" ? "overdue" : ""}`}
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
            <div className="top">
              <h3>{task.title}</h3>
              <div className="status-wrapper">
                <TaskStatus
                  status={getDueStatusSmall(task.date, task.isCompleted)}
                />
              </div>
            </div>
            <p className="desc">{task.description}</p>
            <div className="stat">
              <BigTaskStatus
                status={getDueStatusBig(task.date, task.isCompleted)}
                date={formatDate(task.date)}
              />
              {window.innerWidth <= 576 && (
                <div className="buttons-wrapper">
                  <button
                    className="edit"
                    onClick={() => {
                      (setIsOpenModal(true), setUpdateTask(task.id));
                    }}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    className="delete"
                    onClick={() =>
                      setNewData(data.filter((e) => e.id !== task.id))
                    }
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              )}
            </div>
          </div>
          {window.innerWidth > 576 && (
            <div className="buttons-wrapper">
              <button
                className="edit"
                onClick={() => {
                  (setIsOpenModal(true), setUpdateTask(task.id));
                }}
              >
                <MdOutlineEdit />
              </button>
              <button
                className="delete"
                onClick={() => setNewData(data.filter((e) => e.id !== task.id))}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          )}
        </div>
      ))
    ) : searchFilter ? (
      <h2 className="error-msg">No Tasks found! 😊</h2>
    ) : (
      <h2 className="error-msg">No Tasks. Take a Chill-Pill 😎</h2>
    );
  return (
    <>
      <div className="tasks-heading">
        <span>
          Showing {displayedTasks.length} of {data.length} tasks
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
