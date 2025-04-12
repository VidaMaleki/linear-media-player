import React from "react";
import { ArtistCardProps } from "../types";
import "./ArtistCard.css";

const ArtistCard: React.FC<ArtistCardProps> = ({
  artistName,
  albumName,
  year,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`artist-card ${isSelected ? "selected" : ""}`}
    >
      <p className="artist-name">{artistName}</p>
      <div>
        <p className="album-name">{albumName}</p>
        <p className="year">{year}</p>
      </div>
    </div>
  );
};

export default ArtistCard;
