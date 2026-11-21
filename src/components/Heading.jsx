import { useContext } from "react";
import Status from "./Status";
import Time from "./TIme";
import Title1 from "./Tittle1";
import PrimaryBtn from "./PrimaryBtn";
import { TaskContext } from "./TaskContext";
import { Plus } from "lucide-react";

export default function Heading() {
  const { setIsOpenModal } = useContext(TaskContext);
  return (
    <div className="heading">
      <div className="left">
        <Status>Live Workspace</Status>
        <Time />
        <Title1>Tasks Workspace</Title1>
      </div>
      <div className="right">
        <PrimaryBtn openModal={() => setIsOpenModal(true)}>
          <Plus />
          New Task
        </PrimaryBtn>
      </div>
    </div>
  );
}
