import { Link } from "react-router-dom";
import "./rents.css";
import { IoIosArrowForward } from "react-icons/io";

const Rents = (props) => {
  const { id, service_name, phone_number } = props;

  const randomNumber = parseInt(Math.random() * 9) + 1;

  return (
    <>
      <div className="services__individual__container">
        <div className="services__individual__content">
          <div className="services__image">
            <img src={`/store/${randomNumber}.jpg`} alt="image_not_available" />
          </div>
          <div className="services__bottom__content">
            <div>
              <p>{service_name}</p>
              <p>{phone_number}</p>
            </div>
            <div className="view__rents__btn__container">
              <Link to={`/bikes/${id}`} className="view__rents__btn">
                <a>View Rents</a>
                <a>
                  <IoIosArrowForward />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Rents;
