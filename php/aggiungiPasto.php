<?php
// Percorso del file JSON contenente i dati di alimentazione giornaliera degli utenti
$file = '../data/alimentazioneGiornalieraUtenti.json';

// Verifica che sia una richiesta POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array('message' => 'Metodo non consentito'));
    exit;
}

// Leggi e decodifica i dati JSON inviati
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se sono stati ricevuti dati validi
if (!$data || !isset($data['userId']) || !isset($data['tipoPasto']) || !isset($data['pasto'])) {
    http_response_code(400);
    echo json_encode(array('message' => 'Dati non validi o incompleti'));
    exit;
}

$userId = $data['userId'];
$tipoPasto = $data['tipoPasto'];
$pasto = $data['pasto'];

// Carica il contenuto attuale del file JSON
$currentData = json_decode(file_get_contents($file), true);

if (!$currentData) {
    http_response_code(500);
    echo json_encode(array('message' => 'Errore nel caricamento dei dati'));
    exit;
}

// Trova l'utente corrispondente
$index = -1;
foreach ($currentData as $key => $item) {
    if ($item['userId'] == $userId) {
        $index = $key;
        break;
    }
}

if ($index == -1) {
    http_response_code(404);
    echo json_encode(array('message' => 'Utente non trovato'));
    exit;
}

// Aggiungi il nuovo pasto al tipo di pasto corretto
$currentData[$index]['data'][] = array(
    'date' => date('Y-m-d'), // Aggiungi la data corrente
    'pasti' => array(
        $tipoPasto => array(
            'pasto' => $pasto['pasto'],
            'calories' => $pasto['calories']
        )
    )
);

// Salva i dati aggiornati nel file JSON
if (file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT))) {
    http_response_code(200);
    echo json_encode(array('message' => 'Pasto aggiunto con successo'));
} else {
    http_response_code(500);
    echo json_encode(array('message' => 'Errore durante il salvataggio dei dati'));
}
?>
