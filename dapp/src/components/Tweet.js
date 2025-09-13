import { useState, useEffect } from "react";

import { generateAvatarURL } from "@cfx-kit/wallet-avatar";

export default function Tweet(props) {
  const [message, setMessage] = useState("");

  async function loadTweets(page = 1) {
    try {
      const results = await getLastTweets(page);

      setTweets(results);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  useEffect(() => {
    setMessage("Please wait, tweets are loading...");
    loadTweets(1);
  }, []);

  return (
    <>
      <div className="tweet">
        <img
          src={generateAvatarURL(props.data.author)}
          className="tweet_author_logo"
          alt=""
        />
        <div>
          <div className="tweet_header">
            <div className="tweet_author_name">{props.data.username}</div>
            <div className="tweet_author_slug">@{props.data.author}</div>
          </div>
        </div>
        <div className="tweet_publish_time">
          at {new Date(Number(props.data.timestamp) * 1000).toLocaleString()}
        </div>
        <div>{props.data.text}</div>
      </div>
      ;
    </>
  );
}
