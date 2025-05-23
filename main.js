function getLocation() {
  const output = document.getElementById("output");

  if (!navigator.geolocation) {
    output.textContent = "Geolocalizzazione non supportata dal tuo browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      output.textContent = `Latitudine: ${latitude}, Longitudine: ${longitude}`;
    },
    () => {
      output.textContent = "Impossibile ottenere la posizione.";
    }
  );
}
