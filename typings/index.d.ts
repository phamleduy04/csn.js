export class CSNClient {
    constructor({ cookie }: constructorType);
    public async getAudioUrl({ songUrl }: getAudioUrlType): Promise<Array<songDownloadData>>;
    public async search({ name, limit, searchType }: searchType): Promise<Array<any>>
    public async getTopChart(): Promise<topChartData>
    public async getLyrics(): Promise<string>
    public async getNextSong(): Promise<Array<nextSongType>>
    public async getPlaylist(): Promise<string>
}

interface nextSongType {
    songName: string;
    songUrl: string;
}

interface constructorType {
    cookie: string,
}

interface getAudioUrlType {
    songUrl: string
}

interface searchType {
    name: string,
    limit: number | 5,
    searchType: "music" | "video" | "artist" | "album"
}

interface songDownloadData {
    quality: string,
    link: string,
}

interface topChartSongData {
    cover: string,
    name: string,
    author: string,
    songUrl: string
}

interface topChartData {
    type: "V-POP" | "US-UK" | "C-POP" | "K-POP" | "J-POP" | "France" | "Others",
    data: Array<topChartSongData>,
}