import React from "react";
// import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const BackButton = ({ url }) => {
  return (
    <div className="text-center lg:relative lg:right-96">
      <Link to={url}>
        <button className="inline-flex items-center px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
          {/* <IoIosArrowRoundBack className=" w-7 h-7" /> */}
          Back
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
