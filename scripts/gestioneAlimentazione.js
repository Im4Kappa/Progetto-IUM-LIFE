document.addEventListener('DOMContentLoaded', function () {
    const oggi = new Date();
    const dataOdierna = oggi.toISOString().slice(0, 10);
    const userId = idSessione; // Assicurati che idSessione sia definito altrove nel tuo codice

    calcolaCalorieTotali(idSessione, dataOdierna);
    // Percorso del file JSON per l'alimentazione
    let pathToAlimentazioneJson = 'data/alimentazioneGiornalieraUtenti.json';
    
    // Carica il file JSON per l'alimentazione e mostra il grafico
    fetchJSONFile(pathToAlimentazioneJson, function (dataAlimentazione) {
        // Trova i dati dell'utente specifico
        const userData = dataAlimentazione.find(user => user.userId === userId);

        if (userData) {
            // Trova i dati per la data odierna
            const dailyData = userData.data.find(day => day.date === dataOdierna);

            if (dailyData) {
                // Crea il grafico a ciambella
                graficoAlimentazione(dailyData.pasti, userId);
            } else {
                console.error(`Nessun dato trovato per la data ${dataOdierna}`);
            }
        } else {
            console.error(`Utente con userId ${userId} non trovato.`);
        }
    });
});

function graficoAlimentazione(pasti, userId) {
    const tipiPasto = Object.keys(pasti);
    const calorie = tipiPasto.map(tipo =>
        pasti[tipo].reduce((acc, item) => acc + item.calories, 0)
    );

    const ctx = document.getElementById('graficoAlimentazione').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: tipiPasto,
            datasets: [{
                data: calorie,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: `Calorie per tipo di pasto - Utente ${userId}`
                }
            }
        }
    });
}

// Assicurati di avere una funzione fetchJSONFile definita
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}


// Funzione per calcolare le calorie totali
function calcolaCalorieTotali(userId, date) {
    fetch('data/alimentazioneGiornalieraUtenti.json')
        .then(response => response.json())
        .then(data => {
            const utente = data.find(user => user.userId === userId);
            if (utente) {
                const giornata = utente.data.find(day => day.date === date);
                if (giornata) {
                    let totaleCalorie = 0;
                    for (let tipoPasto in giornata.pasti) {
                        giornata.pasti[tipoPasto].forEach(pasto => {
                            totaleCalorie += pasto.calories;
                        });
                    }
                    console.log(`Calorie totali assunte il ${data}: ${totaleCalorie}`);
                    // Aggiorna l'interfaccia utente
                    document.getElementById('totaleCalorie').innerHTML = "Oggi hai assunto "+ totaleCalorie + " Kcal";
                } else {
                    console.log(`Nessun dato trovato per la data ${data}`);
                }
            } else {
                console.log(`Utente con ID ${userId} non trovato`);
            }
        })
        .catch(error => console.error('Errore nel caricamento dei dati:', error));
}



/* FORM ALIMENTAZIONE */
document.addEventListener('DOMContentLoaded', function () {
    const selectTipoPasto = document.getElementById('selectTipoPasto');
    const selectAlimenti = document.getElementById('selectAlimenti');
    const btnAggiungiAlimentazione = document.getElementById('btnAggiungiAlimentazione');

    // Popola il select per il tipo di pasto
    const opzioniPasto = ['Colazione', 'Pranzo', 'Cena', 'Spuntino'];
    opzioniPasto.forEach(opzione => {
        const optionElement = document.createElement('option');
        optionElement.value = opzione.toLowerCase();
        optionElement.textContent = opzione;
        selectTipoPasto.appendChild(optionElement);
    });

    // Carica gli alimenti dal file JSON
    fetch('data/alimenti.json')
        .then(response => response.json())
        .then(alimenti => {
            alimenti.forEach(alimento => {
                const optionElement = document.createElement('option');
                optionElement.value = alimento.name;
                optionElement.textContent = `${alimento.name} (${alimento.calories} cal)`;
                selectAlimenti.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Errore nel caricamento degli alimenti:', error));
});



// CONTROLLI PER APERTURA CHIUSURA PANNELLO AGGIUNGI ALIMENTAZIONE
document.addEventListener('DOMContentLoaded', function () {
    var pannelloAggiungiAlimentazione = document.getElementById('pannelloAggiungiAlimentazione');
    var bottoneApri = document.getElementById('bottoneApriPannelloAggiungiAlimentazione');
    var bottoneChiudiDesktop = document.getElementById('bottoneChiudiDesktopAlimentazione');
    var bottoneChiudiMobile = document.getElementById('bottoneChiudiMobileAlimentazione');

    // Funzione per mostrare il pannello aggiungi alimentazione
    function mostraPannello() {
        if (pannelloAggiungiAlimentazione.style.display !== 'block') {
            pannelloAggiungiAlimentazione.style.display = 'block';
            console.log("Pannello mostrato");
        }
    }

    // Funzione per nascondere il pannello aggiungi alimentazione
    function nascondiPannello() {
        if (pannelloAggiungiAlimentazione.style.display === 'block') {
            pannelloAggiungiAlimentazione.style.display = 'none';
            console.log("Pannello nascosto");
        }
    }

    // Evento click sul bottone per aprire il pannello
    bottoneApri.addEventListener('click', function () {
        mostraPannello();
    });

    // Evento click sul bottone per chiudere il pannello (desktop)
    bottoneChiudiDesktop.addEventListener('click', function () {
        nascondiPannello();
    });

    // Evento click sul bottone per chiudere il pannello (mobile)
    bottoneChiudiMobile.addEventListener('click', function () {
        nascondiPannello();
    });
});