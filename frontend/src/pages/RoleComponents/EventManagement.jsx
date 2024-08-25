import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import "../Main.css";
import { css_var } from "../HomePage";

export const EventManagement = function ({ role, user, token }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(
          "/events",
          {
            role_id: role,
            user_id: user,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Returned events:", response.data);
        setEvents(JSON.parse(response.data));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [role, user, token]);

  return (
    <div className="App">
      <h1>Event Management</h1>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '-45px'}}>
        <p>
          Click an Event to view or modify, including its contestants and
          criteria.
        </p>
        <button className="evmgmt-btn-create">Create Event</button>
      </div>
      <br/>
      <table className="evmgmt-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.eventiD}>
              <td>{event.eventname}</td>
              <td>{event.eventdescription}</td>
              <td>{event.eventdate}</td>
              <td>{event.eventvenue}</td>
              <td>{event.eventstatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
