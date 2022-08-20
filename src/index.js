const { JSDOM } = require("jsdom");
const { request } = require("undici");

class CSNClient {
    constructor({ cookie }) {
        /**
         * @param {cookie} string Your chia_se_nhac_session cookie value.
         */
        if (cookie) {
            if (typeof cookie !== "string") throw new TypeError("InvalidCookie: Cookie must be a string.");
            this.cookie = "chia_se_nhac_session=" + cookie;
        }
        else this.cookie = "";
    }

    async getAudioUrl({ songUrl }) {
        /**
         * @param {songUrl} string
         */
        if (!this.cookie) {
            console.log("Warning: If no cookie defined, the maximum quality you can download is 128kbps.");
        }
        if (!songUrl) throw new TypeError("`songUrl` field must be defined.");
        if (typeof songUrl != "string") throw new TypeError("`songUrl` field must be a string");
        if (!songUrl.includes("/mp3/") && !songUrl.includes("/nghe-album/")) throw new TypeError("Please provide a valid value for `songUrl`!");
        try {
            const final = [];
            const body = await request(encodeURI(songUrl), { headers: { Cookie: this.cookie } }).then(res => res.body.text());
            const dom = new JSDOM(body);
            const linkNList = dom.window.document.querySelectorAll('a.download_item');
            const links = Array.from(linkNList);
            links.forEach((val) => {
                if (val.href) {
                    if (val.href.includes("/32/") && val.href.includes(".m4a")) final.push({ quality: "32kbps", link: val.href });
                    if (val.href.includes("/128/") && val.href.includes(".mp3")) final.push({ quality: "128kbps", link: val.href });
                    if (val.href.includes("/320/") && val.href.includes(".mp3")) final.push({ quality: "320kbps", link: val.href });
                    if (val.href.includes("/m4a/") && val.href.includes(".m4a")) final.push({ quality: "500kbps", link: val.href });
                    if (val.href.includes("/flac/") && val.href.includes(".flac")) final.push({ quality: "loseless", link: val.href });
                }
            });
            return final;
        }
        catch (err) {
            throw new Error(err);
        }
    };

    async search({ name, limit = 5, searchType = null }) {
        /**
         * @param {name} string
         * @param {limit} number
         * @param {searchType} string
         */
        const final = [];
        let type;
        if (!searchType) {
            console.log("`searchType` field is not defined. Using default: music...");
            type = "music";
        }
        if (searchType && searchType !== "music" && searchType !== "video" && searchType !== "album" && searchType !== "artist") return TypeError("Invalid value for `searchType`");
        if (!name) throw new TypeError("`name` field must be defined.");
        if (typeof name !== "string") throw new TypeError("`name` field must be string.");
        if (typeof limit !== "number") throw new TypeError("`limit` field must be number.");
        if (limit <= 0) throw new TypeError("`limit` field must be greater than 0.");
        if (limit >= 10) throw new TypeError("`limit` field must be lower than 10.");
        try {
            const { body } = await request(encodeURI(`https://chiasenhac.vn/search/real?q=${name}&type=json&rows=${limit}&view_all=true`));
            const rawData = await body.json();
            if (searchType === "music") {
                const musicData = rawData[0].music.data;
                musicData.forEach((val) => {
                    final.push({
                        songId: val.music_id,
                        songTitle: val.music_title,
                        songUrl: val.music_link,
                        songArtist: val.music_artist,
                        userListened: val.music_listen,
                        coverPicture: val.music_cover,
                        userDownloaded: val.music_downloads,
                    });
                });
            }
            if (searchType === "video") {
                const videoData = rawData[0].video.data;
                videoData.forEach((val) => {
                    final.push({
                        videoId: val.video_id,
                        videoTitle: val.video_title,
                        songUrl: val.video_link,
                        videoArtist: val.video_artist,
                        userListened: val.video_listen,
                        coverPicture: val.video_cover,
                        userDownloaded: val.video_downloads,
                        videoLength: val.video_length_html,
                    });
                });
            }
            if (searchType === "artist") {
                const artistData = rawData[0].artist.data;
                artistData.forEach((val) => {
                    final.push({
                        artistId: val.artist_id,
                        artistNickname: val.artist_nickname,
                        artistUrl: "https://chiasenhac.vn/" + val.artist_link,
                        artistCover: val.artist_cover,
                        artistAvatar: val.artist_avatar,
                    });
                });
            }
            if (searchType === "album") {
                const albumData = rawData[0].album.data;
                albumData.forEach((val) => {
                    final.push({
                        albumId: val.cover_id,
                        albumName: val.music_album,
                        albumUrl: "https://chiasenhac.vn/" + val.album_link,
                        albumArtist: val.album_artist,
                        albumCover: val.album_cover,
                    });
                });
            }
            return final;
        }
        catch (err) {
            throw new Error(err);
        }
    };

