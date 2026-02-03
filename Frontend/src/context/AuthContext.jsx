import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookingCar, setBookingCar] = useState([]);
  const [ownerBookingCar, setOwnerBookingCar] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(cars);
  const fetchCars = async () => {
    const res = await api.get("/api/v1/car/getAllCars");
    setCars(res.data.data);
  };

  const fetchUserBookings = async () => {
    const res = await api.get("/api/v1/carbooking/getCoustomerBookings");
    setBookingCar(res.data.data);
  };

  const fetchOwnerBookings = async () => {
    const res = await api.get("/api/v1/carbooking/ownerBookingCar");
    setOwnerBookingCar(res.data.data);
  };

  const fetchUserData = async () => {
    const res = await api.get("/api/v1/user/getUserData");
    setUser(res.data.data);
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        await fetchCars();
        await Promise.all([
          fetchUserData(),
          fetchUserBookings(),
          fetchOwnerBookings(),
        ]);
      } catch (err) {
        setUser(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setCars,
        cars,
        bookingCar,
        ownerBookingCar,
        loading,
        fetchUserBookings, // ✅ exposed
        fetchOwnerBookings, // ✅ exposed
        setBookingCar,
        setOwnerBookingCar,
        fetchCars,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
