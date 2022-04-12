import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./navbar-today-and-mounth.css";
const NavBarTodayAndMounth = () => {
  const [currentComponent, setCurrentComponent] = useState(0);


  const clickedComponent = (number) => {
    if (number === 0) {
      localStorage.setItem("NavBarTodayAndMounth", 0);
      setCurrentComponent(localStorage.getItem("NavBarTodayAndMounth"));
    } else if (number === 1) {
      localStorage.setItem("NavBarTodayAndMounth", 1);
      setCurrentComponent(localStorage.getItem("NavBarTodayAndMounth"));
    }
  };

  return (
    <>
      <nav className="NavBarTodayAndMounth__nav">
        <ul className="NavBarTodayAndMounth__nav__ul">
          <li
            className={
              localStorage.getItem("NavBarTodayAndMounth") == 0 || !localStorage.getItem("NavBarTodayAndMounth")
                ? "NavBarTodayAndMounth__nav__ul__li--today currentComponent"
                : "NavBarTodayAndMounth__nav__ul__li--today"
            }
          >
            <Link
              to=""
              className="NavBarTodayAndMounth__nav__ul__li__Link-today"
              onClick={() => clickedComponent(0)}
            >
              <span>AUJOURD'HUI</span>
              <i className="fa-solid fa-clock"></i>{" "}
            </Link>
          </li>
          <li
            className={
              localStorage.getItem("NavBarTodayAndMounth") == 1
                ? "NavBarTodayAndMounth__nav__ul__li--month currentComponent"
                : "NavBarTodayAndMounth__nav__ul__li--month"
            }
          >
            <Link
              to="calendar"
              className="NavBarTodayAndMounth__nav__ul__li__Link-mounth"
              onClick={() => clickedComponent(1)}
            >
              <span>CALENDRIER</span>
              <i className="fa-solid fa-calendar-days"></i>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </>

  );
};

export default NavBarTodayAndMounth;
