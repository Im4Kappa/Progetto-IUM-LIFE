<?php
// Percorso del file JSON
$file = '../data/utenti.json';

// Ottieni i dati inviati dalla richiesta POST
$postData = json_decode(file_get_contents('php://input'), true);

$userId = $postData['userId'];
$nome = $postData['nome'];
$cognome = $postData['cognome'];
$eta = $postData['eta'];
$sesso = $postData['sesso'];
$altezza = $postData['altezza'];
$password = $postData['password'];
$obbiettivoPassi = $postData['obbiettivoPassi'];

// Decodifica il contenuto del file JSON in un array associativo
$data = json_decode(file_get_contents($file), true);

// Trova l'utente nel JSON in base all'userID
$userIndex = array_search($userId, array_column($data, 'userId'));

if ($userIndex !== false) {
    // Aggiorna i dati dell'utente
    $data[$userIndex]['nome'] = $nome;
    $data[$userIndex]['cognome'] = $cognome;
    $data[$userIndex]['eta'] = $eta;
    $data[$userIndex]['sesso'] = $sesso;
    $data[$userIndex]['altezza'] = $altezza;
    $data[$userIndex]['password'] = $password;
    $data[$userIndex]['obbiettivoPassi'] = $obbiettivoPassi;

    // Codifica nuovamente i dati in formato JSON
    $jsonData = json_encode($data, JSON_PRETTY_PRINT);

    // Scrivi i dati nel file JSON
    if (file_put_contents($file, $jsonData)) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'error' => 'Errore durante l\'aggiornamento del file JSON']);
    }
} else {
    http_response_code(404); // Not Found
    echo json_encode(['success' => false, 'error' => 'Utente non trovato']);
}
?>
