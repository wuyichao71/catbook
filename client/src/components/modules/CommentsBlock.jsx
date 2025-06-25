import React from "react";
import SingleComment from "./SingleComment";
import { NewComment } from "./NewPostInput";
import { UserContext } from "./CreateContext";
import { useContext } from "react";
// import "./Card.css";
// TODO (step9): import SingleComment and NewComment

/**
 * @typedef ContentObject
 * @property {string} _id of story/comment
 * @property {string} creator_name
 * @property {string} content of the story/comment
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 * @param {ContentObject[]} comments
 * @param {ContentObject} story
 */
const CommentsBlock = (props) => {
  const userId = useContext(UserContext);
  return (
    <div className="Card-commentSection">
      <div className="story-comments">
        {props.comments.map((comment, idx) => (
          <SingleComment
            key={comment._id}
            _id={comment._id}
            creator_name={comment.creator_name}
            content={comment.content}
          />
        ))}
        {userId ? (
          <NewComment storyId={props.story._id} addNewComment={props.addNewComment} />
        ) : null}
      </div>
    </div>
  );
};

export default CommentsBlock;
