<?php

// Percorso del file JSON
$file = './data/alimentazioneGiornalieraUtenti.json';

// Leggi il contenuto del file JSON
$currentData = json_decode(file_get_contents($file), true);

// Dati ricevuti dal form
$userId = $_POST['userId'];
$currentDate = $_POST['date'];
$tipoPasto = ucfirst($_POST['tipoPasto']); // Prima lettera maiuscola
$pasto = $_POST['pasto'];
$calories = $_POST['calories'];

// Trova l'utente nell'array dei dati
$userIndex = -1;
foreach ($currentData as $index => $user) {
    if ($user['userId'] == $userId) {
        $userIndex = $index;
        break;
    }
}

if ($userIndex === -1) {
    // Utente non trovato, gestire come preferisci (es. errore)
    die("Utente non trovato.");
}

// Cerca se esiste già una data con il valore specificato
$dateIndex = false;
foreach ($currentData[$userIndex]['data'] as $index => $data) {
    if ($data['date'] === $currentDate) {
        $dateIndex = $index;
        break;
    }
}

// Verifica se la data esiste già
if ($dateIndex !== false) {
    // La data esiste già, verifica e aggiungi il pasto al tipo di pasto corretto
    if (!isset($currentData[$userIndex]['data'][$dateIndex]['pasti'][$tipoPasto])) {
        $currentData[$userIndex]['data'][$dateIndex]['pasti'][$tipoPasto] = array();
    }
    $currentData[$userIndex]['data'][$dateIndex]['pasti'][$tipoPasto][] = array(
        'pasto' => $pasto,
        'calories' => $calories
    );
} else {
    // La data non esiste, crea una nuova entry per la data corrente
    $newDay = array(
        'date' => $currentDate,
        'pasti' => array(
            'Colazione' => array(),
            'Pranzo' => array(),
            'Cena' => array(),
            'Spuntini' => array()
        )
    );

    // Aggiungi il pasto al tipo di pasto corretto
    $newDay['pasti'][$tipoPasto][] = array(
        'pasto' => $pasto,
        'calories' => $calories
    );

    // Aggiungi la nuova data all'array dei dati dell'utente corretto
    $currentData[$userIndex]['data'][] = $newDay;
}

// Scrivi i dati aggiornati nel file JSON
file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT));

// Messaggio di conferma
echo "Pasto aggiunto con successo per l'utente $userId.";

?>
