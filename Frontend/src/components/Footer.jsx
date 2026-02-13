import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <footer className=" lg:[w-85%] md:w-[90%] sm:w-[90%] w-full  sm:px-0 px-5 m-auto flex flex-col items-center justify-center  overflow-x-hidden">
        <div className="w-full flex items-center justify-between sm:flex-row flex-col gap-10 py-8  border-borderColor border-b">
          <div className="flex flex-col gap-6 sm:w-[25%] w-full">
            <img src={assets.logo} alt="logo" className="w-40" />
            <div className=" text-sm text-gray-500/90">
              Premium car rental service with a wide selection of luxury and
              everyday vehicles for all your driving needs.
            </div>
            <div className="flex gap-2">
              <Link to="/">
                <img src={assets.facebook_logo} alt="facebook_logo" />
              </Link>
              <Link to="/">
                <img src={assets.instagram_logo} alt="instagram_logo" />
              </Link>
              <Link to="/">
                <img src={assets.gmail_logo} alt="gmail_logo" />
              </Link>
              <Link to="/">
                <img src={assets.twitter_logo} alt="twitter_logo" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:gap-20 md:gap-10  sm:w-auto w-full ">
            <div className="flex flex-col gap-3 text-sm text-gray-500/90 ">
              <span className="mb-3 text-lg text-black">Quick Links</span>
              <Link to="/">Home</Link>
              <Link to="/cars">Browse Cars</Link>
              <Link to="/">List Your Car</Link>
              <Link to="/">About Us</Link>
            </div>
            <div className="flex flex-col gap-3 text-sm text-gray-500/90">
              {" "}
              <span className="mb-3 text-lg text-black">Resources</span>
              <Link to="/">Help Center</Link>
              <Link to="/">Terms of Service</Link>
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Insurance</Link>
            </div>
            <div className="flex flex-col gap-3 text-sm text-gray-500/90">
              <span className="mb-3 text-lg text-black">Contact</span>
              <Link to="/">1234 Luxury Drive</Link>
              <Link to="/">DLF Cyber City</Link>
              <Link to="/">Gurgaon, Haryana 122002</Link>
              <Link to="/">+91 8059159927</Link>
              <Link to="/">info@carrental.com</Link>
            </div>
          </div>
        </div>

        <div className="my-5 w-full flex items-center justify-between text-gray-500 sm:text-[15px] text-[12px]">
          <span>© {new Date().getFullYear()} Brand. All rights reserved.</span>
          <div className="flex gap-3">
            <span>Privacy</span>
            <span>|</span>
            <span> Terms</span>
            <span> |</span>
            <span> Cookies</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
