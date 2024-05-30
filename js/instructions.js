export function displayInstructionsHTML() {
  const instructionsContainer = document.createElement("div");
  instructionsContainer.id = "instructions";
  instructionsContainer.className = "instructions";
  instructionsContainer.innerHTML = `
        <p>Charge le saut avec la barre ESPACE</p>
        <p>Relâche pour SAUTER !</p>
        <p>Utilise les flèches pour faires des FIGURES !</p>
        <p>ATTENTION à l'ATTERISSAGE !!! </p>
    `;
  document.body.appendChild(instructionsContainer);
  const closeButton = document.createElement("button");
  closeButton.id = "closeButton";
  closeButton.className = "closeButton";
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", clearInstructionsHTML);
  instructionsContainer.appendChild(closeButton);
}

// Function to clear instructions as HTML elements
function clearInstructionsHTML() {
  const instructionsContainer = document.getElementById("instructions");
  instructionsContainer.innerHTML = "";
}
