
export default () => {
    self.onmessage = (message) => {

        let arr = [];
        for (let i = 1; i < message.data; i++) {

            fetch(`https://quranenc.com/api/translation/sura/french_hameedullah/${i}`)
                .then(response => response.json())
                .then((result) => {
                    arr.push(result.result);
                })
                .then(() =>
                    arr.length === 114 ? postMessage(arr) : ""
                )
        }

    };
};