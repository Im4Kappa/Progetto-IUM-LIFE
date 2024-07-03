function aggiornaCacheEDati() {
    // Aggiungi un timestamp per invalidare la cache
    const timestamp = new Date().getTime();
    fetch(`data/passiUtenti.json?cacheBuster=${timestamp}`)
        .then(response => response.json())
        .then(data => {
            // Ricarica i dati e aggiorna il grafico o altri elementi della pagina
            console.log('Dati aggiornati:', data);
            window.location.reload(); // Ricarica la pagina
        })
        .catch(error => {
            console.error('Errore nel ricaricare i dati:', error);
        });
}

