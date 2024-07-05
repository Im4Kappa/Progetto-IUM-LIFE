// Funzione per caricare e utilizzare il file JSON esterno VECCHIA VERSIONE
/*function fetchJSONFile(path, callback) {
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
}*/

/*ESEMPIO UTILIZZO:

const pathToJson = '../data/data.json'; // Percorso del file JSON esterno

// Carica il file JSON e esegui le operazioni desiderate
fetchJSONFile(pathToJson, function(data) {
    const resFunzione = funzione(data, 1);
    console.log(resFunzione);
});*/

// Funzione per caricare e utilizzare il file JSON esterno NUOVA VERSIONE
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var data = JSON.parse(httpRequest.responseText);
            if (callback) callback(data);
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}