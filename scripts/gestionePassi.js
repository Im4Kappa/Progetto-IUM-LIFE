// costanti
const kcalOgni1000passi = 0.05; // Concersione Passi in Kcal
const options = { day: '2-digit', month: '2-digit', year: '2-digit' }; // Per formattare le date come dd/mm/YY

// Funzione per ottenere i passi di un utente specifico
function getStepsByUserId(data, userId) {
    const user = data.users.find(user => user.userId === userId);
    if (user) {
        return user.steps.map(stepRecord => ({
            date: stepRecord.date,
            steps: stepRecord.steps
        }));
    } else {
        return [];
    }
}
/* Esempio di utilizzo:
const stepsForUser1 = getStepsByUserId(data, 1);
console.log(stepsForUser1); // Output: [12000, 15000, 13000]*/

// FUNZIONE PER TROVARE I PASSI DI UN CERTO UTENTE IN UNA CERTA DATA
function getStepsByUserIdAndDate(data, userId, date) {
    // Trova l'utente con l'ID specificato
    const user = data.users.find(user => user.userId === userId);
    // Se l'utente è trovato
    if (user) {
        // Trova il record di passi per la data specificata
        const stepsRecord = user.steps.find(stepRecord => stepRecord.date === date);
        // Se il record di passi per la data è trovato, restituisci i passi
        if (stepsRecord) {
            return stepsRecord.steps;
        } else {
            // Se il record non è trovato, restituisci 0 o un valore predefinito
            return 0; // oppure null o un altro valore a tua scelta
        }
    } else {
        // Se l'utente non è trovato, restituisci un valore indicativo (null, undefined, ecc.)
        return null; // oppure un altro valore a tua scelta
    }
}

/* FUNZIONE PER AGGIUNGERE NUOVI PASSI */
function aggiungiPassi() {
    // Event listener per il click sul pulsante "Invia"
    document.getElementById('btnAggiungiPassi').addEventListener('click', function () {
        // Ottieni i dati dal form
        const passiSvolti = document.getElementById('aggiungiPassiSvolti').value;
        const data = document.getElementById('aggiungiPassiData').value;

        // Crea un oggetto dati per il nuovo passo
        const nuovoPasso = {
            "date": data,
            "steps": parseInt(passiSvolti)
        };

        // Recupera l'array utenti dal localStorage o inizializzalo se non esiste
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Trova l'utente esistente nell'array utenti (se esiste) o crea un nuovo utente
        let userId = 1; // Modifica il userId in base alla tua logica per identificare l'utente corretto
        let userIndex = users.findIndex(user => user.userId === userId);

        if (userIndex === -1) {
            // Se l'utente non esiste, aggiungilo con il nuovo passo
            users.push({
                "userId": userId,
                "steps": [nuovoPasso]
            });
        } else {
            // Se l'utente esiste, aggiungi il nuovo passo all'inizio dell'array 'steps'
            users[userIndex].steps.unshift(nuovoPasso);
        }

        // Salva l'array utenti aggiornato nel localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Mostra un messaggio o esegui altre azioni se necessario
        console.log('Passo aggiunto con successo per userId:', userId);
        console.log(JSON.parse(localStorage.getItem('users')));
    });
}

/* Esempio di utilizzo
const userId = 1;
const date = "2024-06-26";
const stepsForUserOnDate = getStepsByUserIdAndDate(data, userId, date);
console.log(`Passi per l'utente ${userId} il ${date}:`, stepsForUserOnDate);*/

