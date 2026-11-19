import React from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Heading from "./components/Heading";
import StatusCards from "./components/StatusCards";
import SearchBar from "./components/SearchBar";
import Tasklist from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import { TaskContext } from "./components/TaskContext";

export default function App() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [updateTask, setUpdateTask] = React.useState(false);
  const [sideBarActive, setSideBarActive] = React.useState("all");
  const [searchFilter, setSearchFilter] = React.useState("");
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
      }}
    >
      <TaskModal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        key={updateTask ?? "new"}
      />
      <Navbar />
      <div className="content">
        <SideBar />
        <main>
          <Heading />
          <StatusCards />
          <SearchBar>
            Search tasks by title, note, or due date... (Press / to focus)
          </SearchBar>
          <Tasklist />
        </main>
      </div>
    </TaskContext.Provider>
  );
}
