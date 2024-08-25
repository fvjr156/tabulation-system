import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import "../Main.css";

export const EventSelection = function ({ role, user, token }) {
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
      <h1>Event Selection</h1>
      <p>Select an event to attend to.</p>
      {events.length > 0 ? (
        <>
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
                <tr key={event.eventid}>
                  <td>{event.eventname}</td>
                  <td>{event.eventdescription}</td>
                  <td>{event.eventdate}</td>
                  <td>{event.eventvenue}</td>
                  <td>{event.eventstatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
            <p>You have no events to attend to. Stay tuned!</p>
        </>

      )}
    </div>
  );
};
