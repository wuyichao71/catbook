import React, { useEffect, useState } from "react";
// TODO (step6): import useState from react
// TODO (step6): import SingleStory
// TODO (step7): import SingleComment
// TODO (step8): import NewComment
// TODO (step9): import CommentsBlock

import "./Card.css";
import SingleStory from "./SingleStory";
// import SingleComment from "./SingleComment";
// import { NewComment } from "./NewPostInput";
import CommentsBlock from "./CommentsBlock";
import { get, post } from "../../utilities";
/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
const Card = (props) => {
  const [comments, setComments] = useState([]);
  // TODO (step6): define a state called "comments" to hold comments (refer to Feed)

  // TODO (step8): implement a callback function addNewComment that adds a
  // new comment to the comments state
  const addNewComment = (value) => {
    // post("/api/comment", { content: value, parent: props._id });
    setComments(comments.concat(value));
  };

  useEffect(() => {
    // TODO (step6): assign HARDCODED dummy values to the comments state
    // a comment should be an object of the form:
    // {
    //   _id: "some random string of letters",
    //   creator_name: "creator name",
    //   parent: "parent story id",
    //   content: "story content",
    // }
    get("/api/comment", { parent: props._id }).then((commentsList) => {
      setComments(commentsList);
    });
  }, []);

  return (
    <div className="Card-container">
      <SingleStory _id={props._id} creator_name={props.creator_name} content={props.content} />
      <CommentsBlock story={props} comments={comments} addNewComment={addNewComment} />
    </div>
  );

  // TODO (step6): render a SingleStory using props,
  // and render the comments from state (with JSON.stringify)
  // TODO (step7): map comments from state into SingleComment
  // components (refer to Feed)
  // TODO (step8): add in the NewComment component (refer to Feed)
  // TODO (step9): use CommentsBlock
};

export default Card;
