const inputFechaProd = document.getElementById("fechaProduccion");
const inputFechaVenc = document.getElementById("fechaVencimiento");

// Función para sumar 8 meses sin que cambie el día
function sumarMesesManteniendoDia(fecha, meses) {
  const dia = fecha.getDate();
  const nueva = new Date(fecha);
  nueva.setMonth(nueva.getMonth() + meses);

  // Si el mes ajustado cambia el día (como 31 -> 30), lo forzamos al mismo día
  if (nueva.getDate() !== dia) {
    nueva.setDate(dia);
  }

  return nueva;
}

// Detectar si el usuario ingresa NOV25, DIC25, etc.
function convertirMesLetrasAFecha(texto) {
  const meses = {
    ENE: 0, FEB: 1, MAR: 2, ABR: 3, MAY: 4, JUN: 5,
    JUL: 6, AGO: 7, SEP: 8, OCT: 9, NOV: 10, DIC: 11
  };

  // Ej: NOV25 → ["NOV", "25"]
  const regex = /^([A-Za-z]{3})(\d{2})$/;
  const match = texto.toUpperCase().match(regex);

  if (!match) return null;

  const mes = meses[match[1]];
  const anio = 2000 + parseInt(match[2]);

  return new Date(anio, mes, 1); // Día = 1 por defecto
}

inputFechaProd.addEventListener("input", () => {
  const valor = inputFechaProd.value.trim();

  let fecha;

  if (!valor) return;

  // Caso 1 → fecha normal yyyy-mm-dd
  if (valor.includes("-")) {
    fecha = new Date(valor);
  } 
  // Caso 2 → formato NOV25
  else {
    fecha = convertirMesLetrasAFecha(valor);
  }

  if (!fecha || isNaN(fecha.getTime())) return;

  // Sumar 8 meses manteniendo el día
  const venc = sumarMesesManteniendoDia(fecha, 8);

  const year = venc.getFullYear();
  const month = String(venc.getMonth() + 1).padStart(2, "0");
  const day = String(venc.getDate()).padStart(2, "0");

  // Mostrar siempre formato ISO en el input
  inputFechaVenc.value = `${year}-${month}-${day}`;
});
