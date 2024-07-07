document.addEventListener("DOMContentLoaded", function () {
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
    })
    .catch(error => console.error('Error loading the navbar:', error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
    })
    .catch(error => console.error('Error loading the headbar:', error));
});


//verifico se l'utente è loggato
if(localStorage.getItem('idSessioneUtente'))
{
  console.log("OK VAI");
}
else
{
  window.location.href = 'accessoNegato.html';
}