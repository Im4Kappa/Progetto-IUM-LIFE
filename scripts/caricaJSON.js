// Funzione per caricare e utilizzare il file JSON esterno
function fetchJSONFile(path, callback) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

/*ESEMPIO UTILIZZO:

const pathToJson = '../data/data.json'; // Percorso del file JSON esterno

// Carica il file JSON e esegui le operazioni desiderate
fetchJSONFile(pathToJson, function(data) {
    const resFunzione = funzione(data, 1);
    console.log(resFunzione);
});*/