    async getNextSong({ songUrl }) {
        /**
         * @param {songUrl} string
         */

        try {
            const final = [];
            if (!songUrl) throw new TypeError("`songUrl` must be defined.");
            if (typeof songUrl !== "string") throw new TypeError("`songUrl` must be a string");
            const body = await request(encodeURI(songUrl)).then((res) => res.body.text());
            const dom = new JSDOM(body);
            const divList = Array.from(dom.window.document.querySelectorAll(".media-left"));
            divList.forEach((val) => {
                const suggestElement = val.children.item(0);
                final.push({
                    songName: suggestElement.title,
                    songUrl: suggestElement.href,
                });
            });
            return final;
        } catch (err) {
            throw new Error(err);
        }
    };

    async getVideoUrl({ videoUrl }) {
        /**
         * @param {videoUrl} string
         */
         if (!this.cookie) {
            console.log("Warning: If no cookie defined, the maximum quality you can download is 360p.");
        }
        if (!videoUrl) throw new TypeError("`videoUrl` field must be defined.");
        if (typeof videoUrl != "string") throw new TypeError("`videoUrl` field must be a string");
        if (!videoUrl.includes("/hd/")) throw new TypeError("Please provide a valid value for `videoUrl`!");
        try {
            const final = [];
            const body = await request(encodeURI(videoUrl), { headers: { Cookie: this.cookie } }).then(res => res.body.text());
            const dom = new JSDOM(body);
            const linkNList = dom.window.document.querySelectorAll('a.download_item');
            const links = Array.from(linkNList);
            links.forEach((val) => {
                if (val.href) {
                    if (val.href.includes("/32/") && val.href.includes(".mp4")) final.push({ quality: "180p", link: val.href });
                    if (val.href.includes("/128/") && val.href.includes(".mp4")) final.push({ quality: "360p", link: val.href });
                    if (val.href.includes("/320/") && val.href.includes(".mp4")) final.push({ quality: "480p", link: val.href });
                    if (val.href.includes("/m4a/") && val.href.includes(".mp4")) final.push({ quality: "720p", link: val.href });
                    if (val.href.includes("/flac/") && val.href.includes(".mp4")) final.push({ quality: "1080p", link: val.href });
                }
            });
            return final;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async getPlaylist({ playlistUrl }) {
        /**
         * @param {playlistUrl} string
         */
        if (!this.cookie) {
            console.log("Warning: If no cookie defined, the maximum quality you can download is 128kbps.");
        }
        if (!playlistUrl) throw new TypeError("`playlistUrl` field must be defined.");
        if (typeof playlistUrl != "string") throw new TypeError("`playlistUrl` field must be a string");
        if (!playlistUrl.includes("/nghe-album/")) throw new TypeError("Please provide a valid value for `playlistUrl`!");
        if (playlistUrl.includes("?playlist=")) playlistUrl = playlistUrl.substring(0, playlistUrl.lastIndexOf("?playlist="));
        try {
            const final = [];
            const body = await request(encodeURI(playlistUrl), { headers: { Cookie: this.cookie } }).then(res => res.body.text());
            const dom = new JSDOM(body);
            const linkNList = dom.window.document.querySelectorAll('.card-footer');
            const totalSongs = Array.from(linkNList).length;
            for (let i = 1; i <= totalSongs; i++) {
                const songData = {};
                const songBody = await request(encodeURI(playlistUrl + "?playlist=" + i), { headers: { Cookie: this.cookie } }).then(res => res.body.text());
                const songDom = new JSDOM(songBody);
                const songName = songDom.window.document.querySelector("title").text;
                songData["name"] = songName.substring(0, songName.lastIndexOf("-")).trim();
                songData["author"] = songName.substring(songName.lastIndexOf("-"), songName.length).replace("-", "").trim();
                const songLinks = await this.getAudioUrl({ songUrl: encodeURI(playlistUrl + "?playlist=" + i) });
                songData["links"] = songLinks;
                final.push(songData);
            }
            return final;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async getLyrics({ songUrl }) {
        /**
         * @param {songUrl} string
         */
        if (!songUrl) throw new TypeError("`songUrl` field must be defined");
        if (typeof songUrl != "string") throw new TypeError("`songUrl` field must be a string");
        if (!songUrl.includes("/mp3/") || !songUrl.includes("/nghe-album/")) throw new TypeError("Please provide a valid value for `songUrl`!");
        try {
            const body = await request(encodeURI(songUrl)).then(res => res.body.text());
            const dom = new JSDOM(body);
            const lyricsRaw = dom.window.document.getElementById("fulllyric").textContent;
            let lyrics = lyricsRaw.replaceAll("                                                                                                    ", "");
            lyrics = lyrics.replace("\n", "");
            return lyrics;
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

exports.CSNClient = CSNClient;