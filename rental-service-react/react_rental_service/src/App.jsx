import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "../page/homepage";
import LoginPage from "../page/login";
import RegsiterPage from "../page/register";
import StorePage from "../page/store";
import BikePage from "../page/bikes";
import CreateRentsPage from "../page/createRents";
import LogoutPage from "../page/logout";
import IndividualBike from "../page/bike";
import AddBikes from "../components/createBikes/CreateBikes";
import DashboardPage from "../page/dashboardPage";
import OrderPage from "../page/orders";
import AdminOrder from "../page/adminOrders";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegsiterPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/bikes/:id" element={<BikePage />} />
        <Route path="/rents" element={<CreateRentsPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/bike/:id" element={<IndividualBike />} />
        <Route path="/addbikes" element={<AddBikes />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/admin/orders" element={<AdminOrder />} />
      </Routes>
    </div>
  );
}

export default App;
