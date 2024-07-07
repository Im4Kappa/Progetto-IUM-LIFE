function modificaInfoUtenteFormPHP() {
    document.getElementById('modificaInfoBtn').addEventListener('click', function () {
        const userId = getIdSessione(); // Sostituisci con l'ID dell'utente corrente
        const nome = document.getElementById('nomeInput').value;
        const cognome = document.getElementById('cognomeInput').value;
        const eta = document.getElementById('etaInput').value;
        const sesso = document.getElementById('sessoInput').value;
        const altezza = document.getElementById('altezzaInput').value;
        const password = document.getElementById('pwdInput').value;
        const obbiettivoPassi = document.getElementById('obbiettivoPassiInput').value;

        const updatedUser = {
            "userId": userId,
            "nome": nome,
            "cognome": cognome,
            "eta": parseInt(eta),
            "sesso": sesso,
            "altezza": parseInt(altezza),
            "password": password,
            "obbiettivoPassi": parseInt(obbiettivoPassi)
        };

        fetch('php/modificaInfoUtente.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successo:', data);
                if (data.message) {
                    // Ricarica la cache e la pagina
                    aggiornaCacheEDati("utenti.json");
                }
            })
            .catch(error => {
                console.error('Errore:', error);
            });
        // Ricarica la cache e la pagina
        aggiornaCacheEDati("utenti.json");
    });
}
