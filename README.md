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
- cherrio
- axios
## API
### Get songs list by name:
```js
const csnjs = require("csn.js")

const songName = "Peaches"
const result = csnjs.searchMusic({
    name: songName,
    limit: 5
}) // Output: [Array]
```
``name`` field is required. You can set ``limit`` field from 1 to 6. Default of ``limit`` is 3.