// CONTROLLI PER APERTURA CHIUSURA CONSIGLIO
document.addEventListener('DOMContentLoaded', function () {
    var consigliamiBtn = document.getElementById('consigliamiBtn');
    var consigliamiBtnNota = document.getElementById('consigliamiBtnNota');
    var consiglioAlert = document.getElementById('consiglioAlert');

    // Funzione per mostrare il consiglio sul SONNO
    function mostraConsiglio() {
        consiglioAlert.style.display = 'block';
        console.log("Consiglio mostrato");
        document.getElementById("textConsiglio").innerHTML = scegliConsiglioCasualeSonno();
    }

    // Funzione per mostrare il consiglio sulla NOTA
    function mostraConsiglioNota() {
        consiglioAlert.style.display = 'block';
        console.log("Consiglio mostrato");
        document.getElementById("textConsiglio").innerHTML = scegliConsiglioCasualeNota();
    }

    // Evento click sul bottone per aprire il pannello
    if (consigliamiBtn) {
        consigliamiBtn.addEventListener('click', function () {
            mostraConsiglio();
        });
    }

    // Evento click sul bottone per aprire il pannello
    if (consigliamiBtnNota) {
        consigliamiBtnNota.addEventListener('click', function () {
            mostraConsiglioNota();
        });
    }
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

/*CONSIGLI DA CHATGPT*/
// Array contenente 10 consigli riguardanti il sonno
const consigliNota = [
    "Quali sono le piccole cose che ti fanno sorridere durante la giornata?",
    "Parlami di un momento in cui hai superato una sfida personale.",
    "Com'è andata la tua giornata oggi? Cosa hai imparato?",
    "Quali sono le tue passioni e come le coltivi nella tua vita quotidiana?",
    "Parlami di una persona che ti ispira e perché.",
    "Quali sono le tue strategie per gestire lo stress nelle situazioni difficili?",
    "Cosa ti rende orgoglioso di te stesso ultimamente?",
    "Quali sono i tuoi obiettivi a breve e lungo termine e come stai lavorando per raggiungerli?",
    "Parlami di una cosa che vorresti fare per te stesso oggi.",
    "Cosa ti motiva a fare del tuo meglio ogni giorno?"
];


// Funzione per scegliere casualmente uno dei consigli dal vettore
function scegliConsiglioCasualeNota() {
    const indiceCasuale = Math.floor(Math.random() * consigliNota.length);
    return consigliNota[indiceCasuale];
}