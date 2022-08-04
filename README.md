# csn.js
An unofficial API to get music from chiasenhac.vn
## Installation
To install csn.js, use npm:
```
npm install csn.js
```
or yarn:
```
yarn add csn.js
```
## Dependencies Packages
- jsdom
- undici
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
    console.log(links["128"]);
})();
```
``songURL`` field is required.
```
## Contributing
For more details, please read [CONTRIBUTING.md](https://github.com/CookieGMVN/csn.js/tree/main/.github/CONTRIBUTING.md)
## Contributor
Thanks for: 
- Duy Pham Le ([phamleduy04](https://github.com/phamleduy04))

(This list may outdated, you can create a pull request to add more contributor :>)
## Contact/About Author
I'm CookieGMVN, you can visit my [GitHub](https://github.com/CookieGMVN/) and contact with me through Discord: CookieGMVN#9173

Thanks for installing and using!
