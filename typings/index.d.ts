export class CSNClient {
    constructor(options: ClientOptions);
    public getAudioUrl(songData: SongOptions): Promise<Array<AudioResponse>>;
    public search(searchData: SearchOptions): Promise<Array<SongData | VideoData | ArtistData | AlbumData>>;
    public getNextSongs(songData: SongOptions): Promise<Array<NextSongResponse>>;
    public getVideoUrl(videoData: VideoOptions): Promise<VideoResponse>;
    public getTopCharts(): Promise<TopChartResponse>;
    public getAlbum(albumData: AlbumOptions): Promise<AlbumResponse>;
    public getLyrics(songData: SongData): Promise<string>;
}

// Class declare
interface AlbumData {
    albumId: number;
    albumName: string;
    albumUrl: string;
    albumArtist: string;
    albumCover: string;
}
interface AlbumResponse {
    name: string;
    author: string;
    links: Array<AudioResponse>;
}
interface ArtistData {
    artistId: number;
    artistNickname: string;
    artistUrl: string;
    artistCover: string;
    artistAvatar: string;
}
interface AudioResponse {
    quality: "32kbps" | "128kbps" | "320kbps" | "500kbps" | "lossless";
    link: string;
}
interface NextSongResponse {
    songName: string;
    songUrl: string;
}
interface SongData {
    songId: number;
    songTitle: string;
    songUrl: string;
    songArtist: string;
    userListened: number;
    coverPicture: string;
    userDownloaded: number;
}
interface TopChartResponse {
    title: "V-POP" | "US-UK" | "C-POP" | "K-POP" | "J-POP" | "France" | "Others";
    links: Array<string>;
}
interface VideoData {
    videoId: number;
    videoTitle: string;
    videoUrl: string;
    videoArtist: string;
    userWatched: number;
    coverPicture: string;
    userDownloaded: number;
    videoLength: string;
}
interface VideoResponse {
    quality: "180p" | "360p" | "480p" | "720p" | "1080p";
    link: string;
}
// Typedef declare
interface AlbumOptions{
    albumUrl: string;
}
interface ClientOptions {
    cookie: string;
}
interface SearchOptions {
    name: string;
    limit: number | undefined | null;
    searchType: "music" | "video" | "artist" | "album" | undefined | null;
}
interface SongOptions {
    songUrl: string;
}
interface VideoOptions {
    videoUrl: string;
}