import React from "react";
import { useEffect } from "react";

const Box2 = ({ num }) => {
  useEffect(() => {
    const timerId = window.setInterval(() => {
      console.log(`나는${num}이야`);
    }, 1000);

    return () => {
      console.log("window.setInterval() 을 제거하였음");
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <div
      className={String(num)}
      style={{
        width: "200px",
        lineHeight: "200px",
        textAlign: "center",
        border: "1px solid gray",
      }}
    >
      {num}
    </div>
  );
};

export default React.memo(Box2);
