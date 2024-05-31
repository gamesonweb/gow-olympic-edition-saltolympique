import { loadolympianModel } from "./Olympian.js";

export function displayCharacterSelection(callback) {
  const characters = [{ name: "Olympien", file: "Olympian.glb" }];

  const overlay = document.getElementById("overlay");
  overlay.innerHTML = ""; // Clear any existing content

  const selectionContainer = document.createElement("div");
  selectionContainer.id = "characterSelection";

  const title = document.createElement("h2");
  title.innerText = "Choisissez votre personnage";
  title.style.textAlign = "center";
  title.style.width = "100%";
  title.style.marginBottom = "20px";
  selectionContainer.appendChild(title);

  characters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.className = "characterCard";

    const previewCanvas = document.createElement("canvas");
    previewCanvas.id = `previewCanvas-${character.name}`;
    previewCanvas.width = 200;
    previewCanvas.height = 200;

    const button = document.createElement("button");
    button.innerText = character.name;
    button.addEventListener("click", () => {
      overlay.innerHTML = ""; // Clear the overlay
      callback(character.file);
    });

    characterCard.appendChild(previewCanvas);
    characterCard.appendChild(button);
    selectionContainer.appendChild(characterCard);

    createPreview(previewCanvas, character.file);
  });

  overlay.appendChild(selectionContainer);
}

function createPreview(canvas, modelFile) {
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2.5,
      1.8,
      new BABYLON.Vector3(0, 1.2, -0.6),
      scene
  );
  //camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(1, 1, 0),
      scene
  );

  loadolympianModel(scene, (olympianMesh, animations) => {
    if (olympianMesh) {
      olympianMesh.scaling = new BABYLON.Vector3(40, 40, 40);
      olympianMesh.position = new BABYLON.Vector3(0, 1, 0); // Lowered the position
      olympianMesh.rotation = new BABYLON.Vector3(0, 0, 0); // Rotate to face front

      const idleAnim = animations.idleAnim;
      if (idleAnim) {
        idleAnim.start(true, 1.0);
      }
    }
  });

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
}
