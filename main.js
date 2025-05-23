document.getElementById('shareBtn').addEventListener('click', () => {
    // Se hai un file "gps" con coordinate (formato: "lat,lng")
    fetch('gps')
        .then(response => response.text())
        .then(data => {
            const [lat, lng] = data.trim().split(',');
            const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
            
            // Mostra il link nella pagina
            document.getElementById('linkContainer').innerHTML = `
                <a href="${mapsUrl}" target="_blank">Apri in Google Maps</a>
                <p>Oppure condividi questo link su Telegram:</p>
                <input type="text" value="${mapsUrl}" id="mapsLink" readonly>
                <button onclick="copyLink()">Copia Link</button>
            `;
        })
        .catch(error => {
            console.error("Errore:", error);
            alert("Coordinate non trovate nel file 'gps'!");
        });
});

function copyLink() {
    const link = document.getElementById('mapsLink');
    link.select();
    document.execCommand('copy');
    alert("Link copiato negli appunti!");
}
