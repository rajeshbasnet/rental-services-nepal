import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "./order.css";
import { MdDelete } from "react-icons/md";

const Order = () => {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);

  let totalSum = 0;

  const [orders, setOrders] = useState([]);

  const user_id = cookies.id;

  useEffect(() => {
    if (!user_id) {
      navigate("/login");
    }

    const url = `http://localhost:5000/orders/${user_id}`;
    axios
      .get(url)
      .then((res) => {
        if (res.status == "200") {
          setOrders(res.data.userOrderBike);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [success]);

  function deleteOrders(order_id) {
    let url = `http://localhost:5000/orders/${order_id}`;
    axios
      .delete(url)
      .then((res) => {
        if (res.status == "200") {
          if (res.data.success == true) {
            setSuccess(true);
            setMessage("Order deleted successfully");

            setTimeout(() => {
              setSuccess(false);
            }, 1000);
          }
        } else {
          setHasError(true);
          setMessage("Order cannot be deleted");

          setTimeout(() => {
            setSuccess(false);
          }, 1000);
        }
      })
      .catch((error) => {
        setHasError(true);
        setMessage("Some internal error occurred");

        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      });
  }

  function orderCompleteRequest() {
    alert("Order has been placed successfully");
  }

  return (
    <>
      {success && (
        <div className="alert__message success__message register__message">
          {message}
        </div>
      )}

      {hasError && (
        <div className="alert__message error__message field__message">
          {message}
        </div>
      )}
      <div className="product_orders__container">
        <div className="product_orders__section">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Sum</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => {
                const { order, bike } = item.orders;

                totalSum += parseInt(order.sum);

                return (
                  <tr key={index}>
                    <td>{bike.bike_name}</td>
                    <td>{bike.bike_price}</td>
                    <td>{order.quantity}</td>
                    <td>{order.sum}</td>
                    <td>
                      <button
                        className="btn delete__btn"
                        onClick={() => {
                          deleteOrders(order.id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="checkout__container">
            <div className="checkout__section">
              <h3>Order Summary</h3>
              <p>
                Total Price : <span>Rs. {totalSum}</span>
              </p>
              <p>Discount : Not available</p>
              <form
                className="delivery__form"
                onSubmit={(event) => {
                  event.preventDefault();
                  orderCompleteRequest();
                }}
              >
                <div>
                  <label htmlFor="deliver">Delivery Options : </label>
                  <select name="" id="delivery">
                    <option value="1">Cash On Delivery</option>
                  </select>
                </div>

                <button type="submit" className="btn delivery__btn">
                  Order your purchase
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
