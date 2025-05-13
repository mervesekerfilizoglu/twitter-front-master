import { createContext, useEffect, useState } from "react";
import twitData from "../data/twitData.json";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";

const TwitsContext = createContext();

export const TwitsContextProvider = ({ children }) => {
  const tweetsUrl = "http://localhost:8080/api/tweets";

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

  const addComment = async (id, comment) => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.warn("Token bulunamadı, işlem iptal edildi.");
        return;
      }
  
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
  
      const response = await axios.post(
        tweetsUrl,
        {
          tweetId: id,
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Yorum başarıyla gönderildi:", response.data);
    } catch (error) {
      console.error("Giriş hatası:", error);
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      } else if (error.request) {
        console.log("No response received");
      } else {
        console.log("Error:", error.message);
      }
    }
  };
  

  return (
    <TwitsContext.Provider value={{ twits, likeTwit, addComment }}>
      {children}
    </TwitsContext.Provider>
  );
};

export default TwitsContext;
