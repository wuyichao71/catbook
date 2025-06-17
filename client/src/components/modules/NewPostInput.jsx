import { useState } from "react";
import "./NewPostInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewPostInput = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };
  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <button className="NewPostInput-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const NewStory = (props) => {
  const addStory = (value) => {
    const id = "id" + Math.random().toString(16).slice(2);
    props.addNewStory &&
      props.addNewStory({ _id: id, creator_name: "Anonymous User", content: value });
  };

  return <NewPostInput defaultText="What's on your mind?" onSubmit={addStory} />;
};

const NewComment = (props) => {
  const addComment = (value) => {
    const id = "commentid" + Math.random().toString(16).slice(2);
    props.addNewComment &&
      props.addNewComment({
        _id: id,
        creator_name: "Anonymous User",
        content: value,
        parent: props.storyId,
      });
    // post("/api/comment", { content: value, parent: props.storyId });
  };
  return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
};

export { NewStory, NewComment };
