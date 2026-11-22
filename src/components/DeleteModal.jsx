import { useContext } from "react";
import { TaskContext } from "./TaskContext";
import { FaRegTrashCan } from "react-icons/fa6";

export default function DeleteModal() {
  const {
    data,
    setNewData,
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    setCnfPopUpType,
  } = useContext(TaskContext);
  return (
    <div
      className={`modal-bg ${isOpenDeleteModal === false ? "closed" : ""} delete`}
    >
      <div className="modal-wrapper delete">
        <div className="delete-logo">
          <FaRegTrashCan />
        </div>
        <h3>
          Delete {isOpenDeleteModal === "all" ? "all tasks" : "this task"} ?
        </h3>
        <p>
          This item will be permanently removed from your workspace. This action
          cannot be undone.
        </p>
        <div className="btns row">
          <div className="col-5">
            <button
              className="cancel delete-modal-btn"
              onClick={() => setIsOpenDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
          <div className="col-7">
            <button
              className="delete delete-modal-btn"
              onClick={() => {
                if (isOpenDeleteModal === "all") {
                  setNewData([]);
                  setCnfPopUpType("delete-all");
                } else {
                  setNewData(data.filter((e) => e.id !== isOpenDeleteModal));
                  setCnfPopUpType("delete");
                }
                setIsOpenDeleteModal(false);
                setTimeout(() => setCnfPopUpType(false), 3200);
              }}
            >
              <FaRegTrashCan />
              <span>
                Delete {isOpenDeleteModal === "all" ? "all tasks" : "task"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
