# csn.js
A package to get music from chiasenhac.vn
## Installation
To install csn.js, use npm:
```
npm install csn.js
```
or yarn:
```
yarn add csn.js
```
## Test
You can test this library by running ``npm test``
## API
### Get songs list by name:
```js
const { CSNClient } = require("csn.js");

const client = new CSNClient({ cookie: "" });

(async () => {
    const search = await client.search({ name: "Tình Anh" });
    console.log(search);
})();

```
``name`` field is required. You can set ``limit`` field from 1 to 10. Default of ``limit`` is 5.
### Get Audio URL by Music Link:
```js
const { CSNClient } = require("csn.js");

const client = new CSNClient({ cookie: "" });

(async () => {
    const links = await client.getAudioUrl({ songUrl: "https://chiasenhac.vn/mp3/la-phong-lam/lac-chon-hong-tran-tsv6b55tqkqhhf.html" });
    console.log(links);
})();
```
``songURL`` field is required.
### Get Recommended song:
```js
const { CSNClient } = require("csn.js");

const client = new CSNClient({ cookie: "" });

(async () => {
    const recommendedSong = await client.getRecommendSong({ songUrl: "https://chiasenhac.vn/mp3/la-phong-lam/lac-chon-hong-tran-tsv6b55tqkqhhf.html" });
    console.log(recommendedSong);
})();
```
``songURL`` field is required.

### Get Top charts
```js
const { CSNClient } = require("csn.js");

const client = new CSNClient({ cookie: "" });

(async () => {
    const topChart = await client.getTopChart();
    console.log(topChart);
})();
```

## Contributing
For more details, please read [CONTRIBUTING.md](https://github.com/CookieGMVN/csn.js/tree/main/.github/CONTRIBUTING.md)

Thanks for installing and using!
