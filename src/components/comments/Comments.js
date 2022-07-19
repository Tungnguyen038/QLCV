import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import axios from "axios";
import { BASE_URL } from "../../util/constants";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

import "./Comment.scss";

const Comments = ({ commentURL, IdIssueComment }) => {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const user = useSelector((state) => state.auth.login.currentUser);
  const id_User = user?.id;
  const id_Issue = IdIssueComment;
  const loadComment = async () => {
    await axios
      .get(`${BASE_URL}/api/Comments/issue/${id_Issue}`)
      .then((res) => {
        const testData = res.data.reverse();
        setComments(testData);
      })
      .catch((err) => console.log(err));
  };

  const connection = new HubConnectionBuilder()
    .withUrl(commentURL)
    .configureLogging(LogLevel.Information)
    .build();
  useEffect(() => {
    loadComment();
    connection
      .start()
      .then((res) => {
        connection.on("Comment", () => {
          loadComment();
        });
      })
      .catch((e) => console.log("Connecttion faild", e));
  }, []);
  const addComment = async (content, id_ParentComment) => {
    await axios
      .post(`${BASE_URL}/api/Comments`, {
        content,
        id_User,
        id_Issue,
        id_ParentComment,
      })
      .then((cmt) => {
        // setComments([cmt, ...comments]);
        setActiveComment(null);
      });
  };
  const deleteComment = async (commentId) => {
    if (window.confirm("Are you sure that you want to remove comment")) {
      await axios
        .delete(`${BASE_URL}/api/Comments/${commentId}`, {
          data: { id_User: id_User },
        })
        .then(() => {
          // loadComment();
        });
    }
  };

  const updateComment = async (text, commentId) => {
    await axios
      .put(`${BASE_URL}/api/Comments/${commentId}`, {
        id_User: id_User,
        content: text,
      })
      .then(() => {
        console.log("success");
        loadComment();
        setActiveComment(null);
      });
  };

  return (
    <div className="w-full mt-6 h-[650px] border border-1 overflow-x-hidden overflow-y-hidden rounded-lg border-blue-500 p-3 my-auto  ">
      <div className="w-full mx-auto comments">
        <h3 className="text-blue-600 select-none comments-title">Comments</h3>
        <CommentForm submitLabel="Write" handleSubmit={addComment} />
        <div className="comments-container pb-[120px] have-y-scroll overflow-y-auto h-[500px] border-t-2 border-slate-300">
          {comments.length > 0 &&
            comments.map((item) => (
              <Comment
                key={v4()}
                comment={item}
                addComment={addComment}
                currentUserId={id_User}
                deleteComment={deleteComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
                loadComment={loadComment}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
