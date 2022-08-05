export class CSNClient {
    constructor({ cookie }: constructorType);
    public getAudioUrl({ songUrl }: getAudioUrlType): Promise<Array<songDownloadData>>;
    public search({ name, limit }: searchType): Promise<Array<searchResultType>>
    public getTopChart(): Promise<topChartData>
}

type constructorType = {
    cookie: string,
}

type getAudioUrlType = {
    songUrl: string
}

type searchType = {
    name: string,
    limit: number | 5
}

type searchResultType = {
    songId: number,
    songTitle: string,
    songUrl: string,
    songArtist: string,
    userListened: number,
    coverPicture: string,
    userDownloaded: number,
}

type songDownloadData = {
    quality: string,
    link: string,
}

type topChartSongData = {
    cover: string,
    name: string,
    author: string,
    songUrl: string
}

type topChartData = {
    type: "V-POP" | "US-UK" | "C-POP" | "K-POP" | "J-POP" | "France" | "Others",
    data: Array<topChartSongData>,
}