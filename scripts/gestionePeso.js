// Funzione per ottenere i dati del peso per un determinato userId
function getWeightsData(data, userId) {
    const userData = data.users.find(user => user.userId === userId);
    return userData ? userData.weights : [];
}

//---[SETTAGGIO GRAFICI]---
// Funzione per disegnare il grafico del peso in ordine crescente di data
function graficoPeso(data1, userId) {
    // Ottieni i dati del peso per l'utente specificato
    const weightsData = getWeightsData(data1, userId);

    const pesoRecente = document.getElementById("pesoRecente");
    pesoRecente.innerHTML = weightsData[0].weight + " KG / Obbiettivo: " + obbiettivoIBMUtente + " KG";

    /*Aggiorna il campo di aggiunta peso */
    if (document.getElementById("aggiungiPeso")) {
        document.getElementById("aggiungiPeso").value = weightsData[0].weight;
    }

    // Ordina i dati per data in ordine crescente
    weightsData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Prepara i dati per il grafico
    const data = {
        labels: weightsData.map(item => item.date),
        datasets: [{
            label: `Progresso Peso - Utente ${userId}`,
            data: weightsData.map(item => item.weight),
            borderColor: '#0044CC', // Blu scuro, esadecimale
            fill: false
        }]
    };

    // Opzioni del grafico
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false // Nasconde la legenda
            }
        }
    };

    // Ottieni il contesto del canvas e crea il grafico
    const ctx = document.getElementById('graficoPeso').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

//---[ INOLTRO RICHIESTA FORM AGGIUNGI PESO A PHP ]---
function aggiungiPesoFormPHP() {
    document.getElementById('btnAggiungiPeso').addEventListener('click', function () {
        const peso = document.getElementById('aggiungiPeso').value;

        // Ottieni la data corrente nel formato "YYYY-MM-DD"
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`; // Aggiunge lo zero iniziale se il mese è inferiore a 10
        }
        let day = today.getDate();
        if (day < 10) {
            day = `0${day}`; // Aggiunge lo zero iniziale se il giorno è inferiore a 10
        }
        const data = `${year}-${month}-${day}`;

        const newWeight = {
            "userId": userId,
            "date": data,
            "weight": parseFloat(peso)
        };

        fetch('php/aggiungiPeso.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWeight)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successo:', data);
                if (data.message) {
                    // Ricarica la cache e la pagina
                    aggiornaCacheEDati("pesoUtenti.json");
                    aggiornaCacheEDati("utenti.json");
                }
            })
            .catch(error => {
                console.error('Errore:', error);
            });
        aggiornaCacheEDati("pesoUtenti.json");
        aggiornaCacheEDati("utenti.json");
    });
}



// CONTROLLI PER APERTURA CHIUSURA PANNELLO AGGIUNGI PESO
document.addEventListener('DOMContentLoaded', function () {
    var pannelloAggiungiPeso = document.getElementById('pannelloAggiungiPeso');
    var bottoneApri = document.getElementById('bottoneApriPannelloAggiungiPeso');
    var bottoneChiudiDesktop = document.getElementById('bottoneChiudiDesktopPeso');
    var bottoneChiudiMobile = document.getElementById('bottoneChiudiMobilePeso');

    // Funzione per mostrare il pannello aggiungi peso
    function mostraPannello() {
        if (pannelloAggiungiPeso.style.display !== 'block') {
            pannelloAggiungiPeso.style.display = 'block';
            console.log("Pannello mostrato");
        }
    }

    // Funzione per nascondere il pannello aggiungi peso
    function nascondiPannello() {
        if (pannelloAggiungiPeso.style.display === 'block') {
            pannelloAggiungiPeso.style.display = 'none';
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

