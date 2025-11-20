import React from "react";
import { useParams } from "react-router-dom";
import SinglePost from "./SinglePost";

const SinglePostWrapper = (props) => {
  const { postId } = useParams();
  return <SinglePost {...props} postId={postId} />;
};

export default SinglePostWrapper;
