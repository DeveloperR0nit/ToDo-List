import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SideBarBtns from "./SideBarBtns";
import {
  Inbox,
  Hourglass,
  CircleCheck,
  TriangleExclamationPoint,
  CalendarDays,
  CalendarClock,
} from "lucide-react";
import { TaskContext } from "./TaskContext";
import { useContext } from "react";

export default function StatusFilterSm() {
  const { data, statsObj } = useContext(TaskContext);
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={20}
      speed={500}
      freeMode={true}
      breakpoints={{
        0: {
          spaceBetween: 10,
        },
        576: {
          spaceBetween: 20,
        },
      }}
    >
      <SwiperSlide>
        <SideBarBtns
          icon={<Inbox />}
          color="white"
          colorLight="black"
          count={data.length}
          taskStatus="all"
        >
          All Tasks
        </SideBarBtns>
      </SwiperSlide>
      <SwiperSlide>
        <SideBarBtns
          icon={<Hourglass />}
          color="#FFB95F"
          colorLight="#D97706"
          count={statsObj.pendingTasksList.length}
          taskStatus="pending"
        >
          Pending
        </SideBarBtns>
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <SideBarBtns
          icon={<CircleCheck />}
          color="#4EDEA3"
          colorLight="#006C49"
          count={statsObj.completedTasksList.length}
          taskStatus="completed"
        >
          Completed
        </SideBarBtns>
      </SwiperSlide>
      <SwiperSlide>
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
      </SwiperSlide>
      <SwiperSlide>
        <SideBarBtns
          icon={<CalendarClock />}
          color="#C0C1FF"
          colorLight="#3525CD"
          count={statsObj.dueTodayTasksList.length}
          taskStatus="dueToday"
        >
          Due Today
        </SideBarBtns>
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <SideBarBtns
          icon={<CalendarDays />}
          color="#908FA0"
          colorLight="#475569"
          count={statsObj.upcomingTasksList.length}
          taskStatus="upcoming"
        >
          Upcoming
        </SideBarBtns>
      </SwiperSlide>
    </Swiper>
  );
}
