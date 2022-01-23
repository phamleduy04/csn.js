const endpoints = require("./endpoint.json");
const { request } = require('undici');

module.exports = async function({ name, limit = 5 }) {
    if (!name) throw ("ArgError: name field is required.");
    if (typeof name != "string") throw ("songName field must be a string.");
    if (limit && limit <= 0) throw ("ArgError: limit field must greater than 0.");
    if (limit && limit >= 10) throw ("ArgError: limit field must lower than 10.");
    try {
        if (limit && 0 < limit < 10) limit = parseInt(limit);
        const { body } = await request(encodeURI(`${endpoints.csnEndpoint}&rows=${limit}&view_all=true&q=${name}`));
        const musicData = await body.json();
        return musicData[0].music.data;
    }
    catch(err) {
        throw (err.message);
    }
}