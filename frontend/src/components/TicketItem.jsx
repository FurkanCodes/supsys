import React from "react";
import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  return (
    <tbody>
      <tr className="border-b border-gray-200 dark:border-gray-700">
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
        >
          {new Date(ticket.createdAt).toLocaleString("tr-TR")}
        </th>
        <td className="px-6 py-4">{ticket.issue}</td>
        <td
          className={`font-bold px-6 py-4 ${
            ticket.status === "open"
              ? " text-white  bg-green-500"
              : " text-gray-100 bg-red-600"
          }`}
        >
          {ticket.status}
        </td>
        <td class="px-6 py-4 ">
          <Link
            to={`/ticket/${ticket._id}`}
            className="font-medium text-white rounded-lg  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:text-blue-500 hover:underline px-5 py-2.5 text-center mr-2 mb-2"
          >
            view
          </Link>
        </td>
      </tr>
    </tbody>
  );
}

export default TicketItem;
