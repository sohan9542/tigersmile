import React, { useContext, useEffect , useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { MyContext } from "../../mangement/Mycontext";
import { useLocation, useRoutes } from "react-router-dom";

const CalenderMain = () => {
  const {activity} = useContext(MyContext)
  const query = useLocation();
  const queryParams = new URLSearchParams(query.search);
  const subject = queryParams.get("subject");

const [allActivity, setAllActivity] = useState()
useEffect(() => {
if(subject){
const filterSubject = activity?.filter((item)=> item?.subject === subject)
setAllActivity([...filterSubject])
}
else{
  setAllActivity(activity)
}
}, [activity, subject])



  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        allDayContent={false}
        allDaySlot={false}
        events={allActivity}
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
