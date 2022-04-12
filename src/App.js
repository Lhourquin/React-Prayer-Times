import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "./components/navbar/NavBar";
import { SearchBar } from "./components/search-bar/SearchBar";
import NavBarTodayAndMounth from "./components/Homepage-components/navbar-today-mounth/NavBarTodayAndMounth";
import { Quran } from "./components/quran-component/Quran";
import { Calendar } from "./components/Homepage-components/calendar-components/Calendar";
import { Today } from "./components/Homepage-components/today-components/Today";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const [isOnLine, setIsOnLine] = useState(navigator.onLine);
  const [inputCityValue, setInputCityValue] = useState("");
  const [inputCountryValue, setInputCountryValue] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [method, setMethod] = useState([
    {
      value: "2",
      stringValue: "Sélectionner un angle",
    },
    {
      value: 2,
      stringValue: "Amérique du Nord (15°)",
    },
    {
      value: 15,
      stringValue: "Comité d'observation de la lune",
    },
    {
      value: 3,
      stringValue: "Ligue Mondiale Musulmane ( fajr 18° - icha 17° )",
    },
    {
      value: 4,
      stringValue: "Umm Al-Qura, Makkah ( fajr 18.5° - icha 90 min )",
    },
    {
      value: 5,
      stringValue: "Egypte ( fajr 19.5° - icha 17.5° )",
    },
    {
      value: 8,
      stringValue: "Golf ( fajr 19.5° - icha 90 min )",
    },
    {
      value: 9,
      stringValue: "Koweit ( fajr 18° - icha 17.5° )",
    },
    {
      value: 10,
      stringValue: "Qatar ( fajr 18° - icha 90 min )",
    },
    {
      value: 11,
      stringValue: "Singapour ( fajr 20°) - icha 18° )",
    },
    {
      value: 12,
      stringValue: "UOIF (12°)",
    },
    {
      value: 13,
      stringValue: "Turquie ( fajr 18° - icha 17° )",
    },
  ]);

  const [selectedMethodValue, setSelectedMethodValue] = useState("");
  const [selectedMethodStringValue, setSelectedMethodStringValue] =
    useState("");
  const [errorMessageLocation, setErrorMessageLocation] = useState("");

  const requestDataPosition = () => {
    navigator.geolocation.getCurrentPosition(getPosition, notGetPosition);
  };

  const getPosition = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=fr`

    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("City", data.city);
        localStorage.setItem("Country", data.countryName);
        setCity(localStorage.getItem("City"));
        setCountry(localStorage.getItem("Country"));
      });

    setTimeout(() => {
      setErrorMessageLocation("");
    }, 5000);
  };

  const notGetPosition = () => {
    let userAgent = navigator.userAgent;
    let browserName;
    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
      browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "edge";
    } else {
      browserName = "No browser detection";
    }

    if (browserName === "safari") {
      setErrorMessageLocation(
        "Le service de localisation ne fonctionne pas sur Safari."
      );
    } else {
      setErrorMessageLocation(
        "Nous n'avons pas pu avoir accées à votre localisation."
      );
    }

    setTimeout(() => {
      setErrorMessageLocation("");
    }, 5000);
  };

  useEffect(() => {
    if (localStorage.getItem("City") && localStorage.getItem("Country")) {
      setCity(localStorage.getItem("City"));
      setCountry(localStorage.getItem("Country"));
    }
  });

  const [methodValue, setMethodValue] = useState("");

  useEffect(() => {
    if (selectedMethodValue === "") {
      if (
        localStorage.getItem("SelectedMethodValue") &&
        localStorage.getItem("SelectedMethodStringValue")
      ) {
        setMethodValue(localStorage.getItem("SelectedMethodValue"));
        setSelectedMethodStringValue(
          localStorage.getItem("SelectedMethodStringValue")
        );
      } else {
        setMethodValue(method[0].value);
      }
    } else if (selectedMethodValue !== "") {
      setMethodValue(selectedMethodValue);
    }
  }, [method, selectedMethodValue]);

  useEffect(() => {
    let timer = null;
    if (city && country && methodValue && isOnLine) {
      let params = new URLSearchParams();

      params.append("country", country);
      params.append("city", city);
      params.append("method", methodValue);

      let request = {
        params: params,
      };
      timer = setTimeout(async () => {
        const { data } = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity`,
          request
        );
        localStorage.setItem("TodayTimes", JSON.stringify([data]));
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [city, country, methodValue, isOnLine]);

  useEffect(() => {
    let timer = null;
    if (city && country && methodValue && isOnLine) {
      let params = new URLSearchParams();
      params.append("country", country);
      params.append("city", city);
      params.append("method", methodValue);

      let request = {
        params: params,
      };
      timer = setTimeout(async () => {
        const { data } = await axios
          .get(`https://api.aladhan.com/v1/calendarByCity`, request)
          .then(
            (currentTimesOfTheDateClicked) => currentTimesOfTheDateClicked.data
          );
        localStorage.setItem("Calendar", JSON.stringify(data));
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [city, country, methodValue, isOnLine]);

  const [buttonBurgerIsClicked, setButtonBurgerIsClicked] = useState(false);

  const [surat, setSurat] = useState([]);
  const [quran, setQuran] = useState([]);
  const [suratName, setSuratName] = useState([
    ["Prologue (Al-Fatiha)."],
    ["La vache (Al-Baqarah)."],
    ["La famille d'Imran (Al-Imran)."],
    ["Les femmes (An-Nisa')."],
    ["La table servie (Al-Maidah)."],
    ["Les bestiaux (Al-Anam)."],
    ["Al-Araf."],
    ["Le butin (Al-Anfal)."],
    ["Le repentir (At-Tawbah)."],
    ["Jonas (Yunus)."],
    ["Hud."],
    ["Joseph (Yusuf)."],
    ["Le tonnerre (Ar-Raad)."],
    ["Abraham (Ibrahim)."],
    ["Al-Hijr."],
    ["Les abeilles (An-Nahl)."],
    ["Le voyage nocturne (Al-Isra)."],
    ["La caverne (Al-Kahf)."],
    ["Marie (Maryam)."],
    ["Ta-Ha."],
    ["Les prophètes (Al-Anbiya)."],
    ["Le pélerinage (Al-Hajj)."],
    ["Les croyants (Al-Muminune)."],
    ["La lumière (An-Nur)."],
    ["Le discernement (Al Furqane)."],
    ["Les poètes (As-Shuaraa)."],
    ["Les fourmis (An-Naml)."],
    ["Le récit (Al-Qasas)."],
    ["L'araignée (Al-Ankabut)."],
    ["Les romains (Ar-Rum)."],
    ["Luqman."],
    ["La prosternation (As-Sajda)."],
    ["Les coalisés (Al-Ahzab)."],
    ["Saba."],
    ["Le Créateur (Fatir)."],
    ["Ya-Sin."],
    ["Les rangés (As-Saffat)."],
    ["Sad."],
    ["Les groupes (Az-Zumar)."],
    ["Le pardonneur (Gafir)."],
    ["Les versets détaillés (Fussilat)."],
    ["La consultation (Achoura)."],
    ["L'ornement (Azzukhruf)."],
    ["La fumée (Ad-Dukhan)."],
    ["L'agenouillée (Al-Jathya)."],
    ["Al-Ahqaf."],
    ["Muhammad."],
    ["La victoire éclatante (Al-Fath)."],
    ["Les appartements (Al-Hujurat)."],
    ["Qaf."],
    ["Qui éparpillent (Ad-Dariyat)."],
    ["At-Tur."],
    ["L'étoile (An-Najm)."],
    ["La lune (Al-Qamar)."],
    ["Le Tout Miséricordieux (Ar-Rahman)."],
    ["L'événement (Al-Waqi'a)."],
    ["Le fer (Al-Hadid)."],
    ["La discussion (Al-Mujadalah)."],
    ["L'exode (Al-Hasr)."],
    ["L'éprouvée (Al-Mumtahanah)."],
    ["Le rang (As-Saff)."],
    ["Le vendredi (Al-Jumua)."],
    ["Les hypocrites (Al-Munafiqun)."],
    ["La grande perte (At-Tagabun)."],
    ["Le divorce (At-Talaq)."],
    ["L'interdiction (At-Tahrim)."],
    ["La royauté (Al-Mulk)."],
    ["La plume (Al-Qalam)."],
    ["Celle qui montre la vérité (Al- Haqqah)."],
    ["Les voies d'ascension (Al- Maarij)."],
    ["Noé (Nuh)."],
    ["Les djinns (Al-Jinn)."],
    ["L'enveloppé (Al-Muzzamil)."],
    ["Le revêtu d'un manteau (Al-Muddattir)."],
    ["La résurrection (Al-Qiyamah)."],
    ["L'homme (Al-Insan)."],
    ["Les envoyés (Al-Mursalate)."],
    ["La nouvelle (An-Naba)."],
    ["Les anges qui arrachent les âmes (An-Naziate)."],
    ["Il s'est renfrogné (Abasa)."],
    ["L'obscurcissement (At-Takwir)."],
    ["La rupture (Al-Infitar)."],
    ["Les fraudeurs (Al-Mutaffifune)."],
    ["La déchirure (Al-Insiqaq)."],
    ["Les constellations (Al-Buruj)."],
    ["L'astre nocturne (At-Tariq)."],
    ["Le Très-Haut (Al-Ala)."],
    ["L'enveloppante (Al-Gasiyah)."],
    ["L'aube (Al-Fajr)."],
    ["La cité (Al-Balad)."],
    ["Le soleil (Ach-Chams)."],
    ["La nuit (Al-Layl)."],
    ["Le jour montant (Ad-Duha)."],
    ["L'ouverture (As-Sarh)."],
    ["Le figuier (At-Tin)."],
    ["L'adhérence (Al-Alaq)."],
    ["La Destinée (Al-Qadr)."],
    ["La preuve (Al-Bayyinah)."],
    ["La secousse (Az-Zalzalah)."],
    ["Les coursiers (Al-Adiyate)."],
    ["Le fracas (Al-Qariah)."],
    ["La course aux richesses (At-Takatur)."],
    ["Le temps (Al-Asr)."],
    ["Les calomniateurs (Al-Humazah)."],
    ["L'éléphant (Al-Fil)."],
    ["Qoraïsh."],
    ["L'ustensile (Al-Maun)."],
    ["L'abondance (Al-Kawtar)."],
    ["Les infidèles (Al-Kafirune)."],
    ["Les secours (An-Nasr)."],
    ["Les fibres (Al-Masad)."],
    ["Le monothéisme pur (Al-Ihlas)."],
    ["L'aube naissante (Al-Falaq)."],
    ["Les hommes (An-Nas)."],
  ])

  const getQuran = (number) => {
    let arr = [];
    for (let i = 1; i < number; i++) {

      fetch(`https://quranenc.com/api/translation/sura/french_hameedullah/${i}`)
        .then(response => response.json())
        .then((result) => {

          arr.push(result.result);
          localStorage.setItem("Quran", JSON.stringify(arr))
          setQuran(JSON.parse(localStorage.getItem("Quran")));

        })
    }
  }

  const [apiCall, setApiCall] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Quran")) {
      setApiCall(false);

      setSurat(JSON.parse(localStorage.getItem("Quran") || "[]"));

    } else if (!localStorage.getItem("Quran") || localStorage.getItem("Quran").length !== 114) {
      setApiCall(true);
      getQuran(115)

    }
  }, [])

  useEffect(() => {


    if (apiCall) {
      let arrayOfSurat = [];
      let timer = setTimeout(() => {
        for (let i = 0; i < quran.length; i++) {

          arrayOfSurat.push({
            id: Number(quran[i][0].sura),
            sourate: suratName[Number(quran[i][0].sura) - 1],
            verset: quran[i].map((x) => {
              return {
                ayaNumber: x.aya,
                ayaArabic: x.arabic_text,
                ayaTranslate: x.translation
              }


            }

            )
          })

        }
        arrayOfSurat.sort((a, b) => a.id - b.id)

        localStorage.setItem("Quran", JSON.stringify(arrayOfSurat))
        setSurat(JSON.parse(localStorage.getItem("Quran") || "[]"))


      }, 1000)

      return () => clearTimeout(timer)


    }




  }, [quran])




  return (
    <>
      <header>
        <NavBar
          buttonBurgerIsClicked={buttonBurgerIsClicked}
          setButtonBurgerIsClicked={setButtonBurgerIsClicked}
        />

      </header>
      <div style={{ textAlign: "center", color: "#bc4749" }}>
        {errorMessageLocation}
      </div>
      <Routes>

        <Route
          path="/*"
          element={
            <>
              <SearchBar
                inputCity={inputCityValue}
                inputCountry={inputCountryValue}
                getPosition={requestDataPosition}
                handleChangeInputCityValue={(e) => {
                  setInputCityValue(e.target.value);
                }}
                handleChangeInputCountryValue={(e) =>
                  setInputCountryValue(e.target.value)
                }
                handleSubmitValue={(event) => {
                  event.preventDefault();

                  const key = event.keyCode;

                  if (key === 13) {
                    if (inputCityValue === "" || inputCountryValue === "") {
                      setCity("");
                      setCountry("");
                    } else {
                      localStorage.setItem("City", inputCityValue.trim());
                      localStorage.setItem("Country", inputCountryValue.trim());
                      setCity(localStorage.getItem("City"));
                      setCountry(localStorage.getItem("Country"));
                      setTimeout(() => {
                        setInputCityValue("");
                        setInputCountryValue("");
                      });

                    }
                  }

                  if (inputCityValue === "" || inputCountryValue === "") {
                    setCity("");
                    setCountry("");
                  } else {
                    localStorage.setItem("City", inputCityValue.trim());
                    localStorage.setItem("Country", inputCountryValue.trim());
                    setCity(localStorage.getItem("City"));
                    setCountry(localStorage.getItem("Country"));
                    setTimeout(() => {
                      setInputCityValue("");
                      setInputCountryValue("");
                    });
                  }

                }}
              />
              <NavBarTodayAndMounth />
              <Today
                buttonBurgerIsClicked={buttonBurgerIsClicked}
                city={city}
                country={country}
                method={method}
                getAngleOptionValue={(event) => {
                  let index = event.nativeEvent.target.selectedIndex;
                  localStorage.setItem("SelectedMethodValue", event.target.value);
                  localStorage.setItem(
                    "SelectedMethodStringValue",
                    event.target[index].innerHTML
                  );

                  setSelectedMethodValue(
                    localStorage.getItem("SelectedMethodValue")
                  );
                  setSelectedMethodStringValue(
                    localStorage.getItem("SelectedMethodStringValue")
                  );
                }}
                selectedMethodValue={selectedMethodValue}
                selectedMethodStringValue={selectedMethodStringValue}
              />
            </>

          }
        >

          <Route
            path="calendar"
            element={
              <Calendar
                city={city}
                country={country}
                method={method}
                getAngleOptionValue={(event) => {
                  let index = event.nativeEvent.target.selectedIndex;
                  localStorage.setItem("SelectedMethodValue", event.target.value);
                  localStorage.setItem(
                    "SelectedMethodStringValue",
                    event.target[index].innerHTML
                  );
                  setSelectedMethodValue(
                    localStorage.getItem("SelectedMethodValue")
                  );
                  setSelectedMethodStringValue(
                    localStorage.getItem("SelectedMethodStringValue")
                  );
                }}
                selectedMethodValue={selectedMethodValue}
                selectedMethodStringValue={selectedMethodStringValue}
              />
            }
          />
        </Route>

        <Route
          path="/quran"

          element={
            <Quran
              surat={surat}
            />
          }
        />


      </Routes>
    </>
  );
};

export default App;
