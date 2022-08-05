const { JSDOM } = require("jsdom");
const { request } = require("undici");

class CSNClient {
    constructor({ cookie }) {
        const dict = {
            '#cat-3-music': 'V-POP',
            '#cat-4-music': 'US-UK',
            '#cat-5-music': 'C-POP',
            '#cat-6-music': 'K-POP',
            '#cat-7-music': 'J-POP',
            '#cat-8-music': 'France',
            '#cat-9-music': 'Others',
        };

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
                const final = [];
                const body = await request(encodeURI(songUrl), { headers: { Cookie: cookie } }).then(res => res.body.text());
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

        this.getRecommendSong = async function({ songUrl }) {
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
            } catch(err) {
                throw new Error(err);
            }
        };

        const mapRows = (el) => {
            const obj = {};
            obj.cover = el.querySelector('div > a > img').getAttribute('src');
            obj.name = el.querySelector('div > a > img').getAttribute('alt');
            obj.author = Array.from(el.querySelectorAll('div.author > a')).map(e => e.textContent).join(', ');
            obj.songUrl = el.querySelector('div > ul > li > a').getAttribute('href');
            return obj;
        };

        const getChart = async (dom, key) => {
            const linkNList = await dom.window.document.querySelectorAll(`${key} > ul > li`);
            const links = Array.from(linkNList).map(mapRows);
            return links;
        };

        this.getTopChart = async function() {
            try {
                const { body } = await request("https://chiasenhac.vn/nhac-hot.html");
                const dom = new JSDOM(await body.text());
                const result = [];
                const keys = Object.keys(dict);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const links = await getChart(dom, key);
                    result.push({
                        type: dict[key],
                        data: links,
                    });
                }
                return result;
            }
            catch (err) {
                throw (err);
            }
        };
    }
}

exports.CSNClient = CSNClient;