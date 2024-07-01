import "./Calendar.css";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllDates } from "../../services/calendarService.jsx";

export const MyCalendar = ({ currentUser }) => {
  const [events, setEvents] = useState([]);

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    getAllDates().then((meetupsArray) => {
      const eventArray = meetupsArray.map((meetup) => {
        return {
          title: meetup.description,
          start: meetup.startDate,
          end: meetup.endDate,
        };
      });

      setEvents(eventArray);
    });
  }, []);

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
            style={{ height: 1000, width: 1250 }}
          />
        </div>
      </div>
    </section>
  );
};
