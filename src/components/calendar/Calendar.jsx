import "./Calendar.css";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getDatesByUserId } from "../../services/calendarService.jsx";
import { useParams } from "react-router-dom";

export const MyCalendar = ({ currentUser }) => {
  const [events, setEvents] = useState([]);

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    if (currentUser?.id) {
      getDatesByUserId(currentUser.id).then((eventsArray) => {
        const eventArray = eventsArray.map((event) => {
          const urlString = `/history/${event.checklistId}`;
          return {
            title: <a href={urlString}>{event.description}</a>,
            start: event.startDate,
            end: event.endDate,
          };
        });

        setEvents(eventArray);
      });
    }
  }, [currentUser]);

  return (
    <section>
      <div className="header-container">
        <h2 className="h-2">Calendar</h2>
        <p className="text-block">
          Utilize a built-in calendar app to help organize and schedule garden
          maintenance here!
        </p>
      </div>
      <div className="calendar-container">
        <div className="calendar">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 1000, width: 1250, color: "black" }}
          />
        </div>
      </div>
    </section>
  );
};
