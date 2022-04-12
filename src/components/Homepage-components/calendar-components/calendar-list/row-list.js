import React, { useState } from "react";
import "./row-list.css";
import { CalculMidnightCalendar } from "../calcul-mignight-calendar/CalculMidnightCalandar";
import "./row-list.css";

export const RowList = ({ calendar, displayTimesOfTheDate }) => {
  let count = 1;
  const [now, setNow] = useState(new Date().setHours(0, 0, 0, 0));

  return (
    <>
      <tbody className="salat-of-month ">
        {calendar.map((obj, index) => (
          <tr
            className={
              now >
              new Date(
                `${obj.date.gregorian.month.en} ${obj.date.gregorian.day}, ${obj.date.gregorian.year} 00:00:00`
              )
                ? "container-horaires-list-passed"
                : now ===
                  new Date(
                    `${obj.date.gregorian.month.en} ${obj.date.gregorian.day}, ${obj.date.gregorian.year} 00:00:00`
                  ).setHours(0, 0, 0, 0)
                ? "container-horaires-list-today"
                : "container-horaires-list-normal"
            }
            key={index}
            onClick={()=>displayTimesOfTheDate(obj)}
          >
            <td className="count">{count++}</td>

            <td className="td-list-times-date">{obj.date.gregorian.date}</td>
            <td className="td-list-times-date">{obj.date.hijri.date}</td>
            <td className="td-list-times">{obj.timings.Fajr.substr(0, 6)}</td>
            <td className="td-list-times">
              {obj.timings.Sunrise.substr(0, 6)}
            </td>
            <td className="td-list-times">{obj.timings.Dhuhr.substr(0, 6)}</td>
            <td className="td-list-times">{obj.timings.Asr.substr(0, 6)}</td>
            <td className="td-list-times">
              {obj.timings.Maghrib.substr(0, 6)}
            </td>
            <td className="td-list-times">{obj.timings.Isha.substr(0, 6)}</td>
            <td className="td-list-times">
              <CalculMidnightCalendar
                fajrTimeCalendar={obj.timings.Fajr.substr(0, 6)}
                maghrebTimeCalendar={obj.timings.Maghrib.substr(0, 6)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};
