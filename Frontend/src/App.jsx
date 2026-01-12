import React from "react";
import Layout from "./Layout";
import { Home, Cars, MyBookings, Dashboard, SignUp } from "./pages";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cars" element={<Cars />} />
        <Route path="mybookings" element={<MyBookings />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
