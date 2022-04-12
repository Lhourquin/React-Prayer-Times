import React, { useState, useEffect, useRef } from "react";

export const Timer = ({
  arrayOfTimesSalatOfTheDay,
  now,
  dateFajr,
  dateShourouq,
  dateDhohr,
  dateAsr,
  dateMaghreb,
  dateIcha,
  dateIchaLastDay,
  dateMidnight,
}) => {
  const [fajr, setFajr] = useState(arrayOfTimesSalatOfTheDay[0].fajr);
  const [shourouq, setShourouq] = useState(
    arrayOfTimesSalatOfTheDay[1].shourouq
  );
  const [dhohr, setDhohr] = useState(arrayOfTimesSalatOfTheDay[2].dhohr);
  const [asr, setAsr] = useState(arrayOfTimesSalatOfTheDay[3].asr);
  const [maghreb, setMaghreb] = useState(arrayOfTimesSalatOfTheDay[4].maghreb);
  const [icha, setIcha] = useState(arrayOfTimesSalatOfTheDay[5].icha);
  const [midnight, setMidnight] = useState(
    arrayOfTimesSalatOfTheDay[6].midnight
  );

  useEffect(() => {
    let timer = setTimeout(() => {
      setFajr(arrayOfTimesSalatOfTheDay[0].fajr);
      setShourouq(arrayOfTimesSalatOfTheDay[1].shourouq);
      setDhohr(arrayOfTimesSalatOfTheDay[2].dhohr);
      setAsr(arrayOfTimesSalatOfTheDay[3].asr);
      setMaghreb(arrayOfTimesSalatOfTheDay[4].maghreb);
      setIcha(arrayOfTimesSalatOfTheDay[5].icha);
      setMidnight(arrayOfTimesSalatOfTheDay[6].midnight);
    });

    return () => clearTimeout(timer);
  }, arrayOfTimesSalatOfTheDay);

  const [timerHoursCurrentTime, setTimerHoursCurrentTime] = useState("");
  const [timerMinutesCurrentTime, setTimerMinutesCurrentTime] = useState("");
  const [timerSecondsCurrentTime, setTimerSecondsCurrentTime] = useState("");
  const [timerHoursNextTime, setTimerHoursNextTime] = useState("");
  const [timerMinutesNextTime, setTimerMinutesNextTime] = useState("");
  const [timerSecondsNextTime, setTimerSecondsNextTime] = useState("");

  let intervalCountDown = useRef();

  const startTimerNextTimeCountDown = (salat) => {
    let countDownTimes = salat.getTime();

    intervalCountDown.current = setInterval(() => {
      let now = new Date(Date.now()).getTime();
      let distance = countDownTimes - now;

      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(intervalCountDown.current);
      } else {
        setTimerHoursNextTime(hours < 10 ? ("0" + hours).slice(-2) : hours);
        setTimerMinutesNextTime(
          minutes < 10 ? ("0" + minutes).slice(-2) : minutes
        );
        setTimerSecondsNextTime(
          seconds < 10 ? ("0" + seconds).slice(-2) : seconds
        );
      }
    });
  };

  const startTimerCurrentCountDown = (salat) => {
    let countDownTimes = salat.getTime();

    intervalCountDown.current = setInterval(() => {
      let now = new Date(Date.now()).getTime();
      let distance = countDownTimes - now;

      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(intervalCountDown.current);
      } else {
        setTimerHoursCurrentTime(hours < 10 ? ("0" + hours).slice(-2) : hours);
        setTimerMinutesCurrentTime(
          minutes < 10 ? ("0" + minutes).slice(-2) : minutes
        );
        setTimerSecondsCurrentTime(
          seconds < 10 ? ("0" + seconds).slice(-2) : seconds
        );
      }
    });
  };

  const [currentNextTime, setCurrentNextTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const [displayTimerCurrentNextTime, setDisplayTimerCurrentNextTime] =
    useState(false);
  const [displayTimerCurrentTime, setDisplayTimerCurrentTime] = useState(false);

  useEffect(() => {
    if (now < dateFajr) {
      if (now > dateIchaLastDay && now < dateMidnight) {
        setCurrentTime("ICHA " + icha);
        startTimerNextTimeCountDown(dateMidnight);
        setDisplayTimerCurrentTime(false);
        setDisplayTimerCurrentNextTime(true);
        setCurrentNextTime("MI-NUIT " + midnight + " - ");
        return () => clearInterval(intervalCountDown.current);
      } else {
        setCurrentTime("FAJR " + fajr);
        startTimerCurrentCountDown(dateFajr);
        setDisplayTimerCurrentTime(true);
        setDisplayTimerCurrentNextTime(false);
        setCurrentNextTime("");
        return () => clearInterval(intervalCountDown.current);
      }
    } else if (now > dateFajr && now < dateShourouq) {
      setCurrentTime("FAJR " + fajr);
      setDisplayTimerCurrentTime(false);
      startTimerNextTimeCountDown(dateShourouq);
      setCurrentNextTime("SHOUROUQ " + shourouq + " -");
      setDisplayTimerCurrentNextTime(true);
      return () => clearInterval(intervalCountDown.current);
    } else if (now > dateShourouq && now < dateDhohr) {
      startTimerCurrentCountDown(dateDhohr);
      setDisplayTimerCurrentTime(true);
      setDisplayTimerCurrentNextTime(false);
      setCurrentTime("DHOHR " + dhohr);
      setCurrentNextTime("");
      return () => clearInterval(intervalCountDown.current);
    } else if (now > dateDhohr && now < dateAsr) {
      setCurrentTime("DHOHR " + dhohr);
      startTimerNextTimeCountDown(dateAsr);
      setDisplayTimerCurrentTime(false);
      setDisplayTimerCurrentNextTime(true);
      setCurrentNextTime("ASR " + asr + " -");
      return () => clearInterval(intervalCountDown.current);
    } else if (now > dateAsr && now < dateMaghreb) {
      setCurrentTime("ASR " + asr);
      startTimerNextTimeCountDown(dateMaghreb);
      setDisplayTimerCurrentTime(false);
      setDisplayTimerCurrentNextTime(true);
      setCurrentNextTime("MAGHREB " + maghreb + " -");
      return () => clearInterval(intervalCountDown.current);
    } else if (now > dateMaghreb && now < dateIcha) {
      setCurrentTime("MAGHREB " + maghreb);
      startTimerNextTimeCountDown(dateIcha);
      setDisplayTimerCurrentTime(false);
      setDisplayTimerCurrentNextTime(true);
      setCurrentNextTime("ICHA " + icha + " -");
      return () => clearInterval(intervalCountDown.current);
    } else if (now > dateIcha && now < dateMidnight) {
      setCurrentTime("ICHA " + icha);
      startTimerNextTimeCountDown(dateMidnight);
      setDisplayTimerCurrentTime(false);
      setDisplayTimerCurrentNextTime(true);
      setCurrentNextTime("MI-NUIT " + midnight + " -");
      return () => clearInterval(intervalCountDown.current);
    }
  }, [now]);


  return (
    <>
      <li
        style={displayTimerCurrentTime === true ? { color: "white" } : {}}
        className="Pannel__ul--hour-date-countdown__li--countdown-current-times"
      >
        <strong>
          {currentTime}{" "}
          {displayTimerCurrentTime === true ? (
            <span
              className={
                timerHoursCurrentTime == 0 && timerMinutesCurrentTime < 30
                  ? "countDowntThirtyMinutesCurentTime"
                  : ""
              }
            >
              {" "}
              -
              {timerHoursCurrentTime +
                ":" +
                timerMinutesCurrentTime +
                ":" +
                timerSecondsCurrentTime}
            </span>
          ) : (
            ""
          )}
        </strong>
      </li>
      <li
        className={
          timerHoursNextTime == 0 && timerMinutesNextTime < 30
            ? "countDowntThirtyMinutesNextTime"
            : "Pannel__ul--hour-date-countdown__li--countdown-next-times "
        }
      >
        <strong>
          {currentNextTime}{""}
          {displayTimerCurrentNextTime === true
            ? timerHoursNextTime +
              ":" +
              timerMinutesNextTime +
              ":" +
              timerSecondsNextTime
            : ""}
        </strong>
      </li>
    </>
  );
};