// FUNZIONE PER STAMPARE IL RESOCONTO PASSI
function listaResocontoPassi(data, userId, dataOdierna) {
    const ulElement = document.getElementById('listaResocontoPassi');
    ulElement.innerHTML = ''; // Pulisce la lista esistente
    const steps = getStepsByUserId(data, userId); // Ottiene i passi per un dato utente
    // Ordina gli steps per data in ordine decrescente (dalla più recente alla meno recente)
    steps.sort((a, b) => b.date.localeCompare(a.date));
    // AGGIUNGO UN BOOLEANO DI CONTROLLO PER VEDERE SE ESISTE UNA REGISTRAZIONE ORDIERNA
    let passiOggiBool = false;
    steps.forEach(step => {
        //console.log(step.steps);
        if (step.date === dataOdierna) {
            /* AGGIORNA I CAMPI PER AGGIUNGERE I PASSI */
            document.getElementById('aggiungiPassiSvolti').value = step.steps;
            document.getElementById('aggiungiPassiData').value = step.date;
            /* AGGIORNA IL RESOCONTO DI PASSI ODIERNO */
            document.getElementById('resocontoPassiOggi').innerHTML = 'Oggi &nbsp;&nbsp;<i class="fa-solid fa-fire-flame-curved fs-3"></i>&nbsp;' + (step.steps * kcalOgni1000passi).toLocaleString('it-IT') + '&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-person-walking fs-3"></i>&nbsp;' + step.steps.toLocaleString('it-IT');
            passiOggiBool = true;
        }
        else if (passiOggiBool == false) {
            document.getElementById('resocontoPassiOggi').innerHTML = 'Oggi ancora non inserito';
        }

        if (step.date !== dataOdierna) {
            // CREO L'ELEMENTO LI
            const li = document.createElement('li');
            // AGGIUNGO LA CLASSE (SETTAGGI DI BOOTSTRAP)
            // Aggiunta della classe "list-group-item"
            li.classList.add('list-group-item');
            li.innerHTML = new Date(step.date).toLocaleDateString('it-IT', options) + '&nbsp;&nbsp;<i class="fa-solid fa-fire-flame-curved fs-5"></i>&nbsp;<b>' + (step.steps * kcalOgni1000passi).toLocaleString('it-IT') + '</b>&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-person-walking fs-5"></i>&nbsp;<b>' + step.steps.toLocaleString('it-IT') + '</b>';
            ulElement.appendChild(li);
        }
    });
}

//---[ INIZIO SETTAGGIO GRAFICI ]---
// Funzione per stampare il grafico delle kcal bruciate oggi per un utente specifico
function graficoKcalBruciateOggi(data, userId, date) {
    // Trova i passi dell'utente per la data specificata
    const steps = getStepsByUserIdAndDate(data, userId, date);
    // Calcola le KCal bruciate (esempio: 0.05 KCal per passo)
    const kcalBruciate = steps * 0.05; // Esempio: 0.05 KCal per passo
    // Formatta il numero con separatore delle migliaia
    const kcalBruciateFormattato = kcalBruciate.toLocaleString('it-IT');
    //console.log("PASSI: "+steps+" KCALB: "+kcalBruciate);
    //AGGIORNO LA DIDASCALIA DELLA CARD DEL GRAFICO
    const kcalBruciateOggiH3 = document.getElementById('kcalBruciateOggi');
    kcalBruciateOggiH3.innerText = kcalBruciateFormattato + " Kcal";
    let obbiettivo = (obbiettivoPassi * 0.05) - kcalBruciate;
    if (obbiettivo < 0) {
        obbiettivo = 0;
    }
    // Dati per il grafico
    const datiGrafico = {
        labels: ['KCal Bruciate', 'Rimanenti'],
        datasets: [{
            label: 'KCal',
            data: [kcalBruciate, obbiettivo], // Esempio: 2200 KCal totali, sottrae le KCal bruciate
            backgroundColor: ['#165BAA', 'lightgrey'],
            hoverOffset: 4 // Spessore della fetta al passaggio del mouse
        }]
    };

    // Configurazione del grafico
    const config = {
        type: 'doughnut',
        data: datiGrafico,
        options: {
            responsive: true,
            maintainAspectRatio: false, // Permette di disabilitare l'aspect ratio per il controllo delle dimensioni
            plugins: {
                legend: {
                    display: true // Mostra la legenda
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' KCal';
                        }
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 0 // Rimuovi i bordi delle fette
                }
            }
        }
    };

    // Creazione e rendering del grafico
    var myChart = new Chart(
        document.getElementById('graficoKcalBruciateOggi'),
        config
    );
}
/* Esempio di utilizzo
const userId = 1;
const date = "2024-06-27";
graficoKcalBruciateOggi(data, userId, date);*/



