import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function CarCard({ item }) {
  if (!item) return null;

  return (
    <Link
      to={`/car-details/${item?._id}`}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item?.image?.url || ""}
          alt="car_image"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {item?.isAvailable ? (
          <p className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full">
            Available Now
          </p>
        ) : (
          <p className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2.5 py-1 rounded-full">
            Not Available
          </p>
        )}

        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="font-semibold">₹ {item?.perDayPrice ?? "-"}</span>
          <span className="text-sm text-white/80"> / day</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium">
            {(item?.brand || "").toUpperCase()}-
            {(item?.model || "").toUpperCase()}
          </h3>
          <span className="text-muted-foreground text-sm">
            {(item?.category || "").toUpperCase()}{" "}
            {(item?.year || "").toString()}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.users_icon} alt="user" className="h-4 mr-2" />
            <span>{item?.seatingCapacity ?? "-"} Seats</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.fuel_icon} alt="fuel" className="h-4 mr-2" />
            <span>
              {item?.fuelType
                ? item.fuelType.charAt(0).toUpperCase() + item.fuelType.slice(1)
                : ""}
            </span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.carIcon} alt="car" className="h-4 mr-2" />
            <span>
              {item?.transmission
                ? item.transmission.charAt(0).toUpperCase() +
                  item.transmission.slice(1)
                : ""}
            </span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <img
              src={assets.location_icon}
              alt="location"
              className="h-4 mr-2"
            />
            <span>{item?.location || ""}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;
