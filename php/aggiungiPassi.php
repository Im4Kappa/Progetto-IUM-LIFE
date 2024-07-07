<?php
// Percorso del file JSON
$file = '../data/passiUtenti.json';

// Ottieni i dati inviati dalla richiesta POST
$postData = json_decode(file_get_contents('php://input'), true);

$newSteps = [
    "date" => $postData['date'],
    "steps" => $postData['steps']
];

// Decodifica il contenuto del file JSON in un array associativo
$data = json_decode(file_get_contents($file), true);

// Trova l'utente nel JSON in base all'userID
$userId = $postData['userId'];
$userIndex = array_search($userId, array_column($data['users'], 'userId'));

if ($userIndex !== false) {
    // Verifica se esiste già un passo per la data specificata
    $dateIndex = array_search($newSteps['date'], array_column($data['users'][$userIndex]['steps'], 'date'));

    if ($dateIndex !== false) {
        // Se la data esiste, sostituisci i passi
        $data['users'][$userIndex]['steps'][$dateIndex]['steps'] = $newSteps['steps'];
    } else {
        // Se la data non esiste, aggiungi i nuovi passi in testa all'array
        array_unshift($data['users'][$userIndex]['steps'], $newSteps);
    }

    // Codifica nuovamente i dati in formato JSON
    $jsonData = json_encode($data, JSON_PRETTY_PRINT);

    // Scrivi i dati nel file JSON
    if (file_put_contents($file, $jsonData)) {
        echo json_encode(['message' => 'Passi aggiunti con successo']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Errore durante l\'aggiornamento del file JSON']);
    }
} else {
    http_response_code(404); // Not Found
    echo json_encode(['error' => 'Utente non trovato']);
}
?>