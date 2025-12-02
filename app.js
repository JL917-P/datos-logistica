// ==========================
//  "Base de datos" simulada
// ==========================
const productosBD = [
  { id: 1, nombre: "Arroz Extra 50 kg" },
  { id: 2, nombre: "Arroz Superior 25 kg" },
  { id: 3, nombre: "Arroz Corriente 5 kg" },
  { id: 4, nombre: "Azúcar rubia 50 kg" },
  { id: 5, nombre: "Aceite vegetal 1 L" }
  // Aquí puedes agregar más productos...
];

// Cargar productos en el datalist
const datalistProductos = document.getElementById("lista-productos");
productosBD.forEach(p => {
  const option = document.createElement("option");
  option.value = p.nombre;
  datalistProductos.appendChild(option);
});

// ==========================
//  Calcular fecha vencimiento
// ==========================
const inputFechaProd = document.getElementById("fechaProduccion");
const inputFechaVenc = document.getElementById("fechaVencimiento");

inputFechaProd.addEventListener("change", () => {
  const valor = inputFechaProd.value; // formato: yyyy-mm-dd

  if (!valor) return;

  const fechaProd = new Date(valor);
  if (isNaN(fechaProd.getTime())) return;

  // Sumar 8 meses
  const fechaVenc = new Date(fechaProd);
  fechaVenc.setMonth(fechaVenc.getMonth() + 8);

  const year = fechaVenc.getFullYear();
  const month = String(fechaVenc.getMonth() + 1).padStart(2, "0");
  const day = String(fechaVenc.getDate()).padStart(2, "0");

  inputFechaVenc.value = `${year}-${month}-${day}`;
});

// ==========================
//  Manejo del formulario
// ==========================
const form = document.getElementById("form-registro");
const tbody = document.querySelector("#tabla-registros tbody");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const registro = {
    tienda: document.getElementById("tienda").value.trim(),
    producto: document.getElementById("producto").value.trim(),
    lote: document.getElementById("lote").value.trim(),
    fechaProduccion: document.getElementById("fechaProduccion").value,
    fechaVencimiento: document.getElementById("fechaVencimiento").value,
    cantidad: document.getElementById("cantidad").value
  };

  // Mostrar en consola (podrías enviarlo a una API real en el futuro)
  console.log("Registro guardado:", registro);

  // Agregar fila a la tabla
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${registro.tienda}</td>
    <td>${registro.producto}</td>
    <td>${registro.lote}</td>
    <td>${formatoFechaLindo(registro.fechaProduccion)}</td>
    <td>${formatoFechaLindo(registro.fechaVencimiento)}</td>
    <td>${registro.cantidad}</td>
  `;
  tbody.appendChild(tr);

  // Limpiar formulario excepto tienda (si quieres)
  form.reset();
});

// Formato de fecha para tabla (yyyy-mm-dd -> dd/mm/yyyy)
function formatoFechaLindo(fechaISO) {
  if (!fechaISO) return "";
  const [y, m, d] = fechaISO.split("-");
  return `${d}/${m}/${y}`;
}
