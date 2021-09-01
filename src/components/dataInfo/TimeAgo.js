import React, { useEffect, useState } from "react";

export const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState(0);

  const calcTimePeriot = () => {
    if (timestamp) {
      const timePeriod = (Date.now() - Number(timestamp) * 1000) / 1000;

      setTimeAgo(`${timePeriod} [s] ago`);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => calcTimePeriot(), 500);
    return () => clearInterval(timerId);
  });

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
