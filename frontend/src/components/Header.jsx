import React from "react";
// import { AiOutlineLogin, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const [darkToggle, setDarkToggle] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <div className="container sticky top-0 z-50 flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:px-10 md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
          <Link
            to="/"
            className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
          >
            <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
              supportsys
              <span className="text-indigo-600" data-primary="indigo-600">
                .
              </span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
            <Link
              to="/"
              className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
            >
              {" "}
              About
            </Link>

            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Toggle Dark Mode
              </span>
            </label>
          </nav>
        </div>

        {user ? (
          <>
            <button
              onClick={onLogout}
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-500 border-b-4 border-indigo-700 rounded hover:bg-indigo-400 hover:border-blue-500"
              data-rounded="rounded-md"
              data-primary="indigo-600"
            >
              <p className="mr-2">Logged in as {user.name} |</p>
              {/* <AiOutlineUser className="inline mr-2" /> */}
              Logout
            </button>
          </>
        ) : (
          <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <Link
              to="/login"
              className="px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-600 border-b-4 border-green-700 rounded hover:bg-green-400 hover:border-green-500"
            >
              {/* <AiOutlineLogin className="inline" /> Sign in */}
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-500 border-b-4 border-indigo-700 rounded hover:bg-indigo-400 hover:border-blue-500"
              data-rounded="rounded-md"
              data-primary="indigo-600"
            >
              {/* <AiOutlineUser className="inline mr-2" /> */}
              Sign up
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
