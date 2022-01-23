const axios = require("axios")
const endpoints = require("./endpoint.json")

exports.searchMusic = async function(data) {
    if (!data || !data.name) throw ("ArgError: name field is required.")
    if (typeof data.name != "string") throw ("songName field must be a string.")
    if (data.limit && data.limit <= 0) throw ("ArgError: limit field must greater than 0.")
    if (data.limit && data.limit >= 10) throw ("ArgError: limit field must lower than 6.")
    return new Promise((res, rej) => {
        let limit
        if (!data.limit) limit = 5
        if (data.limit && 0 < data.limit < 10) limit = parseInt(data.limit)
        axios({
            url: encodeURI(`${endpoints.csnEndpoint}&rows=${limit}&view_all=true&q=${data.name}`)
        }).then(resp => {
            return res(resp.data[0].music.data)
        })
    })
}