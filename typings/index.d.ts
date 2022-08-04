export class CSNClient {
    constructor({ cookie }: constructorType);
    public getAudioUrl({ songUrl }: getAudioUrlType): Promise<object>;
    public search({ name, limit }: searchType): Promise<Array<searchResultType>>
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