const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
let historial = [];

const changeColor = (event, color) => {
  botones.forEach((boton) => {
    if (event.key == boton.value) {
      boton.style.backgroundColor = `#${color}`
    }
  })
};

document.addEventListener('keydown', (event) => {
  changeColor(event, 'a82880')
})

document.addEventListener('keyup', (event) => {
  changeColor(event, '4c4d4d')
})

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/\d/.test(key)) {
    handleNumericKey(key);
  } else if (/[\+\-\*\/\.]/.test(key)) {
    handleOperatorKey(key);
  } else if (key === "Enter") {
    handleEqualKey();
  } else if (key === "Backspace") {
    handleBackspaceKey();
  } else if (key === "c") {
    handleCkey();
  } else if (key === "Escape") {
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

function appendToDisplay(value) {
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const valorBoton = boton.textContent;
    if (!isNaN(valorBoton)) {
      handleNumericKey(valorBoton);
    } else if (valorBoton === "+" || valorBoton === "-" || valorBoton === "*" || valorBoton === "/") {
      handleOperatorKey(valorBoton);
    } else if (valorBoton === "=") {
      handleEqualKey();
    } else if (valorBoton === "←") {
      handleBackspaceKey();
    } else if (valorBoton === "C") {
      handleCkey();
    } else if (valorBoton === "0") {
      handleClearKey();
    }
  });
});