<?php

// Percorso del file JSON per il sonno
$file = '../data/sonnoUtenti.json';

// Ricevi i dati POST
$postData = json_decode(file_get_contents('php://input'), true);

// Verifica se i dati sono validi
if (isset($postData['userId']) && isset($postData['date']) && isset($postData['sleepHours'])) {
    // Leggi il contenuto del file JSON esistente
    $currentData = file_get_contents($file);

    // Decodifica il JSON in un array associativo
    $currentDataArray = json_decode($currentData, true);

    // Trova l'utente corrispondente o crea un nuovo array per l'utente
    $userFound = false;
    foreach ($currentDataArray['users'] as &$user) {
        if ($user['userId'] === $postData['userId']) {
            // Cerca se esiste già una voce per la stessa data e sovrascrivi se trovata
            $dataExists = false;
            foreach ($user['sleepHours'] as &$sleepEntry) {
                if ($sleepEntry['date'] === $postData['date']) {
                    // Sovrascrivi le ore di sonno per la data esistente
                    $sleepEntry['hours'] = $postData['sleepHours'];
                    $dataExists = true;
                    break;
                }
            }
            
            // Se non esiste già, aggiungi una nuova voce all'inizio dell'array delle ore di sonno
            if (!$dataExists) {
                array_unshift($user['sleepHours'], [
                    'date' => $postData['date'],
                    'hours' => $postData['sleepHours']
                ]);
            }
            
            $userFound = true;
            break;
        }
    }

    // Se l'utente non è stato trovato, crea un nuovo utente
    if (!$userFound) {
        $newUser = [
            'userId' => $postData['userId'],
            'sleepHours' => [
                [
                    'date' => $postData['date'],
                    'hours' => $postData['sleepHours']
                ]
            ]
        ];
        $currentDataArray['users'][] = $newUser;
    }

    // Codifica l'array aggiornato in JSON
    $jsonData = json_encode($currentDataArray, JSON_PRETTY_PRINT);

    // Scrivi il JSON nel file
    if (file_put_contents($file, $jsonData)) {
        // Rispondi con un messaggio di successo
        echo json_encode(['message' => 'Dati aggiunti con successo']);
    } else {
        // Rispondi con un errore di scrittura nel file
        http_response_code(500);
        echo json_encode(['error' => 'Impossibile scrivere nel file JSON']);
    }
} else {
    // Rispondi con un errore se i dati POST sono incompleti o non validi
    http_response_code(400);
    echo json_encode(['error' => 'Dati POST non validi o incompleti']);
}

?>
