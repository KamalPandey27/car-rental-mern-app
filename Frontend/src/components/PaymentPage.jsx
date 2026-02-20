import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "./Loader";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
const PaymentPage = () => {
  const navigate = useNavigate();
  const locationData = useLocation();
  const state = locationData.state;

  const { cars, fetchCars, fetchUserBookings } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cars.length) {
      fetchCars();
    }
  }, [fetchCars, cars.length]);

  // 🔴 VERY IMPORTANT: Guard against direct access / refresh
  if (!state) {
    return (
      <div className="mt-30 text-center">
        <h2 className="text-xl font-semibold">Invalid Access</h2>
        <p>Please start booking from the car details page.</p>
      </div>
    );
  }

  const {
    pickupDate,
    returnDate,
    location,
    totalDays,
    totalAmount,
    carId,
    owner,
  } = state;

  const car = cars.find((item) => String(item._id) === String(carId));

  const handleCashPayment = async () => {
    setLoading(true);

    try {
      await api.post("/v1/carbooking/bookCar", {
        pickupDate,
        returnDate,
        location,
        totalDays,
        totalAmount,
        car: carId,
        owner,
        paymentMethod: "cash",
      });

      toast.success("Car booked successfully! Please pay at pickup.");
      await fetchCars();
      await fetchUserBookings();
      navigate("/mybookings", { replace: true });
      window.location.reload();
    } catch (error) {
      console.log("Cash booking error:", error);
      toast.error(error.response?.data?.message || "Failed to book car.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="w-[40%] m-auto mt-30 space-y-5">
        <h2 className="text-2xl font-semibold">Choose Payment Method</h2>

        <div className="border p-4 rounded space-y-1">
          <p>Total Amount: ₹{totalAmount}</p>
          <p>Pickup Date: {pickupDate}</p>
          <p>Return Date: {returnDate}</p>
          <p>Location: {location}</p>
          <p>Total Days: {totalDays}</p>
        </div>

        {car && car.isAvailable ? (
          <>
            <button
              className="w-full bg-green-600 text-white py-3 rounded"
              onClick={handleCashPayment}
            >
              Pay with Cash
            </button>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded"
              onClick={() => {
                toast.info("Razorpay coming next");
              }}
            >
              Pay with Razorpay
            </button>
          </>
        ) : (
          <button className="w-full bg-gray-400 text-white py-3 rounded cursor-not-allowed">
            Car Booked
          </button>
        )}
      </div>
    </>
  );
};

export default PaymentPage;