// funzione per stampare i passi effettuati oggi
function graficoPassiOggi(data, userId, date) {
    // Trova i passi dell'utente per la data specificata
    const steps = getStepsByUserIdAndDate(data, userId, date);
    // Formatta il numero con separatore delle migliaia
    const stepsFormattato = steps.toLocaleString('it-IT');
    //AGGIORNO LA DIDASCALIA DELLA CARD DEL GRAFICO
    const passiOggiH3 = document.getElementById('passiOggi');
    passiOggiH3.innerText = stepsFormattato + " / " + obbiettivoPassi.toLocaleString('it-IT');
    let obbiettivo = obbiettivoPassi - steps;
    if (obbiettivo < 0) { obbiettivo = 0; }
    // Dati per il grafico
    const datiGrafico = {
        labels: ['Passi', 'Rimanenti'],
        datasets: [{
            label: 'Passi',
            data: [steps, obbiettivo], // Esempio: 400 passi, 600 rimanenti
            backgroundColor: ['#165BAA', 'lightgrey'],
            hoverOffset: 4 // Spessore della fetta al passaggio del mouse
        }]
    };

    // Configurazione del grafico
    const config = {
        type: 'doughnut',
        data: datiGrafico,
        options: {
            responsive: true,
            maintainAspectRatio: false, // Permette di disabilitare l'aspect ratio per il controllo delle dimensioni
            plugins: {
                legend: {
                    display: true // false Nascondi la legenda
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' Passi';
                        }
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 0 // Rimuovi i bordi delle fette
                }
            }
        }
    };

    // Creazione e rendering del grafico
    var myChart = new Chart(
        document.getElementById('graficoPassiOggi'),
        config
    );
}
//---[ FINE SETTAGGIO GRAFICI ]---


//---[ INOLTRO RICHIESTA FORM AGGIUNGI PASSI A PHP ]---
function aggiungiPassiFormPHP() {
    document.getElementById('btnAggiungiPassi').addEventListener('click', function () {
        const passiSvolti = document.getElementById('aggiungiPassiSvolti').value;
        const data = document.getElementById('aggiungiPassiData').value;

        const newSteps = {
            "userId": userId,
            "date": data,
            "steps": parseInt(passiSvolti)
        };

        fetch('php/aggiungiPassi.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSteps)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successo:', data);
                if (data.message) {
                    // Ricarica la cache e la pagina
                    aggiornaCacheEDati();
                }                
            })
            .catch(error => {
                console.error('Errore:', error);
            });
            aggiornaCacheEDati();
            aggiornaCacheEDati();
    });
}


// CONTROLLI PER APERTURA CHIUSURA PANNELLO AGGIUNGI PASSI
document.addEventListener('DOMContentLoaded', function () {
    var pannelloAggiungiPassi = document.getElementById('pannelloAggiungiPassi');
    var bottoneApri = document.getElementById('bottoneApriPannelloAggiungiPassi');
    var bottoneChiudiDesktop = document.getElementById('bottoneChiudiDesktopPassi');
    var bottoneChiudiMobile = document.getElementById('bottoneChiudiMobilePassi');

    // Funzione per mostrare il pannello aggiungi passi
    function mostraPannello() {
        if (pannelloAggiungiPassi.style.display !== 'block') {
            pannelloAggiungiPassi.style.display = 'block';
            console.log("Pannello mostrato");
        }
    }

    // Funzione per nascondere il pannello aggiungi passi
    function nascondiPannello() {
        if (pannelloAggiungiPassi.style.display === 'block') {
            pannelloAggiungiPassi.style.display = 'none';
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