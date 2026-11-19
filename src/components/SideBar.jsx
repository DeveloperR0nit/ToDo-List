import { useContext } from "react";
import SideBarBtns from "./SideBarBtns";
import { TaskContext } from "./TaskContext";
import {
  Inbox,
  Hourglass,
  CircleCheck,
  TriangleExclamationPoint,
  CalendarDays,
  CalendarClock,
} from "lucide-react";

export default function SideBar() {
  const { statsObj, data } = useContext(TaskContext);
  return (
    <aside>
      <div className="aside-btns-1">
        <h3>VIEWS</h3>
        <SideBarBtns
          icon={<Inbox />}
          color="white"
          count={data.length}
          taskStatus="all"
        >
          All Tasks
        </SideBarBtns>
        <SideBarBtns
          icon={<Hourglass />}
          color="#FFB95F"
          count={statsObj.pendingTasksList.length}
          taskStatus="pending"
        >
          Pending
        </SideBarBtns>
        <SideBarBtns
          icon={<CircleCheck />}
          color="#4EDEA3"
          count={statsObj.completedTasksList.length}
          taskStatus="completed"
        >
          Completed
        </SideBarBtns>
      </div>
      <div className="aside-btns-2">
        <h3>TIMELINE</h3>
        <SideBarBtns
          icon={<TriangleExclamationPoint />}
          color="#FFB4AB"
          danger={true}
          count={statsObj.overdueTasksList.length}
          taskStatus="overdue"
        >
          Overdue
        </SideBarBtns>
        <SideBarBtns
          icon={<CalendarClock />}
          color="#C0C1FF"
          count={statsObj.dueTodayTasksList.length}
          taskStatus="dueToday"
        >
          Due Today
        </SideBarBtns>
        <SideBarBtns
          icon={<CalendarDays />}
          color="#908FA0"
          count={statsObj.upcomingTasksList.length}
          taskStatus="upcoming"
        >
          Upcoming
        </SideBarBtns>
      </div>
    </aside>
  );
}
