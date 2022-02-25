const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { request } = require("undici");
const defaultCookie = "SRF-TOKEN=eyJpdiI6Ilwvd21YcWg5QzduOGtoVlZvdCtZaXJ3PT0iLCJ2YWx1ZSI6IjFneFFyXC9DVGVESXF4eDFCTmsyNFdUNUwwY2NRZlwvMzJvbHAzOW1YUlRnVUZVMGVISk9DV3ZIekJFUG13V3hOZiIsIm1hYyI6IjE5ZTlkYTgzYmRhNTU1NzkxYzFiMmQzYzhhMTAwY2ZlYmQwNjk5YzY0NThjYzExNjliMDZjYjUwNTI0MWU4NmMifQ%3D%3D; chia_se_nhac_session=eyJpdiI6Ikp6bTE5T3dMVGRBbHJSdElQOE5aaEE9PSIsInZhbHVlIjoiQzFzcCs2cE5jQm4zRzZkYVBhMUpjKzNIa0owWVNaS0Fodm45UFdTNnpYYUluVGxUN3VOcFFqWUlBeGR5TnR5YyIsIm1hYyI6IjhhZDM4MTVjYTk3YTk1Y2Q5N2NjNGQyZmNiOTAwNmYyMzgxYWZkYjI0ZGIwMGNkZjdmYzIwOTVkY2ZkOTk2MGQifQ%3D%3D";

module.exports = async function({ songURL, cookie = defaultCookie }) {
    if (!songURL) throw ("ArgError: songURL field must be defined.");
    if (typeof songURL != "string") throw ("ArgError: songURL field must be a string");
    try {
        const body = await request(encodeURI(songURL), { headers: { Cookie: cookie } }).then(res => res.body.text());
        const dom = new JSDOM(body);
        const linkNList = await dom.window.document.querySelectorAll('a.download_item');
        const links = Array.from(linkNList);
        if (!links[1].getAttribute("href")) return null;
        return links[1].getAttribute("href");
    }

    catch(err) {
        throw (err);
    }
};