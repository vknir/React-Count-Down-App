import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0); // time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [editingField, setEditingField] = useState(null); // 'hours', 'minutes', 'seconds'
  const [editValue, setEditValue] = useState('');

  // useEffect to handle countdown
  useEffect(() => {
    let timer = null;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false); // stop if time hits 0
    }
    return () => clearInterval(timer); // cleanup on unmount
  }, [isRunning, time]);

  // Helper functions to convert seconds to HH:MM:SS
  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { hours, minutes, seconds };
  };

  // Start/Pause Timer
  const handleStartPause = () => {
    setIsRunning(prev => !prev);
  };

  // Reset Timer
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  // Handle clicks for editing time (hours, minutes, seconds)
  const handleTimeClick = (field) => {
    setEditingField(field);
    const { hours, minutes, seconds } = formatTime();
    setEditValue(field === 'hours' ? hours : field === 'minutes' ? minutes : seconds);
  };

  // Update time after editing
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      setEditValue(value);
    }
  };

  const handleInputBlur = () => {
    const { hours, minutes, seconds } = formatTime();
    let newTime = time;
    if (editingField === 'hours') {
      newTime = (Number(editValue) * 3600) + (minutes * 60) + seconds;
    } else if (editingField === 'minutes') {
      newTime = (hours * 3600) + (Number(editValue) * 60) + seconds;
    } else if (editingField === 'seconds') {
      newTime = (hours * 3600) + (minutes * 60) + Number(editValue);
    }
    setTime(newTime);
    setEditingField(null); // exit editing mode
  };

  const { hours, minutes, seconds } = formatTime();

  return (
    <div className="timer">
      <div className="time-display">
        {/* Display time with editable fields */}
        <span onClick={() => handleTimeClick('hours')}>
          {editingField === 'hours' ? (
            <input
              type="text"
              value={editValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus
            />
          ) : (
            String(hours).padStart(2, '0')
          )}
        </span>
        :
        <span onClick={() => handleTimeClick('minutes')}>
          {editingField === 'minutes' ? (
            <input
              type="text"
              value={editValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus
            />
          ) : (
            String(minutes).padStart(2, '0')
          )}
        </span>
        :
        <span onClick={() => handleTimeClick('seconds')}>
          {editingField === 'seconds' ? (
            <input
              type="text"
              value={editValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus
            />
          ) : (
            String(seconds).padStart(2, '0')
          )}
        </span>
      </div>

      {/* Control buttons */}
      <div className="controls">
        <button onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;
