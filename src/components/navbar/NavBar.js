import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./NavBar.css";

export const NavBar = ({ buttonBurgerIsClicked, setButtonBurgerIsClicked }) => {

  const Location = useLocation();
  const [isHomePageLocation, setIsHomePageLocation] = useState(false);

  useEffect(() => {
    if (Location.pathname === "/") {
      setIsHomePageLocation(true);
    } else {
      setIsHomePageLocation(false)
    }
  }, [Location]);

  useEffect(() => {
    let btnLocation = document.getElementsByClassName('button-location')[0];
    let btnInfos = document.getElementsByClassName("TodayTimesList__ul-times-list__li__span--information");
    if (buttonBurgerIsClicked === true && btnInfos.length === 0 && isHomePageLocation === true || buttonBurgerIsClicked === true && btnInfos.length === 0 && Location.pathname === "/index.html" || buttonBurgerIsClicked === true && btnInfos.length === 0 && Location.pathname === "/calendar"  ) {

      btnLocation.style.opacity = "0";
      btnLocation.style.pointerEvents = "none";



    } else if (btnInfos.length !== 0 && buttonBurgerIsClicked === true && isHomePageLocation === true || btnInfos.length !== 0 && buttonBurgerIsClicked === true && Location.pathname === "/index.html" || btnInfos.length !== 0 && buttonBurgerIsClicked === true &&  Location.pathname === "/calendar") {
      btnLocation.style.opacity = "0";
      btnLocation.style.pointerEvents = "none";
      btnInfos[0].style.pointerEvents = "none";
      btnInfos[1].style.pointerEvents = "none";
      btnInfos[2].style.pointerEvents = "none";
      btnInfos[3].style.pointerEvents = "none";
      btnInfos[4].style.pointerEvents = "none";
      btnInfos[0].style.opacity = "0";
      btnInfos[1].style.opacity = "0";
      btnInfos[2].style.opacity = "0";
      btnInfos[3].style.opacity = "0";
      btnInfos[4].style.opacity = "0";
      btnInfos[0].style.transition = "0.8s";
      btnInfos[1].style.transition = "0.8s";
      btnInfos[2].style.transition = "0.8s";
      btnInfos[3].style.transition = "0.8s";
      btnInfos[4].style.transition = "0.8s";


    } else if (buttonBurgerIsClicked === false && isHomePageLocation === true || buttonBurgerIsClicked === false && Location.pathname === "/index.html" || buttonBurgerIsClicked === false && Location.pathname === "/calendar") {

      btnLocation.style.pointerEvents = "auto";
      btnLocation.style.opacity = "1";
      btnLocation.style.transition = "0.8s";
      if (btnInfos.length !== 0) {

        btnInfos[0].style.pointerEvents = "auto";
        btnInfos[1].style.pointerEvents = "auto";
        btnInfos[2].style.pointerEvents = "auto";
        btnInfos[3].style.pointerEvents = "auto";
        btnInfos[4].style.pointerEvents = "auto";
        btnInfos[0].style.opacity = "1";
        btnInfos[1].style.opacity = "1";
        btnInfos[2].style.opacity = "1";
        btnInfos[3].style.opacity = "1";
        btnInfos[4].style.opacity = "1";
        btnInfos[0].style.transition = "0.8s";
        btnInfos[1].style.transition = "0.8s";
        btnInfos[2].style.transition = "0.8s";
        btnInfos[3].style.transition = "0.8s";
        btnInfos[4].style.transition = "0.8s";
      }

    }
  }, [buttonBurgerIsClicked, isHomePageLocation])

  return (


    <nav>
      <div className="navbar">
        <div className="container nav-container">
          <input className="checkbox" type="checkbox" name="" id=""
            onClick={() => setButtonBurgerIsClicked((isFalse) => !isFalse)} />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <div className="logo">
            <span>React Prayer Time</span>
          </div>
          <div className="menu-items">
            <li><Link
              to="/"
              onClick={() => {
                document.getElementsByClassName("checkbox")[0].checked = false;
                setButtonBurgerIsClicked((isFalse) => !isFalse)
              }}
            >
              <div className="link-container">
                <i className="far fa-clock icons-nav"></i>
                <strong>Horaires</strong>
              </div>

            </Link>

            </li>
            <li>

              <Link
                to="/quran"
                onClick={() => {
                  document.getElementsByClassName("checkbox")[0].checked = false;
                  setTimeout(() => {
                    setButtonBurgerIsClicked((isFalse) => !isFalse)

                  }, 1000)

                }}

              >
                <div className="link-container">
                  <i className="fas fa-quran icons-nav"></i>
                  <strong>Coran</strong>

                </div>

              </Link>

            </li>

          </div>
        </div>
      </div>
    </nav>
  );
};