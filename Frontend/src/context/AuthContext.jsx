import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookingCar, setBookingCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownerBookingCar, setOwnerBookingCar] = useState([]);
  useEffect(() => {
    const initAuth = async () => {
      try {
        // PUBLIC — should always run
        const carsRes = await api.get("/api/v1/car/getAllCars");
        setCars(carsRes.data.data);
      } catch (err) {
        console.log("Cars fetch error:", err);
      }

      try {
        // AUTH — may fail if not logged in
        const [userRes, bookingCarRes, ownerBookRes] = await Promise.all([
          api.get("/api/v1/user/getUserData"),
          api.get("/api/v1/carbooking/getCoustomerBookings"),
          api.get("/api/v1/carbooking/ownerBookingCar"),
        ]);
        setOwnerBookingCar(ownerBookRes.data.data);
        setUser(userRes.data.data);
        setBookingCar(bookingCarRes.data.data);
      } catch (err) {
        console.log("User fetch error:", err);
        setUser(null);
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
        cars,
        setCars,
        loading,
        bookingCar,
        setBookingCar,
        ownerBookingCar,
        setOwnerBookingCar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
