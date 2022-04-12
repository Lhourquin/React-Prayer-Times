import React, { useState } from "react";
import "./searchbar.css";

export const SearchBar = ({
  handleChangeInputCityValue,
  handleChangeInputCountryValue,
  handleSubmitValue,
  getPosition,
  inputCity,
  inputCountry,
}) => {
  const [toggleInput, setToggleInput] = useState(true);

  const handleToggle = () => {
    setToggleInput(false);
  };

  const closeSearch = () => {
    setToggleInput(true);
  };

  return (
    <>
      <button
        className="button-location noSelect"
        style={toggleInput ? {} : { display: "none" }}
        onClick={getPosition}
      >
        <i className="fas fa-map-marker-alt localisation-marker"></i>
      </button>
      <span
        style={toggleInput ? { display: "none" } : {}}
        className="cross noSelect"
        onClick={closeSearch}
      >
        <i className="fas fa-times-circle"></i>
      </span>
      <form
        className={(toggleInput ? "SearchBar__form" :  "transition-input ")}
        onSubmit={handleSubmitValue}
    
      >
        <div className="SearchBar__form__div--find-city-container">
          <input
            className={
              "SearchBar__form__div--find-city-container__input--city "
            }
            type="text"
            name="city"
            placeholder={toggleInput ? "Ou êtes vous ?" : "Entrez votre ville"}
            onClick={handleToggle}
            onChange={handleChangeInputCityValue}
            value={inputCity}
          />
        </div>

        <div
          className={
            "SearchBar__form__div--find-country-container " +
            (toggleInput ? "isClose" : " isOpen ")
          }
        >
          <input
            className="SearchBar__form__div--find-country-container__input-country"
            type="text"
            name="country"
            placeholder="Entrez votre pays"
            onChange={handleChangeInputCountryValue}
            value={inputCountry}
          />

          <button
            type="submit"
            className="SearchBar__form__div--find-country-container__submit noSelect"
            onClick={
              inputCountry != "" && inputCity != ""
                ? closeSearch
                : () => {
                    return;
                  }
            }
          >
            Rechercher
          </button>
        </div>
      </form>
    </>
  );
};
