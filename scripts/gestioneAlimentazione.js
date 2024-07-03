const fs = require('fs');
const path = require('path');

// Funzione per caricare il file JSON pasti.json
function caricaPastiJson(callback) {
    // Percorso del file JSON
    const filePath = path.join(__dirname, 'data', 'pasti.json');

    // Leggi il file JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Errore nella lettura del file:', err);
            callback(err, null);
            return;
        }

        try {
            // Converti il contenuto del file JSON in un array di oggetti JavaScript
            const pasti = JSON.parse(data);
            callback(null, pasti);

        } catch (error) {
            console.error('Errore nel parsing del file JSON:', error);
            callback(error, null);
        }
    });
}

// Funzione per stampare i pasti per un utente dato l'ID
function stampaPastiUtente(userId) {
    caricaPastiJson((err, pasti) => {
        if (err) {
            console.error('Errore nel caricamento dei pasti:', err);
            return;
        }

        // Trova l'utente con l'ID specificato
        const utente = pasti.find(u => u.userId === userId);
        if (!utente) {
            console.log(`Utente con ID ${userId} non trovato.`);
            return;
        }

        // Stampa i pasti divisi per giorni
        console.log(`Pasti per l'utente ${utente.userId}:`);
        utente.data.forEach(giorno => {
            console.log(`Data: ${giorno.date}`);
            giorno.pasti.forEach(pasto => {
                console.log(`  Categoria: ${pasto.category}`);
                console.log(`  Pasto: ${pasto.pasto}`);
                console.log(`  Calorie: ${pasto.calories}`);
                console.log();
            });
        });
    });
}

