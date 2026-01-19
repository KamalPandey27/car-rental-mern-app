import { BookContext } from "./BookContext";
import { useState } from "react";
import { dummyCarData } from "../assets/assets";
export const BookProvider = ({ children }) => {
  const [bookingCar, setBookingCar] = useState([]);
  const [carData, setCarData] = useState(dummyCarData);
  return (
    <BookContext.Provider
      value={{ bookingCar, setBookingCar, carData, setCarData }}
    >
      {children}
    </BookContext.Provider>
  );
};
