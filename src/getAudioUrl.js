const jsdom = require("jsdom")
const { JSDOM } = jsdom
const axios = require("axios")

exports.getAudioURL = async function(data) {
    if (!data.songURL) throw ("ArgError: songURL field must be defined.")
    if (data.songURL && typeof data.songURL != "string") throw ("ArgError: songURL field must be a string")
    return new Promise((res, rej) => {
        axios({
            url: encodeURI(data.songURL)
        }).then(async resp => {
            const dom = new JSDOM(`${resp.data}`)
            const linkNList = await dom.window.document.querySelectorAll('a.download_item')
            const links = Array.from(linkNList)
            if (!links[1].getAttribute("href")) return res(undefined)
            return res(links[1].getAttribute("href"))
        })
    })
}