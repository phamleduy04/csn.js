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
(async () =>{
    const csnjs = require("csn.js")

    const songName = "Peaches"
    const result = await csnjs.searchMusic({
        name: songName,
        limit: 5
    }) // Output: [Array]
})()
```
``name`` field is required. You can set ``limit`` field from 1 to 6. Default of ``limit`` is 3.
### Get Audio URL by Music Link:
```js
(async() => {
    const csnjs = require("csn.js")

    const songURL = "https://chiasenhac.vn/mp3/justin-bieber-daniel-caesar-giveon/peaches-tsvm3vmtq8w28f.html"
    const result = await csnjs.getAudioUrl({
        "songURL": songURL
    }) //Output: "AUDIO LINK(MP3 128Kbps)"
})
```
``songURL`` field is required.
## Full Usage
To get a song and get it's Audio URL:
```js
(async() => {
    const csnjs = require("csn.js")

    const songName = "Peaches"
    const searchRes = csnjs.searchMusic({
        name: songName,
        limit: 5
    })

    const audioRes = csnjs.getAudioURL({
        "songURL": searchRes[0].music_link
    })
})
```
## Contributing
For more details, please read [CONTRIBUTING.md]("https://github.com/CookieGMVN/csn.js/tree/main/.github/CONTRIBUTING.md")
## Contributor
Thanks for: 
- Duy Pham Le ([phamleduy04]("https://github.com/phamleduy04"))

(This list may outdated, you can create a pull request to add more contributor :>)
## Contact/About Author
I'm CookieGMVN, you can visit my [GitHub]("https://github.com/CookieGMVN/") and contact with me through Discord: CookieGMVN#9173

Thanks for installing and using!