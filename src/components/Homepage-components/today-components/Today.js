import React, { useState, useEffect } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import "./Today.css";
import { TodayTimesList } from "./today-time-list/TodayTimesList";
import { Pannel } from "./pannel-time-today/Pannel";

export const Today = ({
  city,
  country,
  getAngleOptionValue,
  method,
  selectedMethodStringValue,
  buttonBurgerIsClicked
}) => {
  const [today, setToday] = useState([]);
  const [inputCity, setInputCity] = useState("");
  const [lastCity, setLastCity] = useState("");
  const [now, setNow] = useState(new Date(Date.now()).getTime());
  useEffect(() => {
    let interval = setInterval(() => {
      setNow(new Date(Date.now()).getTime());
    });

    return () => clearInterval(interval);
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      setToday(JSON.parse(localStorage.getItem("TodayTimes") || "[]"));

      if (city !== "" && country !== "") {
        setInputCity(city);
      } else if (city == "") {
        if (localStorage.getItem("City")) {
          setLastCity(localStorage.getItem("City"));
        }
      }
    });

    return () => clearTimeout(timer);
  }, [now]);

  const [dateFajr, setDateFajr] = useState("");
  const [dateShourouq, setDateShourouq] = useState("");
  const [dateDhohr, setDateDhohr] = useState("");
  const [dateAsr, setDateAsr] = useState("");
  const [dateMaghreb, setDateMaghreb] = useState("");
  const [dateIcha, setDateIcha] = useState("");
  const [dateIchaLastDay, setDateIchaLastDay] = useState("");
  const [dateStartOfTheNextDay, setdateStartOfTheNextDay] = useState("");
  const [day, setDay] = useState("");
  const [fajrTime, setFajrTime] = useState("");
  const [maghrebTime, setMaghrebTime] = useState("");

  useEffect(() => {
    today.map((obj) => {
      setDay(Number(obj.data.date.gregorian.day));
      setDateFajr(
        new Date(
          `${obj.data.date.gregorian.month.en} ${obj.data.date.gregorian.day}, ${obj.data.date.gregorian.year} ${obj.data.timings.Fajr}:00`
        )

      );
      setDateShourouq(
        new Date(
          `${obj.data.date.gregorian.month.en} ${obj.data.date.gregorian.day}, ${obj.data.date.gregorian.year} ${obj.data.timings.Sunrise}:00` /**${obj.data.timings.Sunrise} */
        )
      );
      setDateDhohr(
        new Date(
          `${obj.data.date.gregorian.month.en} ${obj.data.date.gregorian.day}, ${obj.data.date.gregorian.year} ${obj.data.timings.Dhuhr}:00` /**${obj.data.timings.Dhuhr} */
        )
      );
      setDateAsr(
        new Date(
          `${obj.data.date.gregorian.month.en} ${obj.data.date.gregorian.day}, ${obj.data.date.gregorian.year} ${obj.data.timings.Asr}:00` /**${obj.data.timings.Asr} */
        )
      );
      setDateMaghreb(
        new Date(
          `${obj.data.date.gregorian.month.en} ${obj.data.date.gregorian.day}, ${obj.data.date.gregorian.year} ${obj.data.timings.Maghrib}:00` /**${obj.data.timings.Maghrib} */
        )
      );
      setDateIcha(
        new Date(
          `${obj.data.date.gregorian.month.en} ${obj.data.date.gregorian.day}, ${obj.data.date.gregorian.year} ${obj.data.timings.Isha}:00` /** ${obj.data.timings.Isha}  */
        )
      );

      setDateIchaLastDay(
        new Date(
          `${obj.data.date.gregorian.month.en} ${Number(obj.data.date.gregorian.day) - 1
          }, ${obj.data.date.gregorian.year} ${obj.data.timings.Isha
          }:00`
        )
      );

      setFajrTime(
        obj.data.timings.Fajr.split(":").map((x) => {
          let strToNumber = Number(x);
          return strToNumber;
        })
      );
      setMaghrebTime(
        obj.data.timings.Maghrib.split(":").map((x) => {
          let strToNumber = Number(x);
          return strToNumber;
        })
      );
    });
  }, [today]);

  useEffect(() => {
    today.map((obj) => {
      setdateStartOfTheNextDay(
        new Date(
          `${obj.data.date.gregorian.month.en} ${Number(day) + 1}, ${obj.data.date.gregorian.year
          } 00:00:00`
        )
      );
    });
  }, [day]);

  const [midnightTime, setMidnightTime] = useState("");

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


  const [dateMidnight, setDateMidnight] = useState("");


  useEffect(() => {
    let timer = setTimeout(() => {
      today.map((obj) => {
        setDateMidnight(() => {
          if (
            dateIcha > dateStartOfTheNextDay ||
            dateIcha == dateStartOfTheNextDay
          ) {

            return new Date(
              `${obj.data.date.gregorian.month.en} ${obj.data.date.gregorian.day}, ${obj.data.date.gregorian.year} ${midnightTime}:00`
            );
          } else if (
            dateIcha < dateStartOfTheNextDay &&
            midnightTime.substring(0, 1) == "0"
          ) {
            if (now > dateIchaLastDay && now < dateFajr) {
              return new Date(
                `${obj.data.date.gregorian.month.en} ${Number(obj.data.date.gregorian.day)
                }, ${obj.data.date.gregorian.year} ${midnightTime}:00`
              );
            } else {

              return new Date(
                `${obj.data.date.gregorian.month.en} ${Number(obj.data.date.gregorian.day) + 1
                }  , ${obj.data.date.gregorian.year} ${midnightTime}:00`
              );
            }
          } else if (
            now > dateIcha && dateIcha < dateStartOfTheNextDay &&
            midnightTime.substring(0, 1) !== "0"
          ) {

            return new Date(
              `${obj.data.date.gregorian.month.en} ${Number(
                obj.data.date.gregorian.day
              )}, ${obj.data.date.gregorian.year} ${midnightTime}:00`
            );
          }
        });


      });
    });

    return () => clearTimeout(timer);
  }, [midnightTime, dateStartOfTheNextDay]);



  const Location = useLocation();
  const [isCalendar, setIsCalendar] = useState(false);

  useEffect(() => {
    if (Location.pathname === "/calendar") {
      setIsCalendar(true);
    } else {
      setIsCalendar(false)
    }
  }, [Location])

  return (
    <>
      {
        today.length === 0 ?
          <div 
          className="instruction">Entrez votre ville ou cliquer sur le button <i className="fas fa-map-marker-alt localisation-marker" aria-hidden="true"></i>.</div>
          :
          <>
            <div
              style={
                isCalendar ? { display: "none" } : { opacity: "1" }
              }
              className="Today__div--container-list-pannel">
              <TodayTimesList
                buttonBurgerIsClicked={buttonBurgerIsClicked}
                today={today}
                now={now}
                dateFajr={dateFajr}
                dateShourouq={dateShourouq}
                dateDhohr={dateDhohr}
                dateAsr={dateAsr}
                dateMaghreb={dateMaghreb}
                dateIcha={dateIcha}
                dateIchaLastDay={dateIchaLastDay}
                dateMidnight={dateMidnight}
                midnightTime={midnightTime}
              />
              <Pannel
                today={today}
                searchField={city !== "" ? inputCity : lastCity}
                country={country}
                getAngleOptionValue={getAngleOptionValue}
                method={method}
                selectedMethodStringValue={selectedMethodStringValue}
                now={now}
                dateFajr={dateFajr}
                dateShourouq={dateShourouq}
                dateDhohr={dateDhohr}
                dateAsr={dateAsr}
                dateIcha={dateIcha}
                dateIchaLastDay={dateIchaLastDay}
                dateMaghreb={dateMaghreb}
                dateMidnight={dateMidnight}
                midnightTime={midnightTime}
              />
            </div>
          </>
      }

    </>
  );
};
