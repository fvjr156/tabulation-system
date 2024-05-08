import React, { useState, useEffect } from "react";

const styles = {
  container: {
    textAlign: "center",
    margin: "20px",
  },
  countdown: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "blue",
  },
  button: {
    margin: "10px",
    padding: "8px 16px",
    borderRadius: "5px",
    backgroundColor: "lightblue",
    border: "none",
    cursor: "pointer",
  },
  header: {
    textAlign: "center",
    margin: "30px",
  },
};

function Countdown({ initialHours, initialMinutes, initialSeconds }) {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  // Function to start the countdown
  const startCountdown = () => {
    setIsRunning(true);
  };

  // Function to pause the countdown
  const pauseCountdown = () => {
    setIsRunning(false);
  };

  // Function to reset the countdown
  const resetCountdown = () => {
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        // Calculate remaining time
        let totalSeconds = hours * 3600 + minutes * 60 + seconds - 1;
        if (totalSeconds < 0) {
          clearInterval(timer);
          setIsRunning(false);
          window.alert('Countdown Finished');
        } else {
          const h = Math.floor(totalSeconds / 3600);
          const m = Math.floor((totalSeconds % 3600) / 60);
          const s = totalSeconds % 60;
          setHours(h);
          setMinutes(m);
          setSeconds(s);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, hours, minutes, seconds]);

  return (
    <div style={styles.container}>
      <h2 style={styles.countdown}>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h2>
      <div>
        <button style={styles.button} onClick={startCountdown}>
          Start
        </button>
        <button style={styles.button} onClick={pauseCountdown}>
          Pause
        </button>
        <button style={styles.button} onClick={resetCountdown}>
          Reset
        </button>
      </div>
    </div>
  );
}

function PomodoroTimer() {
  return (
    <div>
      <h1 style={styles.header}>Pomodoro Timer</h1>
      <Countdown initialHours={0} initialMinutes={25} initialSeconds={0} />
      <Countdown initialHours={0} initialMinutes={5} initialSeconds={0} />
      <Countdown initialHours={0} initialMinutes={20} initialSeconds={0} />
    </div>
  );
}

export default PomodoroTimer;
