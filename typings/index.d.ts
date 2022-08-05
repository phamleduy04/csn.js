export class CSNClient {
    constructor({ cookie }: constructorType);
    public getAudioUrl({ songUrl }: getAudioUrlType): Promise<Array<songDownloadData>>;
    public search({ name, limit }: searchType): Promise<Array<searchResultType>>
    public getTopChart(): Promise<topChartData>
}

interface constructorType {
    cookie: string,
}

interface getAudioUrlType {
    songUrl: string
}

interface searchType {
    name: string,
    limit: number | 5
}

interface searchResultType {
    songId: number,
    songTitle: string,
    songUrl: string,
    songArtist: string,
    userListened: number,
    coverPicture: string,
    userDownloaded: number,
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