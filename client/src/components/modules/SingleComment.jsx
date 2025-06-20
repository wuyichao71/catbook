import React from "react";
import { Link } from "react-router-dom";
// import { BASE } from "../../utilities";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */
const SingleComment = (props) => {
  return (
    <div className="Card-commentBody">
      {/* TODO (step7): render comment creator and content */}
      <Link to={`profile/${props.creator_name}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <span>{" | " + props.content}</span>
    </div>
  );
};

export default SingleComment;
