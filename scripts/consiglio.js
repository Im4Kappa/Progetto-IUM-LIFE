// CONTROLLI PER APERTURA CHIUSURA CONSIGLIO
document.addEventListener('DOMContentLoaded', function () {
    var consigliamiBtn = document.getElementById('consigliamiBtn');
    var consiglioAlert = document.getElementById('consiglioAlert');

    // Funzione per mostrare il pannello aggiungi sonno
    function mostraConsiglio() {
        consiglioAlert.style.display = 'block';
        console.log("Consiglio mostrato");
        document.getElementById("textConsiglio").innerHTML = scegliConsiglioCasualeSonno();
    }

    // Evento click sul bottone per aprire il pannello
    consigliamiBtn.addEventListener('click', function () {
        mostraConsiglio();
    });
});

/*CONSIGLI DA CHATGPT*/
// Array contenente 10 consigli riguardanti il sonno
const consigliSonno = [
    "Mantieni un orario regolare per andare a letto e svegliarti ogni giorno, anche nel fine settimana.",
    "Cerca di rilassarti prima di andare a dormire con attività come lettura o ascolto di musica tranquilla.",
    "Evita di consumare bevande caffeinate o alcoliche nelle ore precedenti il sonno.",
    "Assicurati che la tua camera da letto sia oscurata e fresca per favorire un buon sonno.",
    "Evita di guardare schermi luminosi come smartphone o computer poco prima di andare a dormire.",
    "Esercitati regolarmente durante il giorno, ma evita di fare attività fisica intensa poco prima di coricarti.",
    "Fai della tua camera da letto un luogo dedicato solo al sonno e all'intimità.",
    "Cerca di ridurre lo stress e le preoccupazioni prima di andare a letto con tecniche di rilassamento.",
    "Limita i pisolini durante il giorno, specialmente nel pomeriggio e alla sera.",
    "Evita pasti pesanti e piccanti poco prima di coricarti."
];

// Funzione per scegliere casualmente uno dei consigli dal vettore
function scegliConsiglioCasualeSonno() {
    const indiceCasuale = Math.floor(Math.random() * consigliSonno.length);
    return consigliSonno[indiceCasuale];
}