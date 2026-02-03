import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard";
import Hero from "../components/Hero";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { cars } = useContext(AuthContext);

  // ✅ Ensure cars is always an array
  const safeCars = Array.isArray(cars) ? cars : [];

  return (
    <main className="overflow-x-hidden pt-18.25">
      {/* Hero section */}
      <Hero />

      {/* Featured cars section */}
      <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h2 className="font-semibold text-4xl md:text-[40px]">
            Featured Vehicles
          </h2>
          <span className="text-sm md:text-base text-gray-500/90 max-w-156">
            Explore our selection of premium vehicles available for your next
            adventure.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
          {safeCars.slice(0, 6).map((item) => (
            <CarCard key={item?._id} item={item} />
          ))}
        </div>

        <Link to="/cars">
          <button className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer">
            Explore all cars
            <img src={assets.arrow_icon} alt="arrow_icon" />
          </button>
        </Link>
      </section>

      {/* Owner banner */}
      <section className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 md:pl-14 md:pb-10 pt-10 bg-linear-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden md:mt-20 my-10">
        <div className="text-white flex flex-col gap-2">
          <h2 className="text-3xl font-medium">Do You Own a Luxury Car?</h2>
          <p>Monetize your vehicle effortlessly by listing it on CarRental.</p>
          <p className="max-w-130">
            We take care of insurance, driver verification and secure payments —
            so you can earn passive income, stress-free.
          </p>
          <button className="px-6 py-2 bg-white text-primary rounded-lg text-sm mt-4">
            List your car
          </button>
        </div>

        <img
          src={assets.banner_car_image}
          alt="carBanner"
          className="lg:w-auto md:w-[50%]"
        />
      </section>

      {/* Reviews */}
      <section className="w-full flex flex-col items-center gap-20 mt-20 mb-20">
        <div className="text-center">
          <h3 className="font-semibold text-4xl">What Our Customers Say</h3>
          <p className="text-gray-500/90 mt-2 max-w-156">
            Discover why travelers choose CarRental worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mx-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg shadow-lg p-5 flex flex-col gap-5 hover:-translate-y-1 transition"
            >
              <img
                src={assets.testimonial_image_2}
                alt="customer"
                className="w-14"
              />
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <img key={idx} src={assets.star_icon} alt="star" />
                  ))}
              </div>
              <p className="text-gray-400 text-sm">
                "Amazing service and great cars!"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="flex flex-col gap-3 items-center min-h-90 mx-10">
        <h2 className="md:text-2xl text-xl">Never Miss a Deal!</h2>
        <p className="text-gray-500/90">
          Subscribe to get the latest offers and discounts
        </p>

        <form className="mt-5 flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="outline-none p-3 border w-full sm:w-96"
          />
          <button className="bg-primary text-white p-3 rounded-r">
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}

export default Home;
