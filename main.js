document.getElementById('locationBtn').addEventListener('click', () => {
  alert("Funzione attivata!");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(6);
      const lon = pos.coords.longitude.toFixed(6);
      alert(`Posizione ottenuta: ${lat}, ${lon}`);
      sendToTelegram(lat, lon);
    },
    (err) => {
      alert("Errore: " + err.message);
    }
  );
});

async function sendToTelegram(lat, lon) {
  const botToken = "7627218398:AAFHNujcd2e_zTluZeqfFNtJBpBuxY6pX6M";
  const chatId = "1768737489";
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `📍 Nuova posizione:\nLat: ${lat}\nLon: ${lon}\nhttps://www.google.com/maps?q=${lat},${lon}`
      })
    });
    
    const data = await response.json();
    if (data.ok) {
      alert("Posizione inviata! Controlla Telegram");
    } else {
      alert("Errore Telegram: " + data.description);
    }
  } catch (error) {
    console.error(error);
    alert("Errore nell'invio al bot");
  }
}

