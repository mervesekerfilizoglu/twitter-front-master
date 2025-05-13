import { createContext, useEffect, useState } from "react";
import twitData from "../data/twitData.json";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";

const TwitsContext = createContext();

export const TwitsContextProvider = ({ children }) => {
  const tweetsUrl = "http://localhost:8080/api/tweets";
  const [twits, setTwits] = useState([]);
  const [token] = useLocalStorage("token", null); // useLocalStorage'dan token al

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
      if (!token) {
        console.warn("Token bulunamadı, işlem iptal edildi.");
        return;
      }
  
      const newComment = {
        id: Date.now(),
        user: "frunno",
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
        `${tweetsUrl}/${id}/comments`, // Endpoint'i düzeltiyoruz
        { content: comment }, // Sadece yorum içeriğini gönderiyoruz
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" // Content-Type ekliyoruz
          }
        }
      );
  
      console.log("Yorum başarıyla gönderildi:", response.data);
    } catch (error) {
      console.error("Yorum ekleme hatası:", error);
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        
        // 401 hatasında kullanıcıyı login sayfasına yönlendir
        if (error.response.status === 401) {
          //window.location.href = "/login";
          console.log("401 hatası aldın");
        }
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