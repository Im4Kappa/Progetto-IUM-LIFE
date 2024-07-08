# README - Progetto LIFE

## Descrizione del Progetto

**LIFE** è un progetto sviluppato per l'esame di **Interazione Uomo Macchina (IUM)**. Il progetto si concentra sull'implementazione di principi avanzati di interazione tra l'utente e il sistema, utilizzando tecnologie web.

## Requisiti

- **XAMPP**: XAMPP è necessario per eseguire il progetto su un server locale. Include Apache, MariaDB, PHP e Perl ed è disponibile per Windows, Linux e macOS.
- **Browser Web**: Per visualizzare e interagire con l'interfaccia del progetto.
- **Editor di Testo/IDE**: Per eventuali modifiche al codice sorgente (es. Visual Studio Code, Sublime Text, PHPStorm).

## Istruzioni per l'Installazione

### Passo 1: Installazione di XAMPP

Scarica XAMPP dal sito ufficiale: [Apache Friends - XAMPP](https://www.apachefriends.org/index.html).
Segui le istruzioni di installazione per il tuo sistema operativo.

### Passo 2: Configurazione di XAMPP

1. Avvia il Pannello di Controllo di XAMPP.
2. Assicurati che i moduli **Apache** e **MySQL** siano avviati cliccando sui pulsanti "Start".

### Passo 3: Preparazione del Progetto

Clona il repository LIFE nella directory `htdocs` di XAMPP. Ecco un esempio di come farlo via linea di comando:

```bash
git clone https://github.com/Im4Kappa/Progetto-IUM-LIFE.git
```

Verifica che i file del progetto siano situati in C:\xampp\htdocs\Progetto-IUM-LIFE (per Windows) o /opt/lampp/htdocs/Progetto-IUM-LIFE (per Linux/macOS).

**Passo 4**: Avvio del Progetto

Apri il tuo browser web.
Naviga all'indirizzo http://localhost/Progetto-IUM-LIFE.
Dovresti visualizzare la pagina principale del progetto LIFE e poter interagire con tutte le funzionalità disponibili.
Struttura del Progetto
La struttura del progetto LIFE è la seguente:
```
Progetto-IUM-LIFE/
├── data/
│   └── alimentazioneGiornalieraUtente.json
│   └── alimenti.json
│   └── diarioUtenti.json
│   └── passiUtenti.json
│   └── pesoUtenti.json
│   └── sonnoUtenti.json
│   └── utenti.json
├── php/
│   └── aggiungiNota.php
│   └── aggiungiPassi.php
│   └── aggiungiPasto.php
│   └── aggiungiPeso.php
│   └── aggiungiSonno.php
│   └── modificaInfoUtenti.php
├── res/
│   └── Resource
├── scripts/
│   └── caricaJSON.js
│   └── consiglio.js
│   └── gestioneAlimentazione.js
│   └── gestioneDashboard.js
│   └── gestioneDiario.js
│   └── gestioneInfoUtente.js
│   └── gestionePassi.js
│   └── gestionePeso.js
│   └── gestioneSonno.js
│   └── gestioneUtente.js
│   └── importHeaderNavbar.js
│   └── login.js
│   └── logout.js
│   └── utils.js
├── styles/
│   └── dashboard.css
│   └── diario.css
│   └── general.css
│   └── header.css
│   └── loginRegistrazione.css
│   └── navbar.css
│   └── sonno.css
│   └── variabilies.css
├── index.html
├── diario.html
├── accessoNegato.html
├── dashboardAlimentazione.html
├── dashboardAttivitaFisica.html
├── dashboardSonno.html
├── dashboardUtente.html
├── diario.html
├── header.html
├── infoUtente.html
├── navbar.html
├── registrazione.html
└── README.md
```
## Contributori
- **Mario Zaccardi**: [m.zaccardi@studenti.unisa.it]
- **Alfonso Pollastro**: [a.pollastro@studenti.unisa.it]
- **Domenico Arcamone**: [d.arcamone@studenti.unisa.it]


Grazie per aver utilizzato LIFE! In caso di domande o suggerimenti, non esitare a contattarci.
