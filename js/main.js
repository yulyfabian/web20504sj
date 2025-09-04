// MODAL DE IMÁGENES
function ampliar(img) {
  const modal = document.getElementById("modalImagen");
  const modalImg = document.getElementById("imgAmpliada");
  modal.style.display = "flex";
  modalImg.src = img.src;
}

function cerrarModal() {
  document.getElementById("modalImagen").style.display = "none";
}

// Cerrar clic fuera de la imagen
window.addEventListener("click", function (event) {
  const modal = document.getElementById("modalImagen");
  if (event.target === modal) {
    cerrarModal();
  }
});

// Cerrar con tecla ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    cerrarModal();
  }
});

// PAGINACIÓN DE TABLAS
function agregarPaginacion(tbodyId, paginacionId, filasPorPagina = 2) {
  const tbody = document.getElementById(tbodyId);
  const filas = Array.from(tbody.querySelectorAll("tr"));
  const paginacion = document.getElementById(paginacionId);
  let filasFiltradas = [...filas];
  let totalPaginas = Math.ceil(filasFiltradas.length / filasPorPagina);

  function renderPaginacion() {
    paginacion.innerHTML = "";
    totalPaginas = Math.ceil(filasFiltradas.length / filasPorPagina);

    if (totalPaginas <= 1) return;

    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.dataset.pagina = i;
      btn.className = "btn btn-outline-primary btn-sm mx-1";
      if (i === 1) btn.classList.add("active");
      btn.addEventListener("click", () => mostrarPagina(i));
      paginacion.appendChild(btn);
    }
  }

  function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;

    filas.forEach(fila => (fila.style.display = "none"));
    filasFiltradas.slice(inicio, fin).forEach(fila => (fila.style.display = ""));

    paginacion.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
    const btnActivo = paginacion.querySelector(`button[data-pagina="${pagina}"]`);
    if (btnActivo) btnActivo.classList.add("active");
  }

  function aplicarFiltro(areaSeleccionada) {
    if (!areaSeleccionada || areaSeleccionada === "todas") {
      filasFiltradas = [...filas];
    } else {
      filasFiltradas = filas.filter(fila => fila.getAttribute("data-area") === areaSeleccionada);
    }
    renderPaginacion();
    mostrarPagina(1);
  }

  renderPaginacion();
  mostrarPagina(1);

  return aplicarFiltro;
}

// Inicializar paginaciones al cargar
document.addEventListener("DOMContentLoaded", () => {
  const filtros = {
    secundaria: agregarPaginacion("tbody-secundaria", "paginacion-secundaria"),
    primaria: agregarPaginacion("tbody-primaria", "paginacion-primaria"),
    directivo: agregarPaginacion("tbody-directivo", "paginacion-directivo"),
    administrativo276: agregarPaginacion("tbody-administrativo-276", "paginacion-administrativo-276"),
    administrativo1057: agregarPaginacion("tbody-administrativo-1057", "paginacion-administrativo-1057"),
    auxiliar: agregarPaginacion("tbody-auxiliar", "paginacion-auxiliar"),
  };

  const select = document.getElementById("filtroArea");
  if (select) {
    select.addEventListener("change", () => {
      const areaSeleccionada = select.value;
      filtros.secundaria(areaSeleccionada);
    });

    filtros.secundaria("todas");
  }
});
