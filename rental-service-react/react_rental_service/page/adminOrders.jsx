import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/homepage/footer/Footer";
import Navbar from "../components/homepage/navbar/Navbar";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/orders").then((res) => {
      if (res.status == "200") {
        setOrders(res.data.orderUserBike);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="user__order__container">
        <table>
          <thead>
            <tr>
              <th>Bike Name</th>
              <th>Quantity</th>
              <th>Total Sum</th>
              <th>Username</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              const { order, user, bike } = item;

              console.log(order.payment);

              return (
                <tr key={index}>
                  <td>{bike.bike_name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.sum}</td>
                  <td>{user.username}</td>
                  <td>{user.address}</td>
                  <td>{user.phone_number}</td>
                  <td>{order.payment ? "paid" : "pending"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default AdminOrder;
