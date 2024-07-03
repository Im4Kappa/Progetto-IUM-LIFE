function impostaDashboard() {
    document.getElementById("benvenutoDashboard").innerHTML = "BENVENUTO, " + nomeUtente.toUpperCase() + " " + cognomeUtente.toUpperCase() + ".";

    // Popola le credenziali con le informazioni dell'utente
    document.getElementById('nomeCognomeUtente').textContent = nomeUtente+" "+cognomeUtente;
    document.getElementById('emailUtente').textContent = emailUtente;
    document.getElementById('etaUtente').textContent = etaUtente;
    document.getElementById('sessoUtente').textContent = sessoUtente;
    document.getElementById('altezzaUtente').textContent = altezzaUtente;
    document.getElementById('pesoUtente').textContent = pesoUtente;
    document.getElementById('obbiettivoPassi').textContent = obbiettivoPassi;
}