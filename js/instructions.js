export function displayInstructionsHTML() {
  const instructionsContainer = document.createElement("div");
  instructionsContainer.id = "instructions";
  instructionsContainer.className = "instructions";
  instructionsContainer.style.overflow = "auto";
    instructionsContainer.style.top = "10%";
  instructionsContainer.style.left = "50%";
  instructionsContainer.style.transform = "translateX(-50%)";
  instructionsContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  instructionsContainer.style.color = "white";
  instructionsContainer.style.padding = "20px";
  instructionsContainer.style.borderRadius = "10px";
  instructionsContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  instructionsContainer.innerHTML = `
        <h2>Instructions</h2>
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
  closeButton.style.marginTop = "10px";
  closeButton.style.padding = "10px 20px";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "5px";
  closeButton.style.backgroundColor = "#ff4c4c";
  closeButton.style.color = "white";
  closeButton.addEventListener("click", clearInstructionsHTML);
  instructionsContainer.appendChild(closeButton);
}

// Function to clear instructions as HTML elements
function clearInstructionsHTML() {
  const instructionsContainer = document.getElementById("instructions");
  if (instructionsContainer) {
    instructionsContainer.remove();
  }
}
