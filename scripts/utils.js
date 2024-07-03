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


function aggiornaCacheEDati() {
    // Aggiungi un timestamp per invalidare la cache
    const timestamp = new Date().getTime();
    fetch(`data/passiUtenti.json?cacheBuster=${timestamp}`)
        .then(response => response.json())
        .then(data => {
            // Ricarica i dati e aggiorna il grafico o altri elementi della pagina
            console.log('Dati aggiornati:', data);
            window.location.reload(); // Ricarica la pagina
        })
        .catch(error => {
            console.error('Errore nel ricaricare i dati:', error);
        });
}

