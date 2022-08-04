export class CSNClient {
    constructor({ cookie }: constructorType);
    public async getAudioUrl({ songURL }: getAudioUrlType): Promise<object>;
    public async search({ name, limit }: searchType): Promise<Array<searchResultType>>
}

type constructorType = {
    cookie: string,
}

type getAudioUrlType = {
    songURL: string
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