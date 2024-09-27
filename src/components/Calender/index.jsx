import React, { useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { MyContext } from "../../mangement/Mycontext";

const CalenderMain = () => {
  const {activity} = useContext(MyContext)
  const events = [
    { title: "Team Meeting", start: new Date(2024, 8, 24, 9, 0) }, // Sep 25, 9:00 AM
    { title: "Project Review", start: new Date(2024, 8, 25, 11, 0) }, // Sep 25, 11:00 AM
    { title: "Lunch Break", start: new Date(2024, 8, 25, 13, 0) }, // Sep 25, 1:00 PM
    { title: "Client Call", start: new Date(2024, 8, 26, 10, 0) }, // Sep 26, 10:00 AM
    { title: "Design Workshop", start: new Date(2024, 8, 26, 14, 30) }, // Sep 26, 2:30 PM
    { title: "Code Review", start: new Date(2024, 8, 27, 15, 0) }, // Sep 27, 3:00 PM
    { title: "Presentation", start: new Date(2024, 8, 28, 16, 0) }, // Sep 28, 4:00 PM
    { title: "Final Submission", start: new Date(2024, 9, 1, 12, 0) }, // Oct 1, 12:00 PM
    { title: "Team Dinner", start: new Date(2024, 9, 1, 19, 0) }, // Oct 1, 7:00 PM
  ];

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        allDayContent={false}
        allDaySlot={false}
        events={activity}
        height={"auto"}
        headerToolbar={{
          left: 'prev,next today', // Navigation buttons
          center: 'title', // Title at the center
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' // View buttons: Month, Week, Day, List
        }}
        eventContent={renderEventContent}
      />
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalenderMain;
