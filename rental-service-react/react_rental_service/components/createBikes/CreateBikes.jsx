import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../homepage/navbar/Navbar";
import "./createbikes.css";

const AddBikes = () => {
  const [services, setServices] = useState([]);
  const [createBike, setCreateBike] = useState({
    bike_name: "",
    bike_price: "",
    bike_description: "",
    service_id: "",
  });

  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);

  function createBikesInRentalService(event) {
    event.preventDefault();

    if (
      createBike.bike_name &&
      createBike.bike_price &&
      createBike.bike_description &&
      createBike.service_id
    ) {
      const bike_slug = crypto.randomUUID();

      axios
        .post("http://localhost:5000/bikes", {
          bike_name: createBike.bike_name,
          bike_price: createBike.bike_price,
          bike_description: createBike.bike_description,
          bike_slug,
          service_id: createBike.service_id,
        })
        .then((res) => {
          if (res.status == "200") {
            setSuccess(true);
            setMessage(res.data.message);

            setTimeout(() => {
              setSuccess(false);
            }, 1000);
          }
        })
        .catch((error) => {
          setHasError(true);
          setMessage("Some error occurred !");

          setTimeout(() => {
            setHasError(false);
          }, 1000);
        });
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((res) => {
        if (res.status == "200") {
          setServices(res.data.services);
        }
      })
      .catch((error) => {
        setHasError(true);
        setMessage("Some error occurred !");
      });
  }, []);

  return (
    <>
      <Navbar />
      {success && (
        <div className="alert__message success__message register__message">
          {message}.
        </div>
      )}

      {hasError && (
        <div className="alert__message error__message field__message">
          {message}
        </div>
      )}
      <div className="create__rents__container">
        <form
          className="create__rents__form"
          onSubmit={createBikesInRentalService}
        >
          <p className="rents__heading">Enter you bike name</p>

          <input
            type="text"
            className="user bike__name"
            placeholder="Enter you bike name"
            value={createBike.bike_name}
            onChange={(event) => {
              setCreateBike({ ...createBike, bike_name: event.target.value });
            }}
          />
          <input
            type="number"
            className="user bike__price"
            placeholder="Enter your bike price (price/hr)"
            value={createBike.bike_price}
            onChange={(event) => {
              setCreateBike({ ...createBike, bike_price: event.target.value });
            }}
          />
          <textarea
            className="user bike__description"
            placeholder="Enter your bike description"
            value={createBike.bike_description}
            onChange={(event) => {
              setCreateBike({
                ...createBike,
                bike_description: event.target.value,
              });
            }}
          ></textarea>

          <select
            id="service__location"
            className="user"
            value={createBike.service_id}
            onChange={(event) => {
              setCreateBike({
                ...createBike,
                service_id: event.target.value,
              });
            }}
          >
            {services.map((ser, index) => {
              const { service_name, id } = ser;

              return (
                <option key={index} value={id}>
                  {service_name}
                </option>
              );
            })}
          </select>

          <button type="submit" className="btn login">
            Add Service
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBikes;
