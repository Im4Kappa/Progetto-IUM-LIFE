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

    // Funzione per ottenere i pasti per tipo, data e utente specificati
    async function getPastiPerTipo(userId, date, tipoPasto) {
        try {
            // Effettua la fetch del file JSON
            const response = await fetch('./data/alimentazioneGiornalieraUtenti.json');

            // Verifica se la risposta è OK
            if (!response.ok) {
                throw new Error('Errore nel recupero del file JSON');
            }

            // Converte la risposta in JSON
            const alimentazioneGiornalieraUtenti = await response.json();

            // Trova l'utente con l'ID specificato
            const user = alimentazioneGiornalieraUtenti.find(u => u.userId === userId);

            if (!user) {
                console.error(`Utente con ID ${userId} non trovato.`);
                return null;
            }

            // Trova la data specificata per l'utente
            const giorno = user.data.find(d => d.date === date);

            if (!giorno) {
                console.error(`Nessun pasto trovato per l'utente con ID ${userId} nella data ${date}.`);
                return null;
            }

            // Trova il tipo di pasto specificato per quella data
            const pastiTipo = giorno.pasti[tipoPasto];

            if (!pastiTipo) {
                console.error(`Nessun pasto trovato per il tipo ${tipoPasto} nella data ${date} per l'utente con ID ${userId}.`);
                return null;
            }

            // Restituisce i pasti per il tipo specificato e la data specificata
            return pastiTipo;

        } catch (error) {
            console.error('Errore:', error);
            return null;
        }
    }

    // Funzione per ottenere i pasti per tipo, data e utente specificati
    async function getPastiPerTipo(userId, date, tipoPasto) {
        try {
            // Effettua la fetch del file JSON
            const response = await fetch('./data/alimentazioneGiornalieraUtenti.json');

            // Verifica se la risposta è OK
            if (!response.ok) {
                throw new Error('Errore nel recupero del file JSON');
            }

            // Converte la risposta in JSON
            const alimentazioneGiornalieraUtenti = await response.json();

            // Trova l'utente con l'ID specificato
            const user = alimentazioneGiornalieraUtenti.find(u => u.userId === userId);

            if (!user) {
                console.error(`Utente con ID ${userId} non trovato.`);
                return null;
            }

            // Trova la data specificata per l'utente
            const giorno = user.data.find(d => d.date === date);

            if (!giorno) {
                console.error(`Nessun pasto trovato per l'utente con ID ${userId} nella data ${date}.`);
                return null;
            }

            // Trova il tipo di pasto specificato per quella data
            const pastiTipo = giorno.pasti[tipoPasto];

            if (!pastiTipo) {
                console.error(`Nessun pasto trovato per il tipo ${tipoPasto} nella data ${date} per l'utente con ID ${userId}.`);
                return null;
            }

            // Restituisce i pasti per il tipo specificato e la data specificata
            return pastiTipo;

        } catch (error) {
            console.error('Errore:', error);
            return null;
        }
    }

    // Funzione per riempire i div con i pasti
    async function riempiDivPasti(userId) {
        const oggi = new Date().toISOString().split('T')[0]; // Data odierna in formato YYYY-MM-DD

        const tipiPasto = ["Colazione", "Pranzo", "Cena", "Spuntini"];
        const divIds = {
            "Colazione": "listaColazione",
            "Pranzo": "listaPranzo",
            "Cena": "listaCena",
            "Spuntini": "listaSpuntini"
        };

        for (const tipoPasto of tipiPasto) {
            const pasti = await getPastiPerTipo(userId, oggi, tipoPasto);
            let totalCalories = 0;

            const div = document.getElementById(divIds[tipoPasto]);
            div.innerHTML = ''; // Pulisce il contenuto del div

            if (pasti && pasti.length > 0) {
                const ul = document.createElement('ul');
                ul.classList.add('list-unstyled', 'text-left', 'w-100', 'list-group', 'list-group-flush', 'list-group-scrollable', 'ulAlim');
                pasti.forEach(pasto => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item');
                    listItem.innerHTML = `<b class="fs-5"><i class="fa-solid fa-utensils fs-5"></i>&nbsp;&nbsp; ${pasto.pasto}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-fire-flame-curved fs-5"></i>&nbsp;&nbsp;${pasto.calories} cal.</b>`;
                    ul.appendChild(listItem);
                    // Aggiorna il totale delle calorie
                    totalCalories += pasto.calories;
                });
                // Aggiungi lo stile per lo scrolling all'elemento div
                div.classList.add('overflow-auto');
                div.appendChild(ul);
                document.getElementById("totaleCalorie" + tipoPasto).innerHTML = totalCalories + " Kcal";
            } else {
                const listItem = document.createElement('div');
                listItem.textContent = `Nessun pasto trovato per ${tipoPasto} nella data ${oggi}.`;
                div.appendChild(listItem);
            }
        }
    }

    riempiDivPasti(idSessione);

    // Funzione per ottenere tutti i pasti per un utente raggruppati per data
    async function resocontoPasti(userId) {
        try {
            // Effettua la fetch del file JSON
            const response = await fetch('./data/alimentazioneGiornalieraUtenti.json');

            // Verifica se la risposta è OK
            if (!response.ok) {
                throw new Error('Errore nel recupero del file JSON');
            }

            // Converte la risposta in JSON
            const alimentazioneGiornalieraUtenti = await response.json();

            // Trova l'utente con l'ID specificato
            const user = alimentazioneGiornalieraUtenti.find(u => u.userId === userId);

            if (!user) {
                console.error(`Utente con ID ${userId} non trovato.`);
                return;
            }

            const resocontoDiv = document.getElementById('resocontoPasti');
            resocontoDiv.innerHTML = ''; // Pulisce il contenuto del div

            const ul = document.createElement('ul');
            ul.classList.add('list-unstyled', 'text-left', 'w-100', 'list-group', 'list-group-flush', 'list-group-scrollable', 'ulAlim');

            user.data.forEach(giorno => {
                let totalCalories = 0;
                let pastiDetails = '';

                if (giorno.pasti) {
                    const groupedPasti = {};

                    // Raggruppa i pasti per tipo di pasto
                    Object.entries(giorno.pasti).forEach(([tipoPasto, pastiTipo]) => {
                        if (Array.isArray(pastiTipo)) {
                            groupedPasti[tipoPasto] = groupedPasti[tipoPasto] || [];
                            pastiTipo.forEach(pasto => {
                                groupedPasti[tipoPasto].push(pasto);
                                totalCalories += pasto.calories;
                            });
                        } else {
                            console.warn(`Expected an array for ${tipoPasto}, but received:`, pastiTipo);
                        }
                    });

                    // Costruisci i dettagli dei pasti raggruppati per tipo di pasto
                    Object.entries(groupedPasti).forEach(([tipoPasto, pasti]) => {
                        pastiDetails += `<li class="list-group-item"><strong>${tipoPasto}:</strong></li>`;
                        pasti.forEach(pasto => {
                            pastiDetails += `<li class="list-group-item">${pasto.pasto} - ${pasto.calories} cal</li>`;
                        });
                    });
                }

                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.innerHTML = `
                    <div><strong>il ${giorno.date} hai assunto ${totalCalories} Kcal</strong></div>
                    <ul class="list-group list-group-flush w-100">${pastiDetails}</ul>
                `;

                ul.appendChild(listItem);
            });

            resocontoDiv.appendChild(ul);
        } catch (error) {
            console.error('Errore:', error);
        }
    }

    // Esempio di chiamata alla funzione
    resocontoPasti(idSessione);


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
                    //console.log(`Calorie totali assunte il ${data}: ${totaleCalorie}`);
                    // Aggiorna l'interfaccia utente
                    document.getElementById('totaleCalorie').innerHTML = "Oggi hai assunto " + totaleCalorie + " Kcal";
                } else {
                    console.log(`Nessun dato trovato per la data ${data}`);
                }
            } else {
                console.log(`Utente con ID ${userId} non trovato`);
            }
        })
        .catch(error => console.error('Errore nel caricamento dei dati:', error));
}



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
                optionElement.value = alimento.name; // Nome dell'alimento come valore
                optionElement.textContent = `${alimento.name} (${alimento.calories} cal)`; // Nome e calorie dell'alimento
                optionElement.dataset.calories = alimento.calories; // Aggiungi le calorie come attributo data-calories
                selectAlimenti.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Errore nel caricamento degli alimenti:', error));

    // Gestisci l'invio del form
    btnAggiungiAlimentazione.addEventListener('click', function (event) {
        event.preventDefault();

        const tipoPasto = selectTipoPasto.value;
        const alimento = selectAlimenti.value;
        const calorie = selectAlimenti.selectedOptions[0].dataset.calories; // Recupera le calorie dall'attributo data-calories

        // Esegui qui le operazioni per inviare i dati al server o gestirli localmente
        console.log(`Tipo pasto: ${tipoPasto}, Alimento: ${alimento}, Calorie: ${calorie}`);
    });
});


