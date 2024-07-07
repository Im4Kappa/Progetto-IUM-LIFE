document.addEventListener("DOMContentLoaded", function () {
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Esegui il logout dell'utente
    // Ad esempio, pulisci localStorage o cookie
    //console.log("usrId "+localStorage.getItem('idSessioneUtente'));
    localStorage.removeItem('idSessioneUtente'); // Rimuovi l'id di sessione utente
    //console.log("usrId "+localStorage.getItem('idSessioneUtente'));
    // Reindirizza l'utente alla pagina di login o alla home
    window.location.href = 'index.html'; // Cambia 'index.html' con il percorso corretto
});
});