(async() => {
    const csnjs = require("./index")
    const result = await csnjs.searchMusic({
        name: "Đế vương"
    })
    const audio = await csnjs.getAudioURL({
        songURL: result[0].music_link
    })
    console.log(audio)
})();