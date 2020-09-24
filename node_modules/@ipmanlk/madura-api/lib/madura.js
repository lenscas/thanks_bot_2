const https = require('https');

const search = async (word) => {
    try {
        if (!word || word.trim() == "") throw new Error("no word defined.");

        // get webpage html
        let body = await sendRequest(word);

        // extract cats & words
        const cats = body.match(/ty"\>(\w+\.)<\/td>/g);
        const words = body.match(/td"\>(.+[^;])<\/td>/g);

        // store meanings with their categories
        const meanings = [];

        // check if meanings for the given word are found
        if (cats == null || cats.length == 0) {
            return meanings;
        }

        // extract meanings and categories
        cats.forEach((catData, i) => {

            let cat = catData.substring(
                catData.lastIndexOf('"ty">') + 5,
                catData.lastIndexOf("</td>")
            );

            const wordData = words[i];
            let word = wordData.substring(
                wordData.lastIndexOf('"td">') + 5,
                wordData.lastIndexOf("</td>")
            );

            meanings.push({
                category: cat.trim(),
                meaning: word.trim()
            });

        });

        return (meanings);

    } catch (error) {
        // if request failed, throw error
        throw new Error(error);
    }
}

const sendRequest = (word) => {
    return new Promise((resolve, reject) => {
        https.get(encodeURI(`https://www.maduraonline.com/?find=${word}`), (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(err.message);
        });

    });
}

module.exports = {
    search
}