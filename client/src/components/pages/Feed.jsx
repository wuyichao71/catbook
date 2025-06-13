import React, { useEffect, useState } from "react";
// TODO (step1): import SingleStory
import SingleStory from "../modules/SingleStory";
import { NewStory } from "../modules/NewPostInput";
import Card from "../modules/Card";
import { get } from "../../utilities";
// TODO (step4): import NewStory
// TODO (step6): remove SingleStory import, import Card

const Feed = () => {
  // TODO (step2): define state called "stories" to hold stories
  const [stories, setStories] = useState([]);
  const [words, setWords] = useState([]);
  // TODO (step4): implement a callback function addNewStory that adds a
  // new story to the stories state

  const addNewStory = (value) => {
    setStories(stories.concat(value));
  };

  useEffect(() => {
    // TODO (step2): assign HARDCODED dummy values to the stories state
    // a story should be an object of the form:
    // {
    //   _id: "some random string of letters",
    //   creator_name: "creator name",
    //   content: "story content",
    // }
    get("/api/stories")
      .then((storiesList) => {
        storiesList.reverse();
        return storiesList;
      })
      .then((storiesList) => {
        setStories(storiesList);
      });
  }, []);

  return (
    <div>
      <NewStory addNewStory={addNewStory} />
      {stories.length !== 0 ? (
        stories.map((storyObj, idx) => (
          <Card
            key={`SingleStory_${idx}`}
            _id={storyObj._id}
            creator_name={storyObj.creator_name}
            content={storyObj.content}
          />
        ))
      ) : (
        <div>No stories!</div>
      )}
    </div>
  );
  // TODO (step1): render a SingleStory with hardcoded props
  // TODO (step2): render the raw stories data from state--use JSON.stringify(*list*)
  // TODO (step3): map the state to SingleStory components
  // TODO (step4): add in the NewStory component and pass down addStory as a prop
  // TODO (step6): use Card instead of SingleStory, passing down the same props
};

export default Feed;
