import React from "react";
import { useSelector } from "react-redux";

function CommentItem({ comment }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div
      style={{
        backgroundColor: comment.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: comment.isStaff ? "#fff" : "#000",
      }}
    >
      <h4>
        from {comment.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <div className=" flex-col space-y-4 mt-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <p>{comment.text}</p>
        <div>{new Date(comment.createdAt).toLocaleString("tr-TR")}</div>
      </div>
    </div>
  );
}

export default CommentItem;
