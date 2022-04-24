import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import "./bikes.css";

const Bikes = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/bikes/${id}`;

  const [bikes, setBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(url).then((res) => {
        if (res.status == "200") {
          const { bikes } = res.data;

          if (bikes.length > 0) {
            setTimeout(() => {
              setBikes(bikes);
              setIsLoading(false);
            }, 500);
          }
        }
      });
    }
  }, []);

  return (
    <>
      {isLoading && <Spinner />}

      <div className="bikes__container">
        {bikes.map((bike) => {
          const { id, bike_name, bike_price, bike_description, bike_slug } =
            bike;

          const randomNumber = parseInt(Math.random() * 35) + 1;

          return (
            <div key={bike.id} className="bikes__individual__content">
              <div className="bikes__image">
                <img
                  src={`/bikes/${randomNumber}.jpg`}
                  alt="image_not_available"
                />
              </div>
              <div className="services__bottom__content">
                <div>
                  <p>{bike_name}</p>
                  <p>Rs. {bike_price}/hr</p>
                </div>
              </div>

              <div className="book__btn__container">
                <Link to={`/bike/${id}`} className="btn book__btn">
                  View More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Bikes;
