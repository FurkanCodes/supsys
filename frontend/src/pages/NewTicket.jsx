import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import { createTicket, reset } from "../features/tickets/ticketSlice";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [issue, setIssue] = useState();
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }
    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ issue, description }));
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div>
        <BackButton url="/" />
      </div>
      <section className="py-3 text-center">
        <h2 className="mt-1 font-extrabold text-gray-900 sm:text-3xl sm:tracking-tight lg:text-4xl">
          Create New Ticket
        </h2>
        <p className="pt-5 text-2xl sm:text-1xl sm:tracking-tight lg:text-4xl">
          {" "}
          Please fill out the form
        </p>
      </section>

      <section className="flex flex-col items-center justify-center mt-5 text-center ">
        <div>
          <label className="" htmlFor="name">
            Your Name
          </label>
          <input
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={name}
            disabled
          />
        </div>
        <div>
          <label className="" htmlFor="email">
            Your Email
          </label>
          <input
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={email}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <form className="flex flex-col ">
            <label
              htmlFor="issue"
              className="block pt-5 mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Issue
            </label>
            <select
              name="issue"
              id="issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value=" ">Select a topic</option>
              <option value="cirriculum">Cirriculum</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </form>
          <div>
            <label
              className="block pt-5 mb-2 text-sm font-bold text-gray-900 dark:text-white"
              htmlFor="description"
            >
              Describe the issue
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
