import "./hero.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Rents from "../rents/Rents";
import Spinner from "../../spinner/Spinner";

const Hero = () => {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function searchRentalServicesFromLocation(event) {
    event.preventDefault();

    const url = `http://localhost:5000/services/${search}`;

    axios.get(url).then((res) => {
      if (res.data.error == "warning") {
        setHasError(true);
        setMessage(res.data.message);

        setTimeout(() => {
          setHasError(false);
        }, 2000);
      }

      if (res.data.error == "success") {
        setServices(res.data.locationServices.Services);
      }
    });
  }

  useEffect(() => {
    const url = `http://localhost:5000/services`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setServices(res.data.services);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {hasError && (
        <div className="alert__message error__message field__message">
          {message}
        </div>
      )}

      <div className="store__hero__section">
        <div className="hero__section__container">
          <div className="hero__search__section">
            <form
              className="search__section"
              onSubmit={searchRentalServicesFromLocation}
            >
              <input
                type="text"
                className="search__input"
                placeholder="Enter your location"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
              <button type="submit" className="btn search__btn">
                Search
              </button>
            </form>
          </div>

          {isLoading ? <Spinner /> : <></>}

          <div className="services__container">
            <div className="services__container__section">
              {services.map((service) => {
                return <Rents key={service.id} {...service} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
