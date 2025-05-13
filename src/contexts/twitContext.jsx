import { createContext, useEffect, useState } from "react";
import twitData from "../data/twitData.json";

const TwitsContext = createContext();

export const TwitsContextProvider = ({ children }) => {
  const [twits, setTwits] = useState([]);

  useEffect(() => {
    setTwits(twitData);
  }, []);

  const likeTwit = (id) => {
    setTwits((prev) =>
      prev.map((twit) =>
        twit.id === id ? { ...twit, likes: twit.likes + 1 } : twit
      )
    );
  };

  const addComment = (id, comment) => {
    const newComment = {
      id: Date.now(),
      user: "guest",
      content: comment,
    };

    setTwits((prev) =>
      prev.map((twit) =>
        twit.id === id
          ? { ...twit, comments: [...twit.comments, newComment] }
          : twit
      )
    );
  };

  return (
    <TwitsContext.Provider value={{ twits, likeTwit, addComment }}>
      {children}
    </TwitsContext.Provider>
  );
};

export default TwitsContext;
