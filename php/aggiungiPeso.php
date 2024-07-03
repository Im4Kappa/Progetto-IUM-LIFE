<?php
// Percorso dei file JSON
$filePesiUtenti = '../data/pesoUtenti.json';
$fileUtenti = '../data/utenti.json';

// Ricevi i dati inviati dalla richiesta POST
$postData = json_decode(file_get_contents('php://input'), true);

// Verifica se i dati richiesti sono stati ricevuti correttamente
if (!$postData || !isset($postData['userId']) || !isset($postData['weight']) || !isset($postData['date'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Dati non validi o incompleti']);
    exit;
}

// Leggi il contenuto attuale del file JSON di pesiUtenti
$currentDataPesiUtenti = json_decode(file_get_contents($filePesiUtenti), true);

// Trova l'indice dell'utente nel file JSON di pesiUtenti
$userIndexPesiUtenti = array_search($postData['userId'], array_column($currentDataPesiUtenti['users'], 'userId'));

// Se l'utente esiste, controlla se esiste già un peso con la stessa data
if ($userIndexPesiUtenti !== false) {
    $weights = &$currentDataPesiUtenti['users'][$userIndexPesiUtenti]['weights']; // Riferimento all'array 'weights'

    // Cerca se esiste già un peso con la stessa data
    $weightIndex = array_search($postData['date'], array_column($weights, 'date'));

    if ($weightIndex !== false) {
        // Sostituisci il peso esistente con il nuovo peso
        $weights[$weightIndex]['weight'] = $postData['weight'];
    } else {
        // Aggiungi il nuovo peso in testa all'array 'weights'
        array_unshift($weights, [
            'date' => $postData['date'],
            'weight' => $postData['weight']
        ]);
    }

    // Codifica nuovamente i dati di pesiUtenti in formato JSON
    $jsonDataPesiUtenti = json_encode($currentDataPesiUtenti, JSON_PRETTY_PRINT);

    // Scrivi i dati di pesiUtenti nel file JSON
    if (!file_put_contents($filePesiUtenti, $jsonDataPesiUtenti)) {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Errore durante l\'aggiornamento del file JSON di pesiUtenti']);
        exit;
    }
} else {
    http_response_code(404); // Not Found
    echo json_encode(['error' => 'Utente non trovato nel file JSON di pesiUtenti']);
    exit;
}

// Ora aggiorna il peso anche nel file JSON utenti.json
$currentDataUtenti = json_decode(file_get_contents($fileUtenti), true);

// Trova l'indice dell'utente nel file JSON utenti
$userIndexUtenti = array_search($postData['userId'], array_column($currentDataUtenti, 'userId'));

// Se l'utente esiste, aggiorna il peso
if ($userIndexUtenti !== false) {
    $currentDataUtenti[$userIndexUtenti]['peso'] = $postData['weight'];

    // Codifica nuovamente i dati di utenti in formato JSON
    $jsonDataUtenti = json_encode($currentDataUtenti, JSON_PRETTY_PRINT);

    // Scrivi i dati di utenti nel file JSON
    if (!file_put_contents($fileUtenti, $jsonDataUtenti)) {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Errore durante l\'aggiornamento del file JSON di utenti']);
        exit;
    }
} else {
    http_response_code(404); // Not Found
    echo json_encode(['error' => 'Utente non trovato nel file JSON di utenti']);
    exit;
}

// Se tutto è andato bene, restituisci un messaggio di successo
echo json_encode(['message' => 'Peso aggiunto o aggiornato con successo in entrambi i file']);
?>
