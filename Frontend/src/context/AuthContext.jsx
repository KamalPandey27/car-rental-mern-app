import { createContext,  useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookingCar, setBookingCar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const [userRes, carsRes, bookingCarRes] = await Promise.all([
          api.get("/api/v1/user/getUserData"),
          api.get("/api/v1/car/getAllCars"),
          api.get("/api/v1/carbooking/getAllBookings"),
        ]);

        setUser(userRes.data.data);
        setCars(carsRes.data.data);
        setBookingCar(bookingCarRes.data.data);
        console.log(carsRes, bookingCarRes , userRes);
      } catch (err) {
        setUser(null);
        console.log("Auth init error:", err);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
