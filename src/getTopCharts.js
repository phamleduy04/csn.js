const endPointURL = 'https://chiasenhac.vn/nhac-hot.html';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { request } = require("undici");
const dict = {
    '#cat-3-music': 'Bảng xếp hạng Việt Nam',
    '#cat-4-music': 'Bảng xếp hạng US-UK',
    '#cat-5-music': 'Bảng xếp hạng Nhạc Hoa',
    '#cat-6-music': 'Bảng xếp hạng Nhạc Hàn',
    '#cat-7-music': 'Bảng xếp hạng Nhạc Nhật',
    '#cat-8-music': 'Bảng xếp hạng Nhạc Pháp',
    '#cat-9-music': 'Bảng xếp hạng Nước khác',
};

const mapRows = (el) => {
    const obj = {};
    obj.cover = el.querySelector('div > a > img').getAttribute('src');
    obj.name = el.querySelector('div > a > img').getAttribute('alt');
    obj.author = Array.from(el.querySelectorAll('div.author > a')).map(e => e.textContent).join(', ');
    obj.songURL = el.querySelector('div > ul > li > a').getAttribute('href');
    return obj;
};

const getTopChart = async (dom, key) => {
    const linkNList = await dom.window.document.querySelectorAll(`${key} > ul > li`);
    const links = Array.from(linkNList).map(mapRows);
    return links;
};

module.exports = async () => {
    try {
        const { body } = await request(endPointURL);
        const dom = new JSDOM(await body.text());
        const result = [];
        const keys = Object.keys(dict);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const links = await getTopChart(dom, key);
            result.push({
                title: dict[key],
                links,
            });
        }
        return result;
    }
    catch (err) {
        throw (err);
    }
};
