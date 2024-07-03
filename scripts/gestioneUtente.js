// Variabili esterne
let userId;
let nomeUtente;
let cognomeUtente;
let etaUtente;
let sessoUtente;
let altezzaUtente;
let pesoUtente;
let obbiettivoPassi;

// Funzione per recuperare le info di un certo utente
function getUserSession(data, userIdInput) {
    // Trova l'utente corrispondente
    const user = data.find(user => user.userId === userIdInput);

    if (!user) {
        console.error(`Utente con userId ${userIdInput} non trovato`);
        return null;
    }

    // Setta le variabili corrispondenti con le informazioni dell'utente trovato
    userId = user.userId;
    nomeUtente = user.nome;
    cognomeUtente = user.cognome;
    etaUtente = user.eta;
    sessoUtente = user.sesso;
    altezzaUtente = user.altezza;
    pesoUtente = user.peso;
    obbiettivoPassi = user.obbiettivoPassi;
}

// Funzione per calcolare l'IMC e il peso ideale
function calcolaIBM(data, userId) {
    // Trova l'utente corrispondente
    const user = data.find(user => user.userId === userId);

    if (!user) {
        console.error(`Utente con userId ${userId} non trovato`);
        return null;
    }
    // Verifica che altezza e peso attuale siano numeri positivi
    if (user.altezza <= 0 || user.peso <= 0) {
        console.error('Altezza e peso attuale devono essere numeri positivi.');
        return 'N/D';
    }

    // Formula approssimativa per calcolare il peso ideale
    // Questa formula è una semplice approssimazione e può variare a seconda dei criteri utilizzati
    let pesoIdeale = 22 * (user.altezza / 100) * (user.altezza / 100);

    // Restituisci il peso ideale arrotondato a una cifra decimale
    return pesoIdeale.toFixed(1);
}

// Funzione per calcolare l'IMC effettivo
function calcolaIMC(peso, altezza) {
    // Converti l'altezza da cm a metri
    let altezzaM = altezza / 100;

    // Calcola l'IMC
    let imc = peso / (altezzaM * altezzaM);

    // Arrotonda l'IMC a due cifre decimali
    return imc.toFixed(2);
}