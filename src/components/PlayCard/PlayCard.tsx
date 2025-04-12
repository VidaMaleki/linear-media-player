import React from "react";
import "./PlayCard.css";
import { FaForward, FaBackward } from "react-icons/fa";
import { FaRegCirclePlay, FaPause } from "react-icons/fa6";
import { PlayCardProps } from "../types";

const PlayCard: React.FC<PlayCardProps> = ({
  trackName,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
}) => {
  return (
    <div className="play-card-container">
      <div>
        <p className="play-card-now-playing-label">Now Playing:</p>
        <p className="play-card-track-name">{trackName}</p>
      </div>
      <div className="play-card-controls">
        <button onClick={onPrev}>
          <FaBackward />
        </button>
        <button onClick={onPlayPause} className="play-button">
          {isPlaying ? <FaPause /> : <FaRegCirclePlay />}
        </button>
        <button onClick={onNext}>
          <FaForward />
        </button>
      </div>
    </div>
  );
};

export default PlayCard;
