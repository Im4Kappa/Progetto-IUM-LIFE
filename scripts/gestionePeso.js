// Funzione per ottenere i dati del peso per un determinato userId
function getWeightsData(data, userId) {
    const userData = data.users.find(user => user.userId === userId);
    return userData ? userData.weights : [];
}

//---[SETTAGGIO GRAFICI]---
// Funzione per disegnare il grafico del peso in ordine crescente di data
function graficoPeso(data1, userId) {
    // Ottieni i dati del peso per l'utente specificato
    const weightsData = getWeightsData(data1, userId);

    // Ordina i dati per data in ordine crescente
    weightsData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Prepara i dati per il grafico
    const data = {
        labels: weightsData.map(item => item.date),
        datasets: [{
            label: `Progresso Peso - Utente ${userId}`,
            data: weightsData.map(item => item.weight),
            borderColor: '#0044CC', // Blu scuro, esadecimale
            fill: false
        }]
    };

    // Opzioni del grafico
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false // Nasconde la legenda
            }
        }
    };

    // Ottieni il contesto del canvas e crea il grafico
    const ctx = document.getElementById('graficoPeso').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

