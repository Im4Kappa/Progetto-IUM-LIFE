<?php
// Percorso del file JSON
$file = '../data/diarioUtenti.json';

// Ottieni i dati inviati dalla richiesta POST
$postData = json_decode(file_get_contents('php://input'), true);

// Funzione per generare un noteId casuale
function generateRandomId($length = 8) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=';
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $randomString;
}

$newNote = [
    "noteId" => generateRandomId(), // Genera un noteId casuale
    "title" => $postData['title'],
    "text" => $postData['text'],
    "date" => date('Y-m-d') // Utilizza la data corrente come data della nota
];

// Decodifica il contenuto del file JSON in un array associativo
$data = json_decode(file_get_contents($file), true);

// Trova l'utente nel JSON in base all'userID
$userId = $postData['userId'];
$userIndex = array_search($userId, array_column($data['users'], 'userId'));

if ($userIndex !== false) {
    // Aggiungi la nuova nota all'array di note dell'utente
    array_unshift($data['users'][$userIndex]['notes'], $newNote);

    // Codifica nuovamente i dati in formato JSON
    $jsonData = json_encode($data, JSON_PRETTY_PRINT);

    // Scrivi i dati nel file JSON
    if (file_put_contents($file, $jsonData)) {
        echo json_encode(['message' => 'Nota aggiunta con successo', 'noteId' => $newNote['noteId']]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Errore durante l\'aggiornamento del file JSON']);
    }
} else {
    http_response_code(404); // Not Found
    echo json_encode(['error' => 'Utente non trovato']);
}
?>
