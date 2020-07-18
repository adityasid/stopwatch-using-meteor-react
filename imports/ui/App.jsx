import React, { useState, useEffect } from 'react';
// import { useTracker } from 'meteor/react-meteor-data';

export const App = () => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 5 });
  const [interv, setInterv] = useState();
  const [timeUp, setTimeUp] = useState(0);
  const [flag, setFlag] = useState(0);
  const [status, setStatus] = useState(0);
  // Not started = 0
  // started = 1
  // stopped = 2
  const [view, setView] = useState(0);
  // input view = 0
  // timer view = 1
  // time up view = 2


  useEffect(() => {
    if (timeUp === 1) {
      clearInterval(interv);
      setTimeUp(0);


      setView(2)
      setStatus(0);
      setFlag(1);
      setTime({ h: 0, m: 5, s: 0 });
    }

  });

  var updatedH = time.h, updatedM = time.m, updatedS = time.s;

  const run = (isTimeUp) => {
    if (updatedM === 0 && updatedS === 0) {
      updatedH--;
      updatedM = 60;
    }
    if (updatedS === 0) {
      updatedM--;
      updatedS = 60;
    }

    updatedS--;

    if (updatedH === 0 && updatedM === 0 && updatedS === 0) {
      setTimeUp(1);
    } else {
      return setTime({ s: updatedS % 60, m: updatedM % 60, h: updatedH % 10 })
    }
  };

  const start = () => {
    if (time.h < 0 || time.h > 9) {
      alert("Out of range");
    } else if (time.m < 0 || time.m > 59) {
      alert("Out of range");
    } else if (time.s < 0 || time.s > 59) {
      alert("Out of range");
    } else if (flag === 1) {
      setView(0)
      setStatus(0);
      setFlag(0);
      setTime({ h: 0, m: 5, s: 0 })
    } else {
      setView(1);
      setStatus(1);
      setInterv(setInterval(run, 1000));
    }
  }

  const pause = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setView(0)
    setStatus(0);
    setTime({ h: 0, m: 5, s: 0 })
  };

  const resume = () => start();

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">

          {(view === 0) ?
            <div>
              <span> <input type="number" className="displayInput" value={(time.h >= 10) ? time.h : time.h} onChange={e => setTime({ h: e.target.value, m: time.m, s: time.s })} /> </span> &nbsp;:&nbsp;
             <span> <input type="number" className="displayInput" value={(time.m >= 10) ? time.m : time.m} onChange={e => setTime({ h: time.h, m: e.target.value, s: time.s })} /> </span>&nbsp;:&nbsp;
             <span> <input type="number" className="displayInput" value={(time.s >= 10) ? time.s : time.s} onChange={e => setTime({ h: time.h, m: time.m, s: e.target.value })} /> </span>
            </div> : ""
          }

          {(view === 1) ?
            <div>
              <input type="number" className="displayInput1" value={(time.h >= 10) ? time.h : "0" + time.h} /> &nbsp;:&nbsp;
              <input type="number" className="displayInput1" value={(time.m >= 10) ? time.m : "0" + time.m} /> &nbsp;:&nbsp;
              <input type="number" className="displayInput1" value={(time.s >= 10) ? time.s : "0" + time.s} />
            </div> : ""
          }

          {(view === 2) ?
            <h1 className="TimeUP">Time Up!</h1> : ""
          }


          <br />

          {(status === 0) ?
            <button className="stopwatch-btn stopwatch-btn-gre"
              onClick={start}>Start</button> : ""
          }

          {(status === 1) ?
            <div>
              <button className="stopwatch-btn stopwatch-btn-red"
                onClick={pause}>Pause</button>
              <button className="stopwatch-btn stopwatch-btn-yel"
                onClick={reset}>Reset</button>
            </div> : ""
          }

          {(status === 2) ?
            <div>
              <button className="stopwatch-btn stopwatch-btn-gre"
                onClick={resume}>Resume</button>
              <button className="stopwatch-btn stopwatch-btn-yel"
                onClick={reset}>Reset</button>
            </div> : ""
          }

        </div>
      </div>
    </div>
  );
};