const { CSNClient } = require("./src/index");

const client = new CSNClient({ cookie: "eyJpdiI6IlY2K2FmeVhHNlkyZ3NNZG1DVEpCOFE9PSIsInZhbHVlIjoidFFoVytEcFwvcU9rWE1BNUFka2k4Wms1RDNHYmFPOGJ4TFVDSmNXbVBPT3JaWThKYmFKNEQyU0FCMkF4NUhDUFgiLCJtYWMiOiIyNjI4NjhlY2NkMmIzY2VlMjBjNzUwNTQ5MDA3MDRjMjhiNzU4YWMxMmY1YjI2YzAyYTE3NzExMTBlNzA4ZWExIn0%3D" });

(async () => {
    // const search = await client.search({ name: "Tình Anh" });
    const links = await client.getAudioUrl({ songUrl: "https://chiasenhac.vn/nghe-album/ben-tren-tang-lau-version-2-ep-xss6m7v3qk8t2w.html" });
    // console.log(search);
    console.log(links);
})();