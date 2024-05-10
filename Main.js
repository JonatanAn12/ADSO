const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
const buttonInfo = document.querySelector("#buttonInfo");
let historial = [];

//? Cambio de colores en teclas
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

//?? Función para escribir con teclado
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
  } else if (key === "i") {
    alerta();
  }
});

//? Actualizar historial
function actualizarHistorial() {
  const historialElemento = document.querySelector(".historial");
  historialElemento.innerHTML = "";
  for (const operacion of historial) {
    const lineaHistorial = document.createElement("div");
    lineaHistorial.textContent = operacion;
    historialElemento.appendChild(lineaHistorial);
  }
}

//? Poner numeros del 0 al 9 en la pantalla
function handleNumericKey(key) {
  if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
    pantalla.textContent = key;
  } else {
    pantalla.textContent += key;
  }
}

//? Funciones de suma, resta, multiplicación, división y punto decimal
function handleOperatorKey(key) {
  const lastChar = pantalla.textContent.slice(-1);
  if (/[\+\-\*\/]/.test(lastChar)) return;

  pantalla.textContent += key;
}

//? Función igual
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

//? Función borrar numero
function handleBackspaceKey() {
  if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!") {
    pantalla.textContent = "0";
  } else {
    pantalla.textContent = pantalla.textContent.slice(0, -1);
  }
}

//? Función limpiar historial
function handleCkey() {
  historial = [];
  actualizarHistorial();
}

//? Función Escape
function handleClearKey() {
  pantalla.textContent = "0";
}

//? función mouse
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
    } else if (valorBoton === "Escape") {
      handleClearKey();
    }
  });
});

//? Alerta function
buttonInfo.addEventListener("click", () => {
  alerta()
});

const alerta = () => {
  Swal.fire({
    icon: 'info',
    title: 'Atajos Rapidos',
    html: '<p>Limpiar = Tecla Esc = Limpiar Numeros</p> <br/> <p>CH = Tecla C = Limpiar Historial</p> <br> <p>← = Tecla Retroceso = Borrar numero</p> <br> <p>Abrir menu de atajos = Tecla i</p>'
  })
}
