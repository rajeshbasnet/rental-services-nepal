import axios from "axios";
import { useState } from "react";
import "./createRent.css";

const CreateRents = () => {
  const [service, setService] = useState({
    service_name: "",
    phone_number: "",
    location_name: "",
  });

  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [serviceCr, setServiceCr] = useState(false);

  function createServiceOnLocation(event) {
    event.preventDefault();

    const { service_name, phone_number, location_name } = service;

    if ((service_name, phone_number, location_name)) {
      axios
        .post("http://localhost:5000/services", {
          service_name,
          phone_number,
          location_name,
        })
        .then((res) => {
          if (res.status == "200") {
            setServiceCr(true);
            setMessage(res.data.message);

            setTimeout(() => {
              setServiceCr(false);
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setHasError(true);
      setMessage("All fields mandatory !");

      setTimeout(() => {
        setHasError(false);
      }, 2000);
    }
  }

  return (
    <>
      {serviceCr && (
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
          action=""
          className="create__rents__form"
          onSubmit={createServiceOnLocation}
        >
          <p className="rents__heading">Add your rental service</p>

          <input
            type="text"
            className="user service__name"
            placeholder="Enter you service name"
            value={service.service_name}
            onChange={(event) => {
              setService({ ...service, service_name: event.target.value });
            }}
          />
          <input
            type="text"
            className="user service__address"
            placeholder="Enter your service address"
            value={service.service_address}
            onChange={(event) => {
              setService({ ...service, location_name: event.target.value });
            }}
          />
          <input
            type="number"
            className="user phone__number"
            placeholder="Enter your phone number"
            value={service.phone_number}
            onChange={(event) => {
              setService({ ...service, phone_number: event.target.value });
            }}
          />

          <button type="submit" className="btn login">
            Add Service
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRents;
