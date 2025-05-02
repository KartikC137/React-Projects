import React, { useState, useEffect, useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";

const App = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef(null);
  const beepRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      beepRef.current.play();
      setTimeout(() => {
        setIsBreak((prev) => !prev);
        setTimeLeft(
          (prevIsBreak) => (!isBreak ? breakLength : sessionLength) * 60,
        );
      }, 1000);
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    if (beepRef.current) {
      beepRef.current.pause();
      beepRef.current.currentTime = 0;
    }
  };

  const adjustSession = (amount) => {
    if (
      !isRunning &&
      sessionLength + amount > 0 &&
      sessionLength + amount <= 60
    ) {
      setSessionLength((prev) => prev + amount);
      if (!isBreak) setTimeLeft((sessionLength + amount) * 60);
    }
  };

  const adjustBreak = (amount) => {
    if (!isRunning && breakLength + amount > 0 && breakLength + amount <= 60) {
      setBreakLength((prev) => prev + amount);
      if (isBreak) setTimeLeft((breakLength + amount) * 60);
    }
  };

  return (
    <div>
      <audio
        id="beep"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        ref={beepRef}
      />
      <h1>25 + 5 Clock</h1>
      <div id="break-session-container">
        <div id="break-container" className="control-format">
          <h3 id="break-label" className="control-label">
            Break Length
          </h3>
          <div className="control-container">
            <button
              id="break-increment"
              className="incr-decr"
              onClick={() => adjustBreak(1)}
            >
              +
            </button>
            <span id="break-length">{breakLength}</span>
            <button
              id="break-decrement"
              className="incr-decr"
              onClick={() => adjustBreak(-1)}
            >
              -
            </button>
          </div>
        </div>

        <div id="session-container" className="control-format">
          <h3 id="session-label" className="control-label">
            Session Length
          </h3>
          <div className="control-container">
            <button
              id="session-increment"
              className="incr-decr"
              onClick={() => adjustSession(1)}
            >
              +
            </button>
            <span id="session-length">{sessionLength}</span>
            <button
              id="session-decrement"
              className="incr-decr"
              onClick={() => adjustSession(-1)}
            >
              -
            </button>
          </div>
        </div>
      </div>

      <div id="timer-container">
        <div
          id="timer-inner-container"
          style={{
            color: isBreak ? "#00843D" : "#E24B1D",
            backgroundColor: isBreak
              ? "rgba(0, 132, 61, 0.2)"
              : "rgba(226, 75, 29, 0.2)",
          }}
        >
          <h2 id="timer-label">{isBreak ? "Break" : "Session"}</h2>
          <span id="time-left">{formatTime(timeLeft)}</span>
        </div>

        <div id="media-controls-container">
          <button
            id="start_stop"
            onClick={handleStartStop}
            style={{
              backgroundColor: isRunning
                ? "rgba(226, 75, 29, 0.2)"
                : "rgba(0, 132, 61, 0.2)",
              color: isRunning ? "#E24B1D" : "#00843D",
              border: `2px solid ${isRunning ? "#E24B1D" : "#00843D"}`,
              borderRadius: "8px",
              fontSize: "2rem",
              padding: "5px 15px",
              marginTop: "15px",
            }}
          >
            {isRunning ? "stop" : "start"}
          </button>
          <button
            id="reset"
            onClick={handleReset}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FiRefreshCw size={28} color="#914a82" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
