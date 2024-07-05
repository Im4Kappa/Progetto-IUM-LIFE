<?php
// Percorso del file JSON
$jsonFile = '../data/diarioUtenti.json';

// Ricevi i dati inviati tramite POST
$postData = json_decode(file_get_contents('php://input'), true);

// Genera un ID casuale alfanumerico di lunghezza 3 per noteId
function generateRandomId() {
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    $randomString = '';
    for ($i = 0; $i < 3; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}

// Genera noteId casuale
$noteId = generateRandomId();

// Carica il contenuto del file JSON
$jsonData = file_get_contents($jsonFile);
$diarioUtenti = json_decode($jsonData, true);

// Trova l'utente nel JSON in base all'userID
$userId = $postData['userId'];
$userIndex = array_search($userId, array_column($diarioUtenti['users'], 'userId'));

if ($userIndex !== false) {
    // Aggiungi la nuova nota all'inizio dell'array di note dell'utente
    $newNote = [
        'noteId' => $noteId,
        'title' => $postData['title'],
        'text' => $postData['text'],
        'date' => $postData['date']
    ];

    array_unshift($diarioUtenti['users'][$userIndex]['notes'], $newNote);

    // Codifica nuovamente i dati in formato JSON
    $jsonUpdated = json_encode($diarioUtenti, JSON_PRETTY_PRINT);
    file_put_contents($jsonFile, $jsonUpdated);

    // Rispondi con una conferma (puoi personalizzare a seconda delle tue esigenze)
    echo json_encode(['message' => 'Nota aggiunta con successo!', 'noteId' => $noteId]);
} else {
    http_response_code(404); // Not Found
    echo json_encode(['error' => 'Utente non trovato']);
}
?>
