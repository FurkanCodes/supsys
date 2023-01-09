import axios from "axios";

const API_URL = "/api/tickets/";

// Get ticket comments
const getComments = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId + "/comments", config);

  return response.data;
};

// create  comment
const createComment = async (commentText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + ticketId + "/comments",
    { text: commentText },
    config
  );

  return response.data;
};

const commentService = {
  getComments,
  createComment,
};

export default commentService;
