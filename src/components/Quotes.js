"use client";
import React, { useState } from "react";
import Tweet from "./Tweet";

const quotes = [
  {
    quote:
      "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    quote: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "It always seems impossible until it’s done.",
    author: "Nelson Mandela",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    quote: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    quote: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  { quote: "Happiness depends upon ourselves.", author: "Aristotle" },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
];
const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };
  return (
    <div>
      <div id="text-box">
        <p id="text">{currentQuote.quote}</p>
      </div>
      <div id="author-box">
        <p id="author">{currentQuote.author}</p>
      </div>
      <button id="new-quote" onClick={generateRandomQuote}>
        New quote
      </button>
      <Tweet quote={currentQuote.quote} author={currentQuote.author} />
    </div>
  );
};
export default Quotes;
