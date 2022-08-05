const { CSNClient } = require("./src/index");

const client = new CSNClient({ cookie: "" });

(async () => {
    // const search = await client.search({ name: "Tình Anh" });
    const links = await client.getAudioUrl({ songUrl: "https://chiasenhac.vn/nghe-album/ben-tren-tang-lau-version-2-ep-xss6m7v3qk8t2w.html" });
    // console.log(search);
    console.log(links);
})();