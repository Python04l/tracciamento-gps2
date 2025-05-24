document.getElementById('locationBtn').addEventListener('click', () => {
  alert("Funzione attivata!"); // Verifica che il click funzioni
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      alert(`Posizione ottenuta: ${lat}, ${lon}`); // Verifica le coordinate
      sendToTelegram(lat, lon);
    },
    (err) => {
      alert("Errore: " + err.message);
    }
  );
});

async function sendToTelegram(lat, lon) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `TEST: ${lat}, ${lon}`
      })
    });
    
    const data = await response.json();
    console.log(data);
    alert("Messaggio inviato! Controlla Telegram");
  } catch (error) {
    console.error(error);
    alert("Errore nell'invio");
  }
}
