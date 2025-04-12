export interface ArtistCardProps {
  artistName: string;
  albumName: string;
  year: number;
  isSelected: boolean;
  onClick: () => void;
}

export interface Track {
  name: string;
  url: string;
  duration: number;
}

export interface PlaylistProps {
  playlist: {
    name: string;
    artist: string;
    year: number;
    tracks: Track[];
  };
  onBack: () => void;
  onTrackSelect: (index: number) => void;
}
