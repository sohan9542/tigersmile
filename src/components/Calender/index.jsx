import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { MyContext } from "../../mangement/Mycontext";
import { useLocation, useRoutes } from "react-router-dom";
import { TextField } from "@mui/material";
const CalenderMain = () => {
  const { activity, setActivity } = useContext(MyContext);
  const query = useLocation();
  const queryParams = new URLSearchParams(query.search);
  const subject = queryParams.get("subject");

  const [allActivity, setAllActivity] = useState();
  useEffect(() => {
    if (subject) {
      const filterSubject = activity?.filter(
        (item) => item?.subject === subject
      );
      setAllActivity([...filterSubject]);
    } else {
      setAllActivity(activity);
    }
  }, [activity, subject]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEventClick = (clickInfo) => {
    const filterActivity = activity?.filter(
      (item) => item?.id === clickInfo?.event?.id
    );
    console.log("fsdaf", filterActivity[0]);
    setSelectedEvent(filterActivity[0]);
    setIsEditing(true); // Show the modal or form
  };

  const handleSave = () => {
    const updatedArray = activity.map((item) =>
      item.id === selectedEvent.id ? selectedEvent : item
    );
    setActivity([...updatedArray]);
    setIsEditing(false); // Close the modal or form
  };

  const handleInputChange = (field, value) => {
    if (!selectedEvent) return;

    // Update the field of selectedEvent directly
    setSelectedEvent((prevSelectedEvent) => ({
      ...prevSelectedEvent,
      [field]: field !== "title" ? new Date(value) : value,
    }));
  };

  const formatDateToLocal = (date) => {
    if (!date) return ""; // Handle null or undefined dates
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(localDate.getDate()).padStart(2, "0");
    const hours = String(localDate.getHours()).padStart(2, "0");
    const minutes = String(localDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  return (
    <div className=" relative w-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        allDayContent={false}
        allDaySlot={false}
        events={allActivity}
        height={"auto"}
        headerToolbar={{
          left: "prev,next today", // Navigation buttons
          center: "title", // Title at the center
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek", // View buttons: Month, Week, Day, List
        }}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />

      {isEditing && selectedEvent && (
        <div className=" fixed top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-red-600 bg-opacity-80">
          <div className=" bg-white gap-2 flex flex-col p-5 rounded-xl ">
            <h2>Edit Event</h2>
            <label className="flex font-semibold items-center gap-4">
              Title:
              <input
                value={selectedEvent?.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
            </label>
            <label className="flex font-semibold items-center gap-3">
              Start:
              <TextField
                value={
                  selectedEvent?.start
                    ? formatDateToLocal(selectedEvent.start)
                    : ""
                }
                onChange={(e) => handleInputChange("start", e.target.value)}
                id="outlined-basic"
                variant="outlined"
                type="datetime-local"
              />
            </label>
            <label className="flex font-semibold items-center gap-4">
              End:
              <input
                type="datetime-local"
                className=" border p-2 rounded-md font-normal w-[250px]"
                value={
                  selectedEvent?.end ? formatDateToLocal(selectedEvent.end) : ""
                }
                onChange={(e) => handleInputChange("end", e.target.value)}
              />
            </label>
            <div className="flex items-center mt-5 justify-between">
              <button
                className="px-3 py-2 font-semibold text-sm bg-[#D2D9DE] rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-3 py-2 font-semibold text-sm bg-[#D2D9DE] rounded-md"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b className=" cursor-pointer">{eventInfo.timeText}</b>
      <i className=" cursor-pointer">{eventInfo.event.title}</i>
    </>
  );
}

export default CalenderMain;
