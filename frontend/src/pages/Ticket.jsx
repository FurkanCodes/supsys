import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import {
  getComments,
  reset,
  createComment,
} from "../features/comments/commentsSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
import CommentItem from "../components/CommentItem";
import Modal from "react-modal";
// import { AiFillCloseCircle, AiOutlineComment, TiTick } from "react-icons/all";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  Modal.setAppElement("#root");

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { comments, isLoading: commentsIsLoading } = useSelector(
    (state) => state.comments
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getComments(ticketId));
  }, [isError, message, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("ticket closed");
    navigate("/tickets");
  };
  const onCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ commentText, ticketId }));
    console.log("Submit");
    closeModal();
  };
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  if (isLoading || commentsIsLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <h3>Something wrong</h3>;
  }

  return (
    <div className="container w-2/4 ml-auto mr-auto">
      <header>
        <BackButton url="/tickets" />
        <div className="flow-root">
          <h2 className="float-left mt-4 font-bold">Ticket ID: {ticket._id}</h2>

          <span
            className={`float-right font-bold px-6 py-4 ${
              ticket.status === "open"
                ? " text-white  bg-green-500"
                : " text-gray-100 bg-red-600"
            }`}
          >
            {ticket.status}
          </span>
        </div>
        <div className="container">
          <div>
            <h3 className="font-bold text-1xl">
              Date Submitted:{" "}
              {new Date(ticket.createdAt).toLocaleString("tr-TR")}
            </h3>
          </div>
          <hr />

          <div className="mt-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <h3 className="mb-5 text-2xl font-bold">
              Description of the issue
            </h3>
            <p>{ticket.description}</p>
          </div>
        </div>
      </header>

      <div>
        {ticket.status === "open" ? (
          <button
            className="w-full px-4 py-2 my-4 font-bold text-white bg-red-500 border-b-4 border-red-700 rounded hover:bg-red-400 hover:border-red-500"
            onClick={onTicketClose}
          >
            {/* <AiFillCloseCircle className="inline mr-2" /> */}
            close ticket
          </button>
        ) : (
          <button
            disabled
            className="w-full px-4 py-2 my-4 font-bold text-white bg-red-500 border-b-4 border-red-700 rounded cursor-not-allowed"
            onClick={onTicketClose}
          >
            <h2>ticket already closed</h2>
          </button>
        )}
        {ticket.status !== "closed" && (
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500"
            onClick={openModal}
          >
            {/* <AiOutlineComment className="inline mr-2" /> */}
            add comment{" "}
          </button>
        )}
        <Modal
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="add comment"
        >
          <div className="flow-root">
            <h2 className="float-left mt-2 font-bold">Add Comment</h2>
            <button
              className="float-right px-4 py-2 mb-4 font-bold text-white bg-red-500 border-b-4 border-red-700 rounded hover:bg-red-400 hover:border-red-500"
              onClick={closeModal}
            >
              {" "}
              {/* <AiFillCloseCircle className="inline " /> */}
            </button>
          </div>

          <form onSubmit={onCommentSubmit}>
            <div>
              <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="commentText"
                id="commentText"
                placeholder="comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
            <div className="flow-root">
              <button
                className="float-right px-4 py-2 mt-4 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500"
                type="submit"
              >
                {/* <TiTick className="inline" /> */}
              </button>
            </div>
          </form>
        </Modal>
        <h2 className="mt-8 text-3xl font-bold">Comments</h2>

        {comments.length <= 0 && <h2>no comments</h2>}
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default Ticket;
