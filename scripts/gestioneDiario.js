document.addEventListener('DOMContentLoaded', function () {
    const pathToDiarioJson = 'data/diarioUtenti.json';

    // Funzione per caricare il file JSON
    function fetchJSONFile(path, callback) {
        fetch(path)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Errore nel caricamento del file JSON:', error));
    }

    // Funzione per creare le cards delle note di un utente specifico
    function creaCardsDiario(diarioData) {
        const pannelloDiario = document.getElementById('pannelloDiario');
        let row = null; // Variabile per tenere traccia della row corrente

        diarioData.users.forEach(user => {
            if (user.userId === idSessione) {
                // Ordina le note in base alla data, dalla più recente alla meno recente
                user.notes.sort((a, b) => new Date(b.date) - new Date(a.date));

                user.notes.forEach((note, index) => {
                    // Controlla se è necessario aggiungere una nuova row ogni due cards
                    if (index % 2 === 0) {
                        row = document.createElement('div');
                        row.classList.add('row', 'mb-3');
                        pannelloDiario.appendChild(row);
                    }

                    const card = document.createElement('div');
                    card.classList.add('col-md-6', 'mt-4');

                    card.innerHTML = `
                        <div class="text-dark">
                            <div class="card border-0 note-card">
                                <div class="card">
                                    <div class="card-body text-left">
                                        <h5 class="card-title text-muted">Nota #${note.noteId}, ultima modifica: ${note.date}</h5>
                                        <div class="d-flex display-inline">
                                            <h3 class="card-text mb-1 fw-bold">${note.title}</h3>
                                        </div>
                                        <hr>
                                        <div class="note-text">${note.text.slice(0, 60)}...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // Aggiungi evento di click per espandere/contrarre il testo della nota
                    card.addEventListener('click', function () {
                        const noteText = card.querySelector('.note-text');
                        if (noteText.textContent.endsWith('...')) {
                            noteText.textContent = note.text; // Espandi il testo completo
                        } else {
                            noteText.textContent = note.text.slice(0, 60) + '...'; // Contrai il testo
                        }
                    });

                    row.appendChild(card);
                });
            }
        });
    }

    // Carica il file JSON del diario e crea le cards per l'utente specifico
    fetchJSONFile(pathToDiarioJson, creaCardsDiario);
});




// CONTROLLI PER APERTURA CHIUSURA PANNELLO AGGIUNGI NOTA
document.addEventListener('DOMContentLoaded', function () {
    var pannelloAggiungiNota = document.getElementById('pannelloAggiungiNota');
    var bottoneApri = document.getElementById('bottoneApriPannelloAggiungiNota');
    var bottoneChiudiDesktop = document.getElementById('bottoneChiudiDesktopNota');
    var bottoneChiudiMobile = document.getElementById('bottoneChiudiMobileNota');

    // Funzione per mostrare il pannello aggiungi nota
    function mostraPannello() {
        if (pannelloAggiungiNota.style.display !== 'block') {
            pannelloAggiungiNota.style.display = 'block';
            console.log("Pannello mostrato");
        }
    }

    // Funzione per nascondere il pannello aggiungi nota
    function nascondiPannello() {
        if (pannelloAggiungiNota.style.display === 'block') {
            pannelloAggiungiNota.style.display = 'none';
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


document.addEventListener('DOMContentLoaded', function () {
    const formAggiungiNota = document.getElementById('formAggiungiNota');

    formAggiungiNota.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita il comportamento di default del submit del form

        const titolo = document.getElementById('aggiungiNotaTitolo').value;
        const testo = document.getElementById('aggiungiNotaTesto').value;

        const newData = {
            userId: getIdSessione(), // Passa l'ID dell'utente corrente
            title: titolo,
            text: testo,
            date: new Date().toISOString().slice(0, 10) // Data odierna in formato YYYY-MM-DD
        };

        // Invio dei dati al PHP
        fetch('php/aggiungiNota.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successo:', data);
                aggiornaCacheEDati("diarioUenti.json");
                // Inserisci qui eventuali azioni dopo l'invio dei dati
            })
            .catch(error => {
                console.error('Errore:', error);
            });
            aggiornaCacheEDati("diarioUenti.json");

        // Resetta il form dopo l'invio
        formAggiungiNota.reset();
    });
});



