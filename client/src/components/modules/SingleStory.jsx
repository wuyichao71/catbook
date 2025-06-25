import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
// import { BASE } from "../../utilities";
// TODO (ste12): import Card.css

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 */
const SingleStory = (props) => {
  return (
    <div className="Card-story">
      <Link to={`profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <p className="Card-storyContent">{props.content}</p>
    </div>
  );
};

export default SingleStory;
