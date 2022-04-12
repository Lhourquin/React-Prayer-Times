import React, { useEffect, useState } from "react";
import moment from "moment";

export const CalculMidnightCalendar = ({
  fajrTimeCalendar,
  maghrebTimeCalendar,
}) => {
  const [midnightTime, setMidnightTime] = useState("");

  const [fajrTime, setFajrTime] = useState("");
  const [maghrebTime, setMaghrebTime] = useState("");
  useEffect(() => {
    setFajrTime(
      fajrTimeCalendar.split(":").map((x) => {
        let strToNumber = Number(x);
        return strToNumber;
      })
    );
    setMaghrebTime(
      maghrebTimeCalendar.split(":").map((x) => {
        let strToNumber = Number(x);
        return strToNumber;
      })
    );
  }, [fajrTimeCalendar, maghrebTimeCalendar]);

  useEffect(() => {
    setMidnightTime(() => {
      let fajr = moment(fajrTime, "HH:mm").add(1, "days");
      let maghreb = moment(maghrebTime, "HH:mm");

      let milliseconds = moment(fajr, "DD/MM/YYYY HH:mm:ss").diff(
        moment(maghreb, "DD/MM/YYYY HH:mm:ss")
      );
      let duration = moment.duration(milliseconds / 2);

      let durationInHours = Math.floor(duration.asHours());
      let durationInMinutes = Math.floor(duration.minutes());
      let midnight = moment(maghreb)
        .add(durationInHours, "hours")
        .add(durationInMinutes, "minutes");
      let toStringMidnightMomentObj = moment(midnight).format();
      let arrayOfString = toStringMidnightMomentObj.split("T");
      arrayOfString.shift();
      let newArrayOfString = arrayOfString.toString().split("+");
      newArrayOfString.pop();
      let result = newArrayOfString.toString().split(":").slice(0, 2);
      return result.join(":").toString();
    });
  }, [fajrTime, maghrebTime]);
  return <>{midnightTime}</>;
};
