const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
let historial = [];


document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/\d/.test(key)) {
    handleNumericKey(key);
  }

  else if (/[\+\-\*\/]/.test(key)) {
    handleOperatorKey(key);
  }
  
  else if (key === "Enter") {
    handleEqualKey();
  }

  else if (key === "Backspace") {
    handleBackspaceKey();
  }

  else if (key === "C") {
    handleCkey();
  }

  
  else if (key === "Escape") {
    handleClearKey();
  }
});

function actualizarHistorial() {
  const historialElemento = document.querySelector(".historial");
  historialElemento.innerHTML = "";
  for (const operacion of historial) {
    const lineaHistorial = document.createElement("div");
    lineaHistorial.textContent = operacion;
    historialElemento.appendChild(lineaHistorial);
  }
}

function handleNumericKey(key) {
  if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
    pantalla.textContent = key;
  } else {
    pantalla.textContent += key;
  }
}

function handleOperatorKey(key) {
  const lastChar = pantalla.textContent.slice(-1);
  if (/[\+\-\*\/]/.test(lastChar)) return;

  pantalla.textContent += key;
}

function handleEqualKey() {
  try {
    const operacion = pantalla.textContent;
    pantalla.textContent = eval(pantalla.textContent);
    const resultado = pantalla.textContent;
    historial.push(`${operacion} = ${resultado}`);
    actualizarHistorial();
  } catch {
    pantalla.textContent = "Error!";
  }
}

function handleBackspaceKey() {
  if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!") {
    pantalla.textContent = "0";
  } else {
    pantalla.textContent = pantalla.textContent.slice(0, -1);
  }
}


function handleCkey() {
  historial = [];
  actualizarHistorial();
}

function handleClearKey() {
  pantalla.textContent = "0";
}

