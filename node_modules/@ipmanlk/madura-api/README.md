<a href="https://www.maduraonline.com/">
    <img src="https://i.imgur.com/aan4Rtl.png" alt="Madura logo" title="Madura" align="right" height="60" />
</a>

# Madura API
_Javascript API for the Madura Online Dictionary_

*__This is just a fun project. All credits should go to Madura Kulatunga for creating Madura Online Dictionary.__*

## Usage

Download node from nodejs.org and install it, if you haven't already.

Then install madura-api using npm or yarn.

```javascript
npm install @ipmanlk/madura-api --save
```

Example,

```javascript
const { search } = require("@ipmanlk/madura-api");

// find Sinhala meanings
search("cat").then(meanings => {
    console.log(meanings);
});

// find English meanings
search("අරුත").then(meanings => {
    console.log(meanings);
});
```
If word is not found, it will give an empty array.

## Tests
Either of the following should work depending on your preferences.
<br />
`npm test`
or 
`yarn test`

## Dependencies
- cheerio
