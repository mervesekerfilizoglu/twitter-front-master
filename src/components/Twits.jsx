import React, { useContext, useState } from "react";
import TwitsContext from "../contexts/twitContext"

export default function Twits() {
  const { twits, likeTwit, addComment } = useContext(TwitsContext);
  const [commentInputs, setCommentInputs] = useState({});

  const handleInputChange = (twitId, value) => {
    setCommentInputs((prev) => ({ ...prev, [twitId]: value }));
  };

  const handleSubmit = (twitId) => {
    const comment = commentInputs[twitId]?.trim();
    if (comment) {
      addComment(twitId, comment);
      setCommentInputs((prev) => ({ ...prev, [twitId]: "" }));
    }
  };

  return (
    <div>
      {twits.map((twit) => (
        <div
          key={twit.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "1rem",
            padding: "1rem",
          }}
        >
          <div>
            <strong>{twit.user.name}</strong> @{twit.user.username}
          </div>
          <p>{twit.content}</p>
          <button onClick={() => likeTwit(twit.id)}>❤️ {twit.likes}</button>

          <div>
            <h4>Yorumlar</h4>
            <ul>
              {twit.comments.map((c) => (
                <li key={c.id}>
                  <strong>{c.user}</strong>: {c.content}
                </li>
              ))}
            </ul>
            <input
              value={commentInputs[twit.id] || ""}
              onChange={(e) => handleInputChange(twit.id, e.target.value)}
              placeholder="Yorum yaz..."
            />
            <button onClick={() => handleSubmit(twit.id)}>Gönder</button>
          </div>
        </div>
      ))}
    </div>
  );
}
