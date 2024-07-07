<?php
// Imposta l'header per il tipo di contenuto JSON
header('Content-Type: application/json');

// Ottieni i dati inviati dal client
$input = json_decode(file_get_contents('php://input'), true);

$userId = $input['userId'];
$tipoPasto = ucfirst(strtolower($input['tipoPasto']));  // Prima lettera maiuscola, resto minuscolo
$newItem = $input['pasto'];

// Percorso del file JSON
$jsonFilePath = '../data/alimentazioneGiornalieraUtenti.json';

// Verifica se il file JSON esiste e può essere letto
if (!file_exists($jsonFilePath) || !is_readable($jsonFilePath)) {
    echo json_encode(['error' => 'File not found or not readable']);
    exit;
}

// Leggi il contenuto del file JSON
$jsonData = file_get_contents($jsonFilePath);

// Decodifica il JSON in un array PHP
$data = json_decode($jsonData, true);

// Verifica se la decodifica è avvenuta con successo
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'JSON decoding error']);
    exit;
}

// Funzione per aggiungere un nuovo pasto
function addMealItem(&$data, $userId, $tipoPasto, $newItem) {
    $dateFound = false;
    foreach ($data as &$user) {
        if ($user['userId'] == $userId) {
            // Trova l'ultima data
            usort($user['data'], function($a, $b) {
                return strtotime($b['date']) - strtotime($a['date']);
            });

            // Se la data esiste già, aggiungi il pasto alla sezione giusta
            foreach ($user['data'] as &$dayData) {
                if ($dayData['date'] == date('Y-m-d')) {
                    $dayData['pasti'][$tipoPasto][] = $newItem;
                    $dateFound = true;
                    break;
                }
            }

            // Se la data non esiste, crea una nuova data e aggiungi il pasto
            if (!$dateFound) {
                $newDayData = [
                    "date" => date('Y-m-d'),
                    "pasti" => [
                        "Colazione" => [],
                        "Pranzo" => [],
                        "Cena" => [],
                        "Spuntini" => []
                    ]
                ];
                $newDayData['pasti'][$tipoPasto][] = $newItem;
                array_unshift($user['data'], $newDayData);
            }
            break;
        }
    }
}

// Aggiungi il nuovo pasto per l'utente specificato
addMealItem($data, $userId, $tipoPasto, $newItem);

// Codifica l'array di nuovo in JSON
$newJsonData = json_encode($data, JSON_PRETTY_PRINT);

// Verifica se la codifica è avvenuta con successo
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'JSON encoding error']);
    exit;
}

// Scrivi i dati aggiornati nel file JSON
if (file_put_contents($jsonFilePath, $newJsonData) === false) {
    echo json_encode(['error' => 'Error writing to file']);
    exit;
}

// Stampa il nuovo JSON
echo $newJsonData;
?>
