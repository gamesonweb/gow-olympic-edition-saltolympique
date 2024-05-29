export function displayInstructionsHTML() {
  const instructionsContainer = document.createElement("div");
  instructionsContainer.id = "instructions";
  instructionsContainer.className = "instructions";
  instructionsContainer.innerHTML = `
        <p>Press space bar to load jump</p>
        <p>Release to jump</p>
        <p>Press f to flip</p>
        <p>Mind your landing !!! </p>
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
