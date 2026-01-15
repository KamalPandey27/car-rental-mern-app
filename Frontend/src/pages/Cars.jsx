import React from "react";
import { assets, dummyCarData } from "../assets/assets";
import { Link } from "react-router-dom";
function Cars() {
  return (
    <>
      <section className="flex flex-col  w-full pt-18.25">
        <div className="flex flex-col items-center py-20 bg-light max-md:px-4 w-full gap-4">
          <div className="font-semibold text-4xl md:text-[40px] text-center">
            Available Cars
          </div>
          <span className="text-sm md:text-base text-gray-500/90  max-w-156 text-center">
            Browse our selection of premium vehicles available for your next
            adventure
          </span>
          <div className="flex items-center justify-center bg-white p-3 gap-2 rounded-full lg:w-[40%] sm:w-[60%] w-[95%]">
            <img src={assets.search_icon} alt="search_icon" />
            <input
              type="text"
              name=""
              id=""
              placeholder="Search by name , model , features"
              className="outline-none w-full sm:text-sm text-[12px]"
            />
            <img src={assets.filter_icon} alt="filter_icon" />
          </div>
        </div>
        <div className="text-gray-500/90 mt-10 ml-35">
          Showing {dummyCarData.length} Cars
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-6 md:px-16 lg:px-24 xl:px-32">
          {dummyCarData?.map((item) => {
            return (
              <Link
                to={`/car-details/${item._id}`}
                className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                key={item._id}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt="car_image"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <p className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full">
                    Available Now
                  </p>
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                    <span className="font-semibold">$ {item.pricePerDay}</span>
                    <span className="text-sm text-white/80"> / day</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium">
                      {item.brand}
                      {item.model}
                    </h3>
                    <span className="text-muted-foreground text-sm">
                      {item.category} {item.year}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <img
                        src={assets.users_icon}
                        alt="user"
                        className="h-4 mr-2"
                      />
                      <span>{item.seating_capacity} Seats</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <img
                        src={assets.fuel_icon}
                        alt="fuel"
                        className="h-4 mr-2"
                      />
                      <span>{item.fuel_type}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <img
                        src={assets.carIcon}
                        alt="car"
                        className="h-4 mr-2"
                      />
                      <span>{item.transmission}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <img
                        src={assets.location_icon}
                        alt="location"
                        className="h-4 mr-2"
                      />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Cars;
