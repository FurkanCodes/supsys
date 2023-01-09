import React from "react";

import { FaTicketAlt, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
function Home() {
  return (
    <>
      <section className="flex flex-col h-auto min-h-screen bg-white">
        <div className="px-10 py-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 lg:text-center ">
          <p className="mt-1 font-extrabold text-gray-900 sm:text-3xl sm:tracking-tight lg:text-4xl">
            What do you need help with?
          </p>
          <p className="mt-5 mb-10 font-sans text-gray-900 sm:text-3xl sm:tracking-tight lg:text-2xl">
            Please choose an option from below
          </p>
          <div className="flex flex-col items-stretch h-screen gap-1">
            <Link to="/new-ticket">
              {" "}
              <button className="w-2/4 px-4 py-2 mt-4 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500">
                <FaQuestionCircle className="inline mr-2 " />
                Submit a Ticket
              </button>
            </Link>
            <Link to="/tickets">
              {" "}
              <button className="w-2/4 px-4 py-2 mt-4 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500">
                <FaTicketAlt className="inline mr-2" />
                View your Tickets
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
