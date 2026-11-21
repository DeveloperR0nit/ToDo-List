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
          colorLight="black"
          count={data.length}
          taskStatus="all"
        >
          All Tasks
        </SideBarBtns>
        <SideBarBtns
          icon={<Hourglass />}
          color="#FFB95F"
          colorLight="#D97706"
          count={statsObj.pendingTasksList.length}
          taskStatus="pending"
        >
          Pending
        </SideBarBtns>
        <SideBarBtns
          icon={<CircleCheck />}
          color="#4EDEA3"
          colorLight="#006C49"
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
          colorLight="#BA1A1A"
          danger={true}
          count={statsObj.overdueTasksList.length}
          taskStatus="overdue"
        >
          Overdue
        </SideBarBtns>
        <SideBarBtns
          icon={<CalendarClock />}
          color="#C0C1FF"
          colorLight="#3525CD"
          count={statsObj.dueTodayTasksList.length}
          taskStatus="dueToday"
        >
          Due Today
        </SideBarBtns>
        <SideBarBtns
          icon={<CalendarDays />}
          color="#908FA0"
          colorLight="#475569"
          count={statsObj.upcomingTasksList.length}
          taskStatus="upcoming"
        >
          Upcoming
        </SideBarBtns>
      </div>
    </aside>
  );
}
