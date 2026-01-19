import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard";
import Hero from "../components/Hero";
import { useContext } from "react";
import { BookContext } from "../context/BookContext";
function Home() {
  const { carData } = useContext(BookContext);
  return (
    <>
      <main className="overflow-x-hidden pt-18.25">
        {/* Hero section  */}
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
            {carData.slice(0, 6)?.map((item) => (
              <CarCard item={item} />
            ))}
          </div>
          <Link to="/cars">
            <button className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer">
              Explore all cars all cars
              <img src={assets.arrow_icon} alt="arrow_icon" />
            </button>
          </Link>
        </section>
        {/* reviews section */}

        <section className=" flex flex-col md:flex-row md:items-start items-center justify-between px-8 md:pl-14 md:pb-10 mb-auto pt-10 bg-linear-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden md:mt-20 my-10">
          <div className="text-white flex flex-col gap-2 items-start">
            <h2 className="text-3xl font-medium">Do You Own a Luxury Car?</h2>
            <p className="mt-2">
              Monetize your vehicle effortlessly by listing it on CarRental.
            </p>
            <p className="max-w-130">
              We take care of insurance, driver verification and secure payments
              — so you can earn passive income, stress-free.
            </p>
            <button
              className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer"
              tabIndex="0"
            >
              List your car
            </button>
          </div>
          <img
            src={assets.banner_car_image}
            alt="carBanner"
            className="lg:w-auto md:w-[50%]"
          />
        </section>

        {/* Coustomer reviews */}

        <section className="w-full h-full flex flex-col items-center justify-center gap-20 xl:mt-30 lg:mt-20 md:mt-15 mt-10 mb-20">
          <div className="flex flex-col  items-center justify-center gap-2">
            <h3 className="font-semibold text-4xl md:text-[40px] text-center">
              What Our Customers Say
            </h3>
            <span className="text-text-sm md:text-base text-gray-500/90 mt-2 max-w-156 text-center">
              Discover why discerning travelers choose StayVenture for their
              luxury accommodations around the world.
            </span>
          </div>
          <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 sm:mx-20 mx-10">
            <div className="  cursor-pointer rounded-lg shadow-lg p-5 lg:max-w-90 sm:max-w-100 w-full flex flex-col gap-5 transition-all ease-in-out duration-500 hover:-translate-y-1">
              <div className="flex gap-5 items-center">
                <img
                  src={assets.testimonial_image_2}
                  alt="coustomerImage"
                  className="max-w-14 max-h-14"
                />
                <span>
                  <h4 className="md:text-xl text-[16px]">Emma Rodriguez</h4>
                  <p className="text-sm text-gray-500/90">Barcelona, Spain</p>
                </span>
              </div>
              <span className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <img src={assets.star_icon} alt="star_icon" key={i} />
                  ))}
              </span>
              <div className="text-gray-400 text-[15px]">
                "I've rented cars from various companies, but the experience
                with CarRental was exceptional."
              </div>
            </div>
            <div className=" rounded-2xl shadow-lg p-5 lg:max-w-90 max-w-100 flex flex-col gap-5 transition-all ease-in-out duration-500 hover:-translate-y-1 cursor-pointer">
              <div className="flex gap-5 items-center">
                <img
                  src={assets.testimonial_image_1}
                  alt="coustomerImage"
                  className="max-w-14 max-h-14"
                />
                <span>
                  <h4 className="md:text-xl text-[16px]">John Smith</h4>
                  <p className="text-sm text-gray-500/90">New York, USA</p>
                </span>
              </div>
              <span className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <img src={assets.star_icon} alt="star_icon" key={i} />
                  ))}
              </span>
              <div className="text-gray-400 text-[15px]">
                "CarRental made my trip so much easier. The car was delivered
                right to my door, and the customer service was fantastic!"
              </div>
            </div>
            <div className=" rounded-2xl shadow-lg p-5 lg:max-w-90 max-w-100 flex flex-col gap-5 transition-all ease-in-out duration-500 hover:-translate-y-1 cursor-pointer">
              <div className="flex gap-5 items-center">
                <img
                  src={assets.testimonial_image_2}
                  alt="coustomerImage"
                  className="max-w-14 max-h-14"
                />
                <span>
                  <h4 className="md:text-xl text-[16px]">Ava Johnson</h4>
                  <p className="text-sm text-gray-500/90">Sydney, Australia</p>
                </span>
              </div>
              <span className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <img src={assets.star_icon} alt="star_icon" key={i} />
                  ))}
              </span>
              <div className="text-gray-400 text-[15px]">
                "I highly recommend CarRental! Their fleet is amazing, and I
                always feel like I'm getting the best deal with excellent
                service."
              </div>
            </div>
          </div>
        </section>

        {/* Never Miss a Deal! */}

        <section className="flex flex-col gap-3 items-center justify-center min-h-90 mx-10 ">
          <h2 className="md:text-2xl text-xl ">Never Miss a Deal!</h2>
          <p className="text-gray-500/90">
            Subscribe to get the latest offers, new arrivals, and exclusive
            discounts
          </p>
          <form action="" className="mt-5 flex  ">
            <input
              type="text"
              placeholder="Enter your email id"
              className="outline-none p-3 border border-gray-400/90 w-full sm:w-96 md:w-105 sm:text-[16px] text-sm"
            />
            <button
              type="submit"
              className=" transition-all ease-in-out duration-300 cursor-pointer bg-primary hover:bg-primary-dull text-white p-3 rounded-r"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Home;
