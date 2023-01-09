import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";
function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <>
      <BackButton url="/" />
      <h2 className="mt-5 mb-3 text-3xl font-bold tracking-tight text-center text-gray-900">
        Tickets
      </h2>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="ml-auto mr-auto text-sm text-left text-gray-500 fex dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Issue
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Status
              </th>
              <th></th>
            </tr>
          </thead>
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </table>
      </div>
    </>
  );
}

export default Tickets;
