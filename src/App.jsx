import React from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Heading from "./components/Heading";
import StatusCards from "./components/StatusCards";
import SearchBar from "./components/SearchBar";
import Tasklist from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import StatusFilterSm from "./components/StatusFilterSm";
import DeleteModal from "./components/DeleteModal";
import { TaskContext } from "./components/TaskContext";

export default function App() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [updateTask, setUpdateTask] = React.useState(false);
  const [sideBarActive, setSideBarActive] = React.useState("all");
  const [searchFilter, setSearchFilter] = React.useState("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
  const [data, setData] = React.useState(
    () => JSON.parse(localStorage.getItem("tasks")) || [],
  );
  const statsObj = {
    allTasksList: data.map((task) => task.id),
    completedTasksList: data
      .filter((task) => task.isCompleted)
      .map((task) => task.id),
    pendingTasksList: data
      .filter(
        (task) =>
          getDueStatus(task) === "due-today" ||
          getDueStatus(task) === "upcoming",
      )
      .map((task) => task.id),
    overdueTasksList: data
      .filter((task) => getDueStatus(task) === "overdue")
      .map((task) => task.id),
    dueTodayTasksList: data
      .filter((task) => getDueStatus(task) === "due-today")
      .map((task) => task.id),
    upcomingTasksList: data
      .filter((task) => getDueStatus(task) === "upcoming")
      .map((task) => task.id),
  };
  function getDueStatus(task) {
    const dueDate = task.date;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate + "T00:00:00");

    const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));

    if (task.isCompleted) return "completed";
    if (diff < 0) return "overdue";
    else {
      if (diff === 0) return "due-today";
      else return "upcoming";
    }
  }
  function setNewData(newData) {
    localStorage.setItem("tasks", JSON.stringify(newData));
    setData(JSON.parse(localStorage.getItem("tasks")));
  }
  console.log(isOpenDeleteModal)
  return (
    <TaskContext.Provider
      value={{
        data,
        setNewData,
        setIsOpenModal,
        updateTask,
        setUpdateTask,
        sideBarActive,
        setSideBarActive,
        statsObj,
        searchFilter,
        setSearchFilter,
        isOpenDeleteModal,
        setIsOpenDeleteModal,
      }}
    >
      <TaskModal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        key={updateTask ?? "new"}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
      <Navbar />
      <div className="content">
        {window.innerWidth > 900 && <SideBar />}
        <main>
          <Heading />
          <StatusCards />
          {window.innerWidth <= 900 && <StatusFilterSm />}
          <SearchBar
            text="Search tasks by title, note, or due date... (Press / to focus)"
            textSm="Search tasks by title, note, or due date..."
          />
          <Tasklist />
        </main>
      </div>
    </TaskContext.Provider>
  );
}
