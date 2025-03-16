"use client";

export default function Tweet({ quote, author }) {
  const tweetText = `"${quote}" - ${author} #quotes`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  return (
    <button id="tweet-btn">
      <a
        id="tweet-quote"
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Tweet
      </a>
    </button>
  );
}
