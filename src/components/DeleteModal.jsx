import { useContext } from "react";
import { TaskContext } from "./TaskContext";
import { FaRegTrashCan } from "react-icons/fa6";

export default function DeleteModal() {
  const { data, setNewData, isOpenDeleteModal, setIsOpenDeleteModal } =
    useContext(TaskContext);
  return (
    <div className={`modal-bg ${!isOpenDeleteModal ? "closed" : ""} delete`}>
      <div className="modal-wrapper delete">
        <div className="delete-logo">
          <FaRegTrashCan />
        </div>
        <h3>Delete this task?</h3>
        <p>
          This item will be permanently removed from your workspace. This action
          cannot be undone.
        </p>
        <div className="btns">
          <button
            className="cancel delete-modal-btn"
            onClick={() => setIsOpenDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="delete delete-modal-btn"
            onClick={() => {
              setNewData(data.filter((e) => e.id !== isOpenDeleteModal));
              setIsOpenDeleteModal(false)
            }}
          >
            <FaRegTrashCan />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
