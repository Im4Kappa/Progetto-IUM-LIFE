// Funzione per calcolare l'IMC e il peso ideale
function calcolaIBM(data, userId) {
    // Trova l'utente corrispondente
    const user = data.find(user => user.userId === userId);

    if (!user) {
        console.error(`Utente con userId ${userId} non trovato`);
        return null;
    }

    const altezzaM = user.altezza / 100; // Conversione altezza da cm a metri
    const IMC = user.peso / (altezzaM ** 2); // Calcolo dell'IMC

    // Calcolo del peso ideale approssimativo
    let pesoIdeale;
    if (user.sesso === 'M') { // Formula per uomini
        pesoIdeale = 50 + 0.91 * (user.altezza - 152.4);
    } else if (user.sesso === 'F') { // Formula per donne
        pesoIdeale = 45.5 + 0.91 * (user.altezza - 152.4);
    } else {
        console.warn(`Sesso non specificato per userId ${userId}, calcolo del peso ideale non eseguito`);
    }

    return pesoIdeale ? pesoIdeale.toFixed(2) : 'N/D' // Arrotonda il peso ideale se definito
}