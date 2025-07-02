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
  // const [userNameValue, setUserNameValue] = useState("");
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // const handleUserNameChange = (event) => {
  //   setUserNameValue(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.onSubmit && props.onSubmit(userNameValue, value);
    props.onSubmit && props.onSubmit(value);
    setValue("");
    // setUserNameValue("");
  };
  return (
    <div className="u-flexColumn">
      {/* <div className="u-flex">
        <p className="u-bold NewPostInput-userName">User: </p>
        <input
          type="text"
          placeholder="Enter your name"
          value={userNameValue}
          onChange={handleUserNameChange}
          className="NewPostInput-userNameInput"
        />
      </div> */}
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
    </div>
  );
};

const NewStory = (props) => {
  // const addStory = (userNameValue, value) => {
  //   // const id = "id" + Math.random().toString(16).slice(2);
  //   props.addNewStory && props.addNewStory({ creator_name: userNameValue, content: value });
  // };
  const addStory = (value) => {
    // const id = "id" + Math.random().toString(16).slice(2);
    props.addNewStory && props.addNewStory({ content: value });
  };

  return <NewPostInput defaultText="What's on your mind?" onSubmit={addStory} />;
};

const NewComment = (props) => {
  const addComment = (value) => {
    // const id = "commentid" + Math.random().toString(16).slice(2);
    props.addNewComment && props.addNewComment({ content: value, parent: props.storyId });
    // post("/api/comment", { content: value, parent: props.storyId });
  };
  return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
};

const NewMessage = (props) => {
  const addMessage = (value) => {
    // console.log(props.recipient);
    props.addNewMessage && props.addNewMessage({ recipient: props.recipient, content: value });
  };
  return <NewPostInput defaultText="New Message" onSubmit={addMessage} />;
};

export { NewStory, NewComment, NewMessage };