/* INOLTRO DATI AL PHP*/
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btnAggiungiAlimentazione").addEventListener('click', async function (event) {
        event.preventDefault();

        const selectTipoPasto = document.getElementById('selectTipoPasto');
        const selectAlimenti = document.getElementById('selectAlimenti');
        const userId = idSessione; // Sostituisci con l'ID dell'utente attuale

        const tipoPasto = selectTipoPasto.value;
        const alimento = selectAlimenti.value;
        const calorie = selectAlimenti.selectedOptions[0].dataset.calories; // Recupera le calorie dall'attributo data-calories
        //console.log(`AAAAATipo pasto: ${tipoPasto}, Alimento: ${alimento}, Calorie: ${calorie}`);
        try {
            // Invia i dati al server PHP tramite fetch
            const response = await fetch('php/aggiungiPasto.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    tipoPasto: tipoPasto,
                    pasto: {
                        pasto: alimento,
                        calories: parseInt(calorie) // Assicurati che le calorie siano un numero intero
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Errore durante l\'aggiunta del pasto.');
            }

            console.log('Pasto aggiunto con successo.');

            // Puoi aggiungere qui logiche aggiuntive dopo l'aggiunta del pasto, ad esempio aggiornare l'interfaccia utente

        } catch (error) {
            console.error('Errore:', error);
        }
    });
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