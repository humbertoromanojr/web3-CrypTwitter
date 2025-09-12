"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { addTweet } from "@/services/Web3Service";

export default function NewTweet() {
  const { push } = useRouter();

  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

  function handlePublishTweet() {
    setMessage("Sending your Tweet to the Blockchain...please wait...");

    addTweet(text)
      .then((result) => {
        setMessage(
          "Tweet sent to the Blockchain. Please wait a minute for it to load on the screen."
        );
        setText("");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  }

  useEffect(() => {
    setMessage("Please create or install your Metamask wallet.");
    const wallet = localStorage.getItem("walletAddress");
    if (!wallet) {
      push("/");
    }
  }, []);

  return (
    <>
      <div className="top">
        <div className="left">
          <img src="/twitter-logo-2.svg" alt="" className="brand" />
        </div>
        <h1>You are very welcome</h1>
        <p>What is happening?</p>
        <textarea
          className="form-control my-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div>
          <input
            type="button"
            className="btn btn-primary"
            value="Tweet"
            onClick={handlePublishTweet}
          />
          {message ? (
            <span className="alert alert-success mt-5 opacity-75">
              {message}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}
