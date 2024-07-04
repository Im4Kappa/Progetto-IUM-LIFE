function aggiornaCacheEDati(fileName) {
    const timestamp = new Date().getTime();
    fetch(`../Progetto-IUM-LIFE/data/${fileName}?cacheBuster=${timestamp}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('File non trovato: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dati aggiornati:', data);
        })
        .catch(error => {
            console.error('Errore nel caricamento dei dati:', error);
        });
    window.location.reload(); // Ricarica la pagina
}

