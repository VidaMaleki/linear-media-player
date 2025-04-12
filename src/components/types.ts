export interface ArtistCardProps {
    artistName: string;
    albumName: string;
    year: number;
    isSelected: boolean;
    onClick: () => void;
}