import React, { useEffect, useRef, useState } from "react";
import playlistsData from "./data/playlists.json";
import Playlist from "./components/PlayList/PlayList";
import ArtistCard from "./components/ArtistCard/ArtistCard";
import PlayCard from "./components/PlayCard/PlayCard";
import { Track } from "./components/types";
import "./MediaPlayer.css";

interface PlaylistType {
  name: string;
  artist: string;
  year: number;
  tracks: Track[];
}

const MediaPlayer = () => {
  const playlists: PlaylistType[] = playlistsData.playlists;
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistType | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = currentPlaylist?.tracks[currentTrackIndex];

  const onPlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }
  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);

    // Small delay to allow state updates
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch((err) => {
          console.error("Autoplay error:", err);
        });
      }
    }, 100); // Add small delay for React to sync
  };

  useEffect(() => {
    if (audioRef.current && isPlaying && currentTrack) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentTrackIndex, currentPlaylist, currentTrack, isPlaying]);

  return (
    <div className="media-player-container">
      <h1 className="media-player-title">🎧 Media Player</h1>
  
      {currentPlaylist ? (
        <>
          <button className="back-button" onClick={() => setCurrentPlaylist(null)}>
            ← Back to Artists
          </button>
  
          <div className="media-player-layout">
            <div className="playlist-section">
              <Playlist
                playlist={currentPlaylist}
                onTrackSelect={playTrack}
              />
            </div>
  
            {currentTrack && (
              <div className="player-section">
                <audio
                  ref={audioRef}
                  src={currentTrack.url}
                  onError={() => {
                    alert(
                      `Oops! We couldn’t play “${currentTrack.name}.” This track might be unavailable. Please try another one.`
                    );
                    setIsPlaying(false);
                  }}
                />
                <PlayCard
                  trackName={currentTrack.name}
                  isPlaying={isPlaying}
                  onPlayPause={onPlayPause}
                  onNext={() => {
                    if (!currentPlaylist) return;
                    const nextIndex =
                      (currentTrackIndex + 1) % currentPlaylist.tracks.length;
                    setCurrentTrackIndex(nextIndex);
                  }}
                  onPrev={() => {
                    if (!currentPlaylist) return;
                    const prevIndex =
                      (currentTrackIndex - 1 + currentPlaylist.tracks.length) %
                      currentPlaylist.tracks.length;
                    setCurrentTrackIndex(prevIndex);
                    setIsPlaying(true);
                  }}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="media-player-subtitle">
            Welcome! Choose an artist to explore their tracks:
          </p>
          <div className="artist-list">
            {playlists.map((playlist, index) => (
              <ArtistCard
                key={index}
                artistName={playlist.artist}
                albumName={playlist.name}
                year={playlist.year}
                isSelected={false}
                onClick={() => {
                  setCurrentPlaylist(playlist);
                  setCurrentTrackIndex(0);
                  setIsPlaying(false);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MediaPlayer;