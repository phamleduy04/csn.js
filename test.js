const { CSNClient } = require("./src/index");

const client = new CSNClient({ cookie: "" });

(async () => {
    // Test search function
    const search = await client.search({ name: "Tình anh" });
    console.log(search);
    // Test get audio link function
    const audioLinks = await client.getAudioUrl({ songUrl: "https://chiasenhac.vn/mp3/dinh-dung-acv/tinh-anh-tsvwsm76q948tk.html" });
    console.log(audioLinks);
    // Test get next song function
    const nextSongs = await client.getNextSongs({ songUrl: "https://chiasenhac.vn/mp3/dinh-dung-acv/tinh-anh-tsvwsm76q948tk.html" });
    console.log(nextSongs);
    // Test get video link function
    const videoLinks = await client.getVideoUrl({ videoUrl: "https://chiasenhac.vn/hd/dinh-dung/tinh-anh-vsvm3cdmq8wvm8.html" });
    console.log(videoLinks);
    // Test get top charts function
    const topCharts = await client.getTopCharts();
    console.log(topCharts);
    // Test get playlist function
    const albumLinks = await client.getAlbum({ albumUrl: "https://chiasenhac.vn/nghe-album/tinh-anh-single-xss6drswqkma49.html" });
    console.log(albumLinks);
    // Test get lyrics function
    const songLyrics = await client.getLyrics({ songUrl: "https://chiasenhac.vn/mp3/dinh-dung-acv/tinh-anh-tsvwsm76q948tk.html" });
    console.log(songLyrics);
    // Test done
    console.log("Test process is done.");
})();