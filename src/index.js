const { JSDOM } = require("jsdom");
const { request } = require("undici");

class CSNClient {
    constructor({ cookie }) {
        /**
         * @param {string} cookie Your chia_se_nhac_session cookie value.
         */
        if (cookie) {
            if (typeof cookie !== "string") throw new TypeError("InvalidCookie: Cookie must be a string.");
            this.cookie = "chia_se_nhac_session=" + cookie;
        }

        this.getAudioUrl = async function({ songUrl }) {
            /**
             * @param {songUrl} string
             */
            if (!cookie) {
                console.log("Warning: If no cookie defined, the maximum quality you can download is 128kbps.");
            }
            if (this.cookie) cookie = this.cookie;
            if (!songUrl) throw new TypeError("`songUrl` field must be defined.");
            if (typeof songUrl != "string") throw new TypeError("`songUrl` field must be a string");
            try {
                const final = {};
                const body = await request(encodeURI(songUrl), { headers: { Cookie: cookie } }).then(res => res.body.text());
                const dom = new JSDOM(body);
                const linkNList = dom.window.document.querySelectorAll('a.download_item');
                const links = Array.from(linkNList);
                links.forEach((val) => {
                    if (val.href) {
                        if (val.href.includes("/32/") && val.href.includes(".m4a")) final["32"] = val.href;
                        if (val.href.includes("/128/") && val.href.includes(".mp3")) final["128"] = val.href;
                        if (val.href.includes("/320/") && val.href.includes(".mp3")) final["320"] = val.href;
                        if (val.href.includes("/m4a/") && val.href.includes(".m4a")) final["500"] = val.href;
                        if (val.href.includes("/flac/") && val.href.includes(".flac")) final["flac"] = val.href;
                    }
                });
                return final;
            }
            catch(err) {
                throw new Error (err);
            }
        };

        this.search = async function({ name, limit = 5 }) {
            /**
             * @param {name} string
             * @param {limit} number
             */
            const final = [];
            if (!name) throw new TypeError("`name` field must be defined.");
            if (typeof name !== "string") throw new TypeError("`name` field must be string.");
            if (typeof limit !== "number") throw new TypeError("`limit` field must be number.");
            if (limit <= 0) throw new TypeError("`limit` field must be greater than 0.");
            if (limit >= 10) throw new TypeError("`limit` field must be lower than 10.");
            try {
                const { body } = await request(encodeURI(`https://chiasenhac.vn/search/real?q=${name}&type=json&rows=${limit}&view_all=true`));
                const rawData = await body.json();
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
                return final;
            }
            catch(err) {
                throw new Error(err);
            }
        };
    }
}

exports.CSNClient = CSNClient;