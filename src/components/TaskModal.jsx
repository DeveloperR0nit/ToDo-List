import { useState, useContext } from "react";
import { Check, Plus } from "lucide-react";
import { TaskContext } from "./TaskContext";

export default function TaskModal({ isOpen, closeModal }) {
  const { data, setNewData, updateTask, setUpdateTask } =
    useContext(TaskContext);
  const [inputValues, setInputValues] = useState(
    () =>
      data.find((task) => task.id === updateTask) ?? {
        title: "",
        description: "",
        date: "",
      },
  );
  function addDays(days) {
    const newDate = inputValues.date
      ? new Date(inputValues.date + "T00:00:00")
      : new Date();

    newDate.setDate(newDate.getDate() + days);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");

    setInputValues((prev) => ({ ...prev, date: `${year}-${month}-${day}` }));
  }

  function setToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setInputValues((prev) => ({ ...prev, date: `${year}-${month}-${day}` }));
  }

  function updateData(formData) {
    const formDataObj = Object.fromEntries(formData.entries());
    if (updateTask !== false) {
      const newData = data.map((task) =>
        task.id === updateTask
          ? { ...formDataObj, id: task.id, isCompleted: task.isCompleted }
          : task,
      );
      setNewData(newData);
      setUpdateTask(false);
    } else {
      const newData = [
        ...data,
        { ...formDataObj, id: crypto.randomUUID(), isCompleted: false },
      ];
      setNewData(newData);
    }
    closeModal();
    setInputValues({
      title: "",
      description: "",
      date: "",
    });
  }

  function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  return (
    <div className={`modal-bg ${!isOpen ? "closed" : ""}`}>
      <div className="modal-wrapper">
        <div className="heading">
          <div className="left">
            <div className="plus-icon">
              <Plus />
            </div>
            <div className="heading-content">
              <h2> Create New Task</h2>
              <p className="desc">
                Add task details, schedule a due date, and assign to your
                workspace.
              </p>
            </div>
          </div>
          <div className="right">
            <button
              className="close-btn"
              onClick={() => {
                setUpdateTask(false);
                closeModal();
              }}
            >
              x
            </button>
          </div>
        </div>
        <form action={updateData} className="modal-form">
          <label htmlFor="title">
            TASK TITLE <span> *</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title goes here"
            value={inputValues.title}
            onChange={(e) =>
              setInputValues((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
          <label htmlFor="description">DESCRIPTION / NOTES</label>
          <textarea
            name="description"
            id="description"
            placeholder="Provide additional context, checklist requirements, or acceptance criteria..."
            value={inputValues.description}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          ></textarea>
          <label htmlFor="date">DUE DATE & SCHEDULE</label>
          <div className="date-wrapper row">
            <div className="col-7">
              <input
                type="date"
                name="date"
                id="date"
                onChange={(e) =>
                  setInputValues((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                required
                min={getToday()}
                value={inputValues.date}
              />
            </div>
            <div className="col-5">
              <div className="date-btns row">
                <div className="col-4">
                  <button className="date-btn" onClick={setToday} type="button">
                    Today
                  </button>
                </div>
                <div className="col-4">
                  <button
                    className="date-btn"
                    type="button"
                    onClick={() => addDays(1)}
                  >
                    Tmry
                  </button>
                </div>
                <div className="col-4">
                  <button
                    className="date-btn"
                    type="button"
                    onClick={() => addDays(7)}
                  >
                    +1Wk
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-row">
            <button
              className="clear-btn"
              type="reset"
              onClick={() =>
                setInputValues({ title: "", description: "", date: "" })
              }
            >
              Clear
            </button>
            <div className="right-btns">
              <button
                className="task-btns draft-btn"
                onClick={() => {
                  setUpdateTask(false);
                  closeModal();
                }}
                type="button"
              >
                Save Draft
              </button>
              <button className="task-btns save-btn" type="submit">
                <Check />
                Create Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
