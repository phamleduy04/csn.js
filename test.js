const { CSNClient } = require("./src/index");

const client = new CSNClient({ cookie: "" });

(async () => {
    const search = await client.search({ name: "Tình Anh" });
    const links = await client.getAudioUrl({ songUrl: "https://chiasenhac.vn/mp3/la-phong-lam/lac-chon-hong-tran-tsv6b55tqkqhhf.html" });
    console.log(search);
    console.log(links["128"]);
})();