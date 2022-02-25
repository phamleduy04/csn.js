(async () => {
    const csnjs = require("./index");
    const result = await csnjs.searchMusic({
        name: "Đế vương",
    });
    const audio = await csnjs.getAudioURL({
        songURL: 'https://chiasenhac.vn/mp3/dinh-dung-acv/de-vuong-tsv770mtqttn8f.html',
    });
    const topCharts = await csnjs.getTopCharts();
    console.log(result);
    console.log(audio);
    console.log(topCharts);
})();