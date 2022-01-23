const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { request } = require("undici");

module.exports = async function({ songURL }) {
    if (!songURL) throw ("ArgError: songURL field must be defined.");
    if (typeof songURL != "string") throw ("ArgError: songURL field must be a string");

    try {
        const { body } = await request(encodeURI(songURL), { headers: { Cookie: "XSRF-TOKEN=eyJpdiI6IkRaNE1cL2dCOEFCa0QxQ20yQUQ0ZHVnPT0iLCJ2YWx1ZSI6IlY0SW1EXC9PMm1MdkVMUGdzQnF1eEFRZ3RTaVwvK2RtTnZMS0ZpRlRYaU1PdER1azRlc0MzUEhlMFlzbFZHek1WciIsIm1hYyI6IjA4ZDk5NWMxMTIyNDlmMTQ3ZmQwOGUzZTU4NDNmYzg0ZTcxYTQ1MTY3ZjI2ODAyMDM5ZmI0NDJkZDg0ZWQ4NTkifQ%3D%3D; chia_se_nhac_session=eyJpdiI6IkxwYlZWT3J2Q2w3V0ZlQVJMU0tYVmc9PSIsInZhbHVlIjoiMCtUeGNvOExcL0dPRGtDSEtKUko4Y3lUZ29pMEtDanpudVlDV0V2bVwvdUVtVk1idUI1cXpqZ09MNSt0QTFVVTVCIiwibWFjIjoiZDA5YTJiMWQ0NTFkYmFjNjBhYTBmNmQ5OTczYTNlNWJhNzk3ZmFmZjZhMmYzZDA2NDczMGE2ODJlYjRmOTNkZSJ9" } });
        const dom = new JSDOM(await body.text());
        const linkNList = await dom.window.document.querySelectorAll('a.download_item');
        const links = Array.from(linkNList);
        if (!links[1].getAttribute("href")) return null;
        return links[1].getAttribute("href");
    }

    catch(err) {
        throw (err.message);
    }
};