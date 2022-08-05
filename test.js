const { CSNClient } = require("./src/index");

const client = new CSNClient({ cookie: "" });

(async () => {
    const search = await client.search({ name: "Tình Anh" });
    const links = await client.getAudioUrl({ songUrl: "https://chiasenhac.vn/nghe-album/em-nen-dung-lai-remix-version-single-xss6mr36qk8awk.html" });
    const recommendSong = await client.getRecommendSong({ songUrl: "https://chiasenhac.vn/mp3/phat-huy-t4/cau-hua-chua-ven-tron-tsv7wtcsqt9fv4.html" });
    const topChart = await client.getTopChart();
    console.log(search);
    console.log(links);
    console.log(recommendSong);
    console.log(topChart);
})();