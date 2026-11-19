import { useContext } from "react";
import StatusCard from "./StatusCard";
import { TaskContext } from "./TaskContext";
import {
  Hourglass,
  FileText,
  ChartNoAxesCombined,
  FileClock,
  BadgeCheck,
  CircleCheckBig,
} from "lucide-react";

export default function StatusCards() {
  const { statsObj, data } = useContext(TaskContext);
  function calcCompletedCount() {
    if (data.length === 0) return 0;
    else
      return Math.round(
        (statsObj.completedTasksList.length * 100) / data.length,
      );
  }
  return (
    <div className="row status-cards">
      <StatusCard
        heading="TOTAL TASKS"
        headingSm="TOTAL"
        svg={<FileText />}
        countDesc="items created"
        smallSvg={<ChartNoAxesCombined />}
        bottomLeftText="Active Board"
        bottomLeftTextSm="Active Board"
        bottomRightText="100% capacity"
        color="193, 192, 255"
        value={data.length}
      />
      <StatusCard
        heading="IN PROGRESS / PENDING"
        headingSm="PENDING"
        svg={<Hourglass />}
        countDesc="need attention"
        smallSvg={<FileClock />}
        bottomLeftText="To Be Done"
        bottomLeftTextSm={`${statsObj.overdueTasksList.length} overdue`}
        bottomRightText={`${statsObj.overdueTasksList.length} overdue · ${Math.round(((statsObj.pendingTasksList.length + statsObj.overdueTasksList.length) * 100) / data.length)}% remaining`}
        color="255, 185, 95"
        value={
          statsObj.pendingTasksList.length + statsObj.overdueTasksList.length
        }
        overdueCount={statsObj.overdueTasksList.length}
      />
      <StatusCard
        heading="COMPLETED"
        headingSm="DONE"
        svg={<BadgeCheck />}
        countDesc="resolved"
        smallSvg={<CircleCheckBig />}
        bottomLeftText={`${calcCompletedCount()}% completion rate`}
        bottomLeftTextSm={`${calcCompletedCount()}% done`}
        bottomRightText="Great work!"
        color="78, 288, 163"
        value={statsObj.completedTasksList.length}
      />
    </div>
  );
}
