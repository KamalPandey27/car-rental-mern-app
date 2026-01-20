import React from "react";
import { assets } from "../../assets/assets";
function OwnerDashboard() {
  return (
    <section className=" flex flex-col gap-5 w-full">
      <div>
        <h1 className="sm:text-3xl text-2xl font-medium mb-2">
          Admin Dashboard
        </h1>
        <div className="text-gray-500/90 max-w-150">
          Monitor overall platform performance including total cars, bookings,
          revenue, and recent activities
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-4">
        <div className="flex items-center justify-between p-5 h-20  border border-gray-400/90 rounded-lg ">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500/90 text-sm">Total Cars</p>
            <span className="font-semibold">0</span>
          </div>
          <div className="bg-primary/10 rounded-full  p-3  flex justify-center items-center">
            <img src={assets.carIconColored} alt="carIcon" />
          </div>
        </div>

        <div className="flex items-center  justify-between p-5  h-20  border border-gray-400/90 rounded-lg ">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500/90 text-sm">Total Bookings</p>
            <span className="font-semibold">0</span>
          </div>
          <div className="bg-primary/10 rounded-full  p-3  flex justify-center items-center">
            <img src={assets.listIconColored} alt="carIcon" />
          </div>
        </div>

        <div className="flex items-center  justify-between p-5  h-20  border border-gray-400/90 rounded-lg ">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500/90 text-sm">Pending</p>
            <span className="font-semibold">0</span>
          </div>
          <div className="bg-primary/10 rounded-full  p-3  flex justify-center items-center">
            <img src={assets.cautionIconColored} alt="carIcon" className="" />
          </div>
        </div>

        <div className="flex items-center  justify-between p-5  h-20  border border-gray-400/90 rounded-lg ">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500/90 text-sm">Confirmed</p>
            <span className="font-semibold">0</span>
          </div>
          <div className="bg-primary/10 rounded-full p-3 flex justify-center items-center">
            <img src={assets.listIconColored} alt="carIcon" />
          </div>
        </div>
      </div>
      <div className="flex justify-between lg:flex-row flex-col mt-4 gap-5">
        <div className="border border-gray-400/90 rounded-lg p-3 w-130 h-25 flex justify-center flex-col">
          <div className="text-xl font-medium">Recent Bookings</div>
          <div className="text-gray-500/90">Latest customer bookings</div>
        </div>
        <div className="border border-gray-400/90 rounded-lg p-5 flex flex-col gap-4 w-80">
          <div>
            <div className="text-xl font-medium">Monthly Revenue</div>
            <div className="text-gray-500/90">Revenue for current month</div>
          </div>
          <div className="text-3xl font-semibold text-primary">$0</div>
        </div>
      </div>
    </section>
  );
}

export default OwnerDashboard;
