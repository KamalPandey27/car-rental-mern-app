import React from "react";
import Layout from "./Layout";
// Main route import
import { Home, Cars, MyBookings } from "./pages";
// Owner Dashboard route import
import DashboardLayout from "./pages/owner/DashboardLayout";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import OwnerManageBookings from "./pages/owner/OwnerManageBookings";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import CarDetails from "./components/CarDetails";
import Loader from "./components/Loader";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PaymentPage from "./components/PaymentPage";
const App = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loader />;
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* Main route */}
        <Route index element={<Home />} />
        <Route path="cars" element={<Cars />} />
        <Route path="mybookings" element={<MyBookings />} />
        <Route path="car-details/:id" element={<CarDetails />} />
        <Route path="/payment" element={<PaymentPage />} />
        {/* OWNER DASHBOARD (NESTED ROUTES) */}
        <Route path="owner" element={<DashboardLayout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<OwnerManageBookings />} />
        </Route>
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
