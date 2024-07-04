document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('pwdInput').value;

        fetch('data/utenti.json')
            .then(response => response.json())
            .then(data => {
                const user = data.find(u => u.email === email && u.password === password);
                if (user) {
                    const userId = user.userId;
                    const sessionData = { userId };

                    // Simulazione di salvataggio su localStorage (da sostituire con metodo server-side)
                    localStorage.setItem('idSessioneUtente', JSON.stringify(sessionData));

                    // Esempio di redirect alla dashboard dopo il login
                    window.location.href = 'dashboardUtente.html';
                    //console.log(getIdSessione());
                } else {
                    document.getElementById('errorMessage').classList.remove('d-none');
                }
            })
            .catch(error => console.error('Errore nel caricamento dei dati degli utenti:', error));
    });
});
