import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import "../Main.css";

export const EventManagement = function ({ role, user, token }) {
  const [events, setEvents] = useState(null);

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
      <p>Event Mgmt. Module for Managers</p>
      <h1>Event Management</h1>
      <table className="evmgmt-table">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Event Description</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event) => (
              <tr key={event.EventID}>
                <td>{event.EventID}</td>
                <td>{event.EventName}</td>
                <td>{event.EventDescription}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
