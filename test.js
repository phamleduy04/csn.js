const { CSNClient } = require("./src/index");

const client = new CSNClient({ cookie: "eyJpdiI6Ik9kNHV6UVFFdjcreGpkdms0N1ZGdlE9PSIsInZhbHVlIjoiTTR2RE9Ja3ZzUzZudk1cL2x5VUVPdDBrZkR2YWwwZVVYMWNjVnNnVEJZbVdZUU9Zc3RqaDJjY3ZjWGR4MEhldlYiLCJtYWMiOiJkYjk4Y2M2YThiMTEzM2ZmNGExYmJjMzczYjYyZWFlMDI2MmE2OTVlYWExMWE4NmNjMmNhZDE2Y2VmYTgzODBkIn0%3D" });

(async () => {
    const search = await client.search({ name: "Tình Anh" });
    const links = await client.getAudioUrl({ songUrl: search[0].songUrl });
    console.log(links["128"]);
})();