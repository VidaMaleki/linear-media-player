import React from "react";
import { PlaylistProps } from "../types";

const Playlist: React.FC<PlaylistProps> = ({ playlist, onTrackSelect }) => {
  return (
    <div>
      <h2>{playlist.name}</h2>
      <h4>
        {playlist.artist} • {playlist.year}
      </h4>
      <ul style={{ paddingLeft: 0 }}>
        {playlist.tracks.map((track, index) => (
          <li
            key={index}
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
            onClick={() => onTrackSelect(index)}
          >
            🎵 {track.name} ({Math.floor(track.duration / 60)}:
            {String(track.duration % 60).padStart(2, "0")})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;