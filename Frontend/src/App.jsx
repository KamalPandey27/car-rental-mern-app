import React from "react";
import Layout from "./Layout";
import { Home, Cars, MyBookings, Dashboard, SignUp } from "./pages";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import CarDetails from "./components/CarDetails";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cars" element={<Cars />} />
        <Route path="mybookings" element={<MyBookings />} />
        <Route path="owner" element={<Dashboard />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="car-details/:id" element={<CarDetails />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
