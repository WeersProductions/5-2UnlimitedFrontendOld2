import { motion } from "framer-motion";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import FancyTime from "./fancyClock/FancyTime";
import Quote from "./Quote";

import io from "socket.io-client";

import "./styles.css";
import "./text.css";

const pageVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: [1, 0.9, 1],
    y: ["25%", "10%", "20%"],
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 15,
      times: [0, 0.3, 1]
    }
  }
};

// const RefreshBackend = () => {
// This starts the server
/** 
  fetch("https://zfb05.sse.codesandbox.io/", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json" // Accept the "application/json"
    }
  }).catch((e) => {
    /* ignore */
//});
// };

export default function App() {
  const [hour1, setHour1] = React.useState(0);
  const [hour2, setHour2] = React.useState(0);
  const [minute1, setMinute1] = React.useState(0);
  const [minute2, setMinute2] = React.useState(0);
  const socketRef = React.useRef(null);

  const IncreaseMinute = () => {
    setMinute1((minute1) => {
      let newMin1 = minute1 + 1;
      if (newMin1 > 9) {
        newMin1 = 0;
        setMinute2((minute2) => {
          let newMin2 = minute2 + 1;
          if (newMin2 > 5) {
            newMin2 = 0;
            setHour1((hour1) => {
              let newHour1 = hour1 + 1;
              if (newHour1 > 9) {
                newHour1 = 0;
                setHour2((hour2) => {
                  let newHour2 = hour2 + 1;
                  return newHour2;
                });
              }
              return newHour1;
            });
          }
          return newMin2;
        });
      }
      return newMin1;
    });
  };

  const ResetTime = () => {
    setHour2(0);
    setHour1(0);
    setMinute2(0);
    setMinute1(0);
  };

  useEffect(() => {
    const socket = io("https://delicate-firefly-5545.fly.dev/");
    socketRef.current = socket;
    const clockInterval = setInterval(() => {
      IncreaseMinute();
    }, 60000);
    socket.on("refresh", (data) => {
      console.log("refresh!");
      ResetTime();
    });
    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <div className="App">
      <div style={{ height: "90vh" }}>
        <motion.div
          animate={"visible"}
          // initial={"hidden"}
          variants={pageVariants}
        >
          <h1>5-2 Unlimited</h1>
          {/* <h2>[INSERT QUOTE HERE]</h2> */}
          <div style={{ transform: "scale(0.5)" }}>
            <Quote text="Koffie knop" />
          </div>

          <div>
            <FancyTime number={hour2} />
            <FancyTime number={hour1} />
            H
            <FancyTime number={minute2} />
            <FancyTime number={minute1} />M
          </div>
          <img
            alt="Bier tochtje met het huis"
            src="Week1.jpg"
            style={{ marginTop: "2rem", width: "80vw" }}
          ></img>
        </motion.div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
