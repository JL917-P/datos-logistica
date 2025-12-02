const inputFechaProd = document.getElementById("fechaProduccion");
const inputFechaVenc = document.getElementById("fechaVencimiento");

// Detectar modo
const modoExacto = document.getElementById("modoExacto");
const modoMesAnio = document.getElementById("modoMesAnio");

// Simulación de "BD" productos
const productosBD = [
  { id: 1, nombre: "Arroz Extra 50 kg" },
  { id: 2, nombre: "Arroz Superior 25 kg" },
  { id: 3, nombre: "Arroz Corriente 5 kg" },
  { id: 4, nombre: "Azúcar rubia 50 kg" },
  { id: 5, nombre: "Aceite vegetal 1 L" }
];

const datalistProductos = document.getElementById("lista-productos");
productosBD.forEach(p => {
  const option = document.createElement("option");
  option.value = p.nombre;
  datalistProductos.appendChild(option);
});

// Convertir MMMYY → Date(anio, mes, dia=1)
function convertirMesLetrasAFecha(texto) {
  const meses = {
    ENE: 0, FEB: 1, MAR: 2, ABR: 3, MAY: 4, JUN: 5,
    JUL: 6, AGO: 7, SEP: 8, OCT: 9, NOV: 10, DIC: 11
  };

  const regex = /^([A-Za-z]{3})(\d{2})$/;
  const match = texto.toUpperCase().match(regex);

  if (!match) return null;

  const mes = meses[match[1]];
  const anio = 2000 + parseInt(match[2]);

  return new Date(anio, mes, 1);
}

// Sumar meses manteniendo el día (modo exacto)
function sumarMesesManteniendoDia(fecha, meses) {
  const diaOriginal = fecha.getDate();
  const nueva = new Date(fecha);
  nueva.setMonth(nueva.getMonth() + meses);

  if (nueva.getDate() !== diaOriginal) {
    nueva.setDate(diaOriginal);
  }
  return nueva;
}

// Procesar cambios en fecha producción
inputFechaProd.addEventListener("input", () => {
  const valor = inputFechaProd.value.trim();
  let fecha;

  // -----------------------------------------------
  // MODO 1: FECHA EXACTA (yyyy-mm-dd)
  // -----------------------------------------------
  if (modoExacto.checked) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return;
    fecha = new Date(valor);

    const venc = sumarMesesManteniendoDia(fecha, 8);

    const year = venc.getFullYear();
    const month = String(venc.getMonth() + 1).padStart(2, "0");
    const day = String(venc.getDate()).padStart(2, "0");

    inputFechaVenc.value = `${year}-${month}-${day}`;
  }

  // -----------------------------------------------
  // MODO 2: SOLO MES/AÑO (formato MMMYY)
  // -----------------------------------------------
  if (modoMesAnio.checked) {
    fecha = convertirMesLetrasAFecha(valor);
    if (!fecha) return;

    // Sumar 8 meses sin día
    fecha.setMonth(fecha.getMonth() + 8);

    const mesesLetras = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL",
                         "AGO","SEP","OCT","NOV","DIC"];

    const mesL = mesesLetras[fecha.getMonth()];
    const anioYY = String(fecha.getFullYear()).slice(2);

    // Mostrar directamente MMMYY
    inputFechaVenc.value = `${mesL}${anioYY}`;
  }
});

// Cambiar placeholder según modo
modoExacto.addEventListener("change", () => {
  inputFechaProd.placeholder = "Ej: 2025-12-05";
  inputFechaProd.value = "";
  inputFechaVenc.value = "";
});

modoMesAnio.addEventListener("change", () => {
  inputFechaProd.placeholder = "Ej: NOV25";
  inputFechaProd.value = "";
  inputFechaVenc.value = "";
});
