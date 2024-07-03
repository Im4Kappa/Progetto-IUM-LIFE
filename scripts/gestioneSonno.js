document.addEventListener('DOMContentLoaded', function () {
    const oggi = new Date();
    const dataOdierna = oggi.toISOString().slice(0, 10);

    // Percorso del file JSON per il sonno
    let pathToSonnoJson = 'data/sonnoUtenti.json';

    // Carica il file JSON per il sonno e mostra il grafico
    fetchJSONFile(pathToSonnoJson, function (dataSonno) {
        // Supponiamo di lavorare con l'utente con userId = 1
        const userId = 1;

        // Filtra i dati per l'utente specificato
        const userData = dataSonno.users.find(user => user.userId === userId);

        if (userData) {
            const sleepData = userData.sleepHours;

            // Ordina i dati per data crescente
            sleepData.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Mostra il grafico
            graficoSonno(sleepData, userId);

            // Mostra il resoconto settimanale
            mostraResocontoSettimanale(sleepData);
        } else {
            console.error(`Utente con userId ${userId} non trovato.`);
        }
    });
});

// Funzione per disegnare il grafico del sonno
function graficoSonno(sleepData, userId) {
    const labels = sleepData.map(item => item.date);
    const oreSonno = sleepData.map(item => item.hours); // Modifica per riflettere la struttura del JSON

    const ctx = document.getElementById('graficoSonno').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Ore di Sonno - Utente ${userId}`,
                data: oreSonno,
                borderColor: '#0044CC', // Blu scuro
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true // Mostra la legenda
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Ore di Sonno'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Data'
                    }
                }
            }
        }
    });
}

// Funzione per mostrare il resoconto settimanale
function mostraResocontoSettimanale(sleepData) {
    // Raggruppa i dati per giorno della settimana
    const resocontoSettimanale = raggruppaPerSettimana(sleepData);

    // Costruisci le carte per il resoconto settimanale
    const resocontoSettimanaleDiv = document.getElementById('resocontoSettimanale');
    resocontoSettimanaleDiv.innerHTML = '';

    resocontoSettimanale.forEach(item => {
        const cardHtml = `
            <div class="card text-center card-square">
                <div class="card-body">
                    <h5 class="card-title">${item.giorno}</h5>
                    <p class="card-text">${item.ore} ore di sonno</p>
                </div>
            </div>
        `;
        resocontoSettimanaleDiv.innerHTML += cardHtml;
    });
}

// Funzione per raggruppare i dati per giorno della settimana
function raggruppaPerSettimana(data) {
    const resoconto = {};

    // Mappa i nomi dei giorni
    const nomiGiorni = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

    data.forEach(item => {
        const dataObj = new Date(item.date);
        const giorno = nomiGiorni[dataObj.getDay()];

        if (resoconto[giorno]) {
            resoconto[giorno] += item.hours; // Modifica per riflettere la struttura del JSON
        } else {
            resoconto[giorno] = item.hours; // Modifica per riflettere la struttura del JSON
        }
    });

    // Converti in un array di oggetti
    const resocontoArray = Object.keys(resoconto).map(giorno => {
        return { giorno: giorno, ore: resoconto[giorno] };
    });

    return resocontoArray;
}

// Funzione per caricare un file JSON tramite fetch
function fetchJSONFile(path, callback) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => callback(data))
        .catch(error => console.error('Fetch error:', error));
}


function aggiungiOreSonno() {
    document.getElementById('btnAggiungiOreSonno').addEventListener('click', function () {
        const userId = getUserId(); // Funzione per ottenere l'ID dell'utente, da implementare
        const oreSonno = document.getElementById('aggiungiOreSonnoInput').value;

        const newSleepEntry = {
            userId: userId,
            date: getFormattedDate(), // Funzione per ottenere la data odierna nel formato richiesto, da implementare
            sleepHours: parseFloat(oreSonno)
        };

        fetch('php/aggiungiSonno.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSleepEntry)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successo:', data);
                // Aggiorna la visualizzazione o effettua altre operazioni necessarie
                aggiornaCacheEDati("sonnoUtenti.json");
            })
            .catch(error => {
                console.error('Errore:', error);
            });
            aggiornaCacheEDati("sonnoUtenti.json");
    });
}

function getUserId() {
    // Implementa la logica per ottenere l'ID dell'utente, ad esempio da una variabile globale o da un sistema di autenticazione
    return 1; // Esempio di ID utente
}

function getFormattedDate() {
    const oggi = new Date();
    return oggi.toISOString().slice(0, 10); // Restituisce la data odierna nel formato YYYY-MM-DD
}

aggiungiOreSonno();


document.addEventListener('DOMContentLoaded', function() {
var apriPannelloBtn = document.getElementById('bottoneApriPannelloAggiungiSonno');
var chiudiPannelloBtn = document.getElementById('bottoneChiudiDesktopSonno');
var aggiungiOrePanel = document.getElementById('aggiungiOreSonnoInput');

    // Funzione per mostrare il pannello aggiungi peso
    function mostraPannello() {
        if (pannelloAggiungiSonno.style.display !== 'open') {
            pannelloAggiungiSonno.style.display = 'open';
            console.log("Pannello mostrato");
        }
    }

    // Funzione per nascondere il pannello aggiungi peso
    function nascondiPannello() {
        if (pannelloAggiungiSonno.style.display === 'open') {
            pannelloAggiungiSonno.style.display = 'none';
            console.log("Pannello nascosto");
        }
    }

apriPannelloBtn.addEventListener('click', function () {
    pannelloAggiungiSonno.classList.add('open');
});

chiudiPannelloBtn.addEventListener('click', function () {
    pannelloAggiungiSonno.classList.remove('open');
});
});