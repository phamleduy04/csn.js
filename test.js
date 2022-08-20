const { CSNClient } = require("./src/index");

const client = new CSNClient({ cookie: "" });

(async () => {
    const search = await client.search({ name: "Em nên dừng lại", searchType: "music" });
    const links = await client.getAudioUrl({ songUrl: "https://chiasenhac.vn/mp3/tang-duy-tan/ben-tren-tang-lau-tsv6cw6qqkv9ke.html" });
    const vidLinks = await client.getVideoUrl({ videoUrl: "https://chiasenhac.vn/hd/mom/can-phong-trong-remix-vsv6rwscqka94v.html" });
    const recommendSong = await client.getNextSong({ songUrl: "https://chiasenhac.vn/mp3/phat-huy-t4/cau-hua-chua-ven-tron-tsv7wtcsqt9fv4.html" });
    const topChart = await client.getTopChart();
    await client.getPlaylist({ playlistUrl: "https://chiasenhac.vn/nghe-album/nua-dem-ngoai-pho-xss6m5tcqk8hfv.html?playlist=1" });
    console.log(vidLinks);
    console.log(search);
    console.log(links);
    console.log(recommendSong);
    console.log(topChart);
    const lyrics = await client.getLyrics({ songUrl: "https://chiasenhac.vn/mp3/jack-j97/ngoi-sao-co-don-tsv6mt36qk8fwk.html" });
    console.log(lyrics);
    const playlist = await client.getPlaylist({ playlistUrl: "https://chiasenhac.vn/nghe-album/nguoi-tinh-mua-dong-wrc-remix-single-xss6m60vqk8kn2.html" });
    console.log(playlist);
})();