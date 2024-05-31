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
    Math.PI / 2,
    2,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

  BABYLON.SceneLoader.ImportMesh(
    "",
    "assets/models/",
    modelFile,
    scene,
    (meshes) => {
      if (meshes.length > 0) {
        const model = meshes[0];
        model.scaling = new BABYLON.Vector3(1, 1, 1);
        model.position = new BABYLON.Vector3(0, 0, 0);
      }
    }
  );

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
}
