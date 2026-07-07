"use strict";

const API_BASE_URL = "https://sistema-web-gestion-academica.onrender.com";

const icons = {
  edit: '<svg viewBox="0 0 24 24"><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20ZM14 7l3 3"/></svg>',
  delete: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>',
  empty: '<svg viewBox="0 0 24 24"><path d="M4 6h16v14H4zM8 3h8v3M8 11h8M8 15h5"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M12 8v5M12 17h.01M10.3 4.4 2.7 18a1.5 1.5 0 0 0 1.3 2h16a1.5 1.5 0 0 0 1.3-2L13.7 4.4a1.9 1.9 0 0 0-3.4 0Z"/></svg>'
};

const booleanOptions = [
  { value: "true", label: "Activo" },
  { value: "false", label: "Inactivo" }
];

const text = (name, label, required = true, extra = {}) => ({ name, label, type: "text", required, ...extra });
const number = (name, label, required = true, extra = {}) => ({ name, label, type: "number", required, ...extra });
const relation = (name, label, source, display, required = true, extra = {}) => ({
  name, label, type: "relation", source, display, required, ...extra
});

// ConfiguraciÃ³n central: rutas y campos coinciden con el contrato del backend.
const modules = {
  roles: {
    label: "Roles", singular: "rol", short: "RO", group: "Seguridad", endpoint: "/roles", id: "id_rol",
    description: "Gestiona los perfiles de acceso del sistema.",
    columns: ["id_rol", "nombre_rol", "estado"],
    fields: [text("nombre_rol", "Nombre del rol")],
    updateExtra: [{ name: "estado", label: "Estado", type: "select", options: booleanOptions }]
  },
  usuarios: {
    label: "Usuarios", singular: "usuario", short: "US", group: "Seguridad", endpoint: "/usuarios", id: "id_usuario",
    description: "Administra las cuentas y sus permisos de acceso.",
    columns: ["id_usuario", "username", "correo", "id_rol", "estado"],
    fields: [
      text("username", "Nombre de usuario"),
      { name: "correo", label: "Correo electrÃ³nico", type: "email", required: true },
      { name: "password_hash", label: "ContraseÃ±a / hash", type: "password", required: true, hint: "El backend recibe este valor como password_hash." },
      relation("id_rol", "Rol", "roles", "nombre_rol")
    ],
    updateExtra: [{ name: "estado", label: "Estado", type: "select", options: booleanOptions }]
  },
  facultades: {
    label: "Facultades", singular: "facultad", short: "FA", group: "AcadÃ©mico", endpoint: "/facultades", id: "id_facultad",
    description: "Organiza las facultades de la instituciÃ³n.",
    columns: ["id_facultad", "nombre_facultad", "estado"],
    fields: [text("nombre_facultad", "Nombre de la facultad")],
    updateExtra: [{ name: "estado", label: "Estado", type: "select", options: booleanOptions }]
  },
  carreras: {
    label: "Carreras", singular: "carrera", short: "CA", group: "AcadÃ©mico", endpoint: "/carreras", id: "id_carrera",
    description: "Gestiona la oferta de carreras por facultad.",
    columns: ["id_carrera", "id_facultad", "nombre_carrera", "estado"],
    fields: [
      relation("id_facultad", "Facultad", "facultades", "nombre_facultad"),
      text("nombre_carrera", "Nombre de la carrera")
    ],
    updateExtra: [{ name: "estado", label: "Estado", type: "select", options: booleanOptions }]
  },
  docentes: {
    label: "Docentes", singular: "docente", short: "DO", group: "Personas", endpoint: "/docentes", id: "id_docente",
    description: "MantÃ©n actualizada la informaciÃ³n del personal docente.",
    columns: ["id_docente", "numero_documento", "nombres", "apellidos", "especialidad", "costo_hora", "estado"],
    fields: [
      relation("id_usuario", "Usuario vinculado", "usuarios", "username", false, { nullable: true }),
      text("numero_documento", "NÃºmero de documento"),
      text("nombres", "Nombres"),
      text("apellidos", "Apellidos"),
      text("telefono", "TelÃ©fono", false),
      text("direccion", "DirecciÃ³n", false, { full: true }),
      text("especialidad", "Especialidad", false),
      text("grado_academico", "Grado acadÃ©mico", false),
      number("costo_hora", "Costo por hora", true, { min: 0, step: "0.01" })
    ],
    updateFields: ["telefono", "direccion", "especialidad", "grado_academico", "costo_hora"],
    updateExtra: [{ name: "estado", label: "Estado", type: "select", options: booleanOptions }]
  },
  estudiantes: {
    label: "Estudiantes", singular: "estudiante", short: "ES", group: "Personas", endpoint: "/estudiantes", id: "id_estudiante",
    description: "Administra expedientes y datos de los estudiantes.",
    columns: ["id_estudiante", "codigo_estudiante", "numero_documento", "nombres", "apellidos", "id_carrera", "estado"],
    fields: [
      relation("id_usuario", "Usuario vinculado", "usuarios", "username", false, { nullable: true }),
      relation("id_carrera", "Carrera", "carreras", "nombre_carrera"),
      text("codigo_estudiante", "CÃ³digo de estudiante"),
      text("numero_documento", "NÃºmero de documento"),
      text("nombres", "Nombres"),
      text("apellidos", "Apellidos"),
      text("telefono", "TelÃ©fono", false),
      text("direccion", "DirecciÃ³n", false, { full: true })
    ],
    updateExtra: [{ name: "estado", label: "Estado", type: "select", options: booleanOptions }]
  },
  cursos: {
    label: "Cursos", singular: "curso", short: "CU", group: "AcadÃ©mico", endpoint: "/cursos", id: "id_curso",
    description: "Configura cursos, crÃ©ditos y docentes responsables.",
    columns: ["id_curso", "codigo_curso", "nombre_curso", "id_docente", "id_carrera", "creditos", "horas_semanales", "estado"],
    fields: [
      relation("id_docente", "Docente", "docentes", ["nombres", "apellidos"]),
      relation("id_carrera", "Carrera", "carreras", "nombre_carrera"),
      text("codigo_curso", "CÃ³digo del curso"),
      text("nombre_curso", "Nombre del curso"),
      number("creditos", "CrÃ©ditos", true, { min: 0, step: "1" }),
      number("horas_semanales", "Horas semanales", true, { min: 0, step: "1" })
    ],
    updateExtra: [{ name: "estado", label: "Estado", type: "select", options: booleanOptions }]
  },
  aulas: {
    label: "Aulas", singular: "aula", short: "AU", group: "AcadÃ©mico", endpoint: "/aulas", id: "id_aula",
    description: "Controla los espacios y su capacidad disponible.",
    columns: ["id_aula", "nombre_aula", "capacidad", "estado"],
    fields: [
      text("nombre_aula", "Nombre del aula"),
      number("capacidad", "Capacidad", true, { min: 1, step: "1" })
    ],
    updateExtra: [{ name: "estado", label: "Estado", type: "select", options: booleanOptions }]
  },
  horarios: {
    label: "Horarios", singular: "horario", short: "HO", group: "PlanificaciÃ³n", endpoint: "/horarios", id: "id_horario",
    description: "Programa cursos, aulas y bloques horarios.",
    columns: ["id_horario", "id_curso", "id_aula", "dia_semana", "hora_inicio", "hora_fin", "estado"],
    fields: [
      relation("id_curso", "Curso", "cursos", "nombre_curso"),
      relation("id_aula", "Aula", "aulas", "nombre_aula"),
      { name: "dia_semana", label: "DÃ­a de la semana", type: "select", required: true, options: ["Lunes", "Martes", "MiÃ©rcoles", "Jueves", "Viernes", "SÃ¡bado", "Domingo"].map(value => ({ value, label: value })) },
      { name: "hora_inicio", label: "Hora de inicio", type: "time", required: true },
      { name: "hora_fin", label: "Hora de fin", type: "time", required: true }
    ],
    updateExtra: [{ name: "estado", label: "Estado", type: "select", options: booleanOptions }]
  },
  periodos: {
    label: "Periodos", singular: "periodo", short: "PE", group: "PlanificaciÃ³n", endpoint: "/periodos", id: "id_periodo",
    description: "Define las fechas y el estado de cada periodo acadÃ©mico.",
    columns: ["id_periodo", "nombre_periodo", "fecha_inicio", "fecha_fin", "estado"],
    fields: [
      text("nombre_periodo", "Nombre del periodo"),
      { name: "fecha_inicio", label: "Fecha de inicio", type: "date", required: true },
      { name: "fecha_fin", label: "Fecha de fin", type: "date", required: true },
      { name: "estado", label: "Estado", type: "select", required: true, options: ["PLANIFICADO", "ACTIVO", "FINALIZADO"].map(value => ({ value, label: value })) }
    ]
  },
  matriculas: {
    label: "MatrÃ­culas", singular: "matrÃ­cula", short: "MA", group: "MatrÃ­culas", endpoint: "/matriculas", id: "id_matricula",
    description: "Gestiona la inscripciÃ³n de estudiantes por periodo.",
    columns: ["id_matricula", "id_estudiante", "id_periodo", "fecha_matricula", "estado"],
    fields: [
      relation("id_estudiante", "Estudiante", "estudiantes", ["codigo_estudiante", "nombres", "apellidos"]),
      relation("id_periodo", "Periodo acadÃ©mico", "periodos", "nombre_periodo"),
      { name: "estado", label: "Estado", type: "select", required: true, options: ["PENDIENTE", "ACTIVA", "ANULADA"].map(value => ({ value, label: value })) }
    ]
  },
  detallesMatricula: {
    label: "Detalles de matrÃ­cula", singular: "detalle de matrÃ­cula", short: "DM", group: "MatrÃ­culas", endpoint: "/detalles-matricula", id: "id_detalle_matricula",
    description: "Asigna cursos a las matrÃ­culas registradas.",
    columns: ["id_detalle_matricula", "id_matricula", "id_curso", "fecha_creacion"],
    fields: [
      relation("id_matricula", "MatrÃ­cula", "matriculas", "id_matricula"),
      relation("id_curso", "Curso", "cursos", ["codigo_curso", "nombre_curso"])
    ],
    replaceOnEdit: true
  }
};

const labels = {
  id_rol: "ID", nombre_rol: "Rol", estado: "Estado", id_usuario: "Usuario", username: "Usuario",
  correo: "Correo", id_facultad: "Facultad", nombre_facultad: "Facultad", id_carrera: "Carrera",
  nombre_carrera: "Carrera", id_docente: "Docente", numero_documento: "Documento", nombres: "Nombres",
  apellidos: "Apellidos", telefono: "TelÃ©fono", direccion: "DirecciÃ³n", especialidad: "Especialidad",
  grado_academico: "Grado acadÃ©mico", costo_hora: "Costo/hora", id_estudiante: "Estudiante",
  codigo_estudiante: "CÃ³digo", id_curso: "Curso", codigo_curso: "CÃ³digo", nombre_curso: "Curso",
  creditos: "CrÃ©ditos", horas_semanales: "Horas/sem.", id_aula: "Aula", nombre_aula: "Aula",
  capacidad: "Capacidad", id_horario: "ID", dia_semana: "DÃ­a", hora_inicio: "Inicio", hora_fin: "Fin",
  id_periodo: "Periodo", nombre_periodo: "Periodo", fecha_inicio: "Inicio", fecha_fin: "Fin",
  id_matricula: "MatrÃ­cula", fecha_matricula: "Fecha", id_detalle_matricula: "ID",
  fecha_creacion: "Fecha de creaciÃ³n"
};

const state = {
  currentKey: "roles",
  records: [],
  filteredRecords: [],
  editingRecord: null,
  relationCache: new Map(),
  requestToken: 0
};

const dom = {
  nav: document.querySelector("#moduleNav"),
  title: document.querySelector("#moduleTitle"),
  description: document.querySelector("#moduleDescription"),
  tableHeading: document.querySelector("#tableHeading"),
  tableHead: document.querySelector("#tableHead"),
  tableBody: document.querySelector("#tableBody"),
  resultText: document.querySelector("#resultText"),
  count: document.querySelector("#recordCount"),
  search: document.querySelector("#searchInput"),
  refresh: document.querySelector("#refreshButton"),
  newButton: document.querySelector("#newButton"),
  modal: document.querySelector("#formModal"),
  modalEyebrow: document.querySelector("#modalEyebrow"),
  modalTitle: document.querySelector("#modalTitle"),
  form: document.querySelector("#recordForm"),
  formFields: document.querySelector("#formFields"),
  formNote: document.querySelector("#formNote"),
  saveButton: document.querySelector("#saveButton"),
  closeModal: document.querySelector("#closeModalButton"),
  cancelButton: document.querySelector("#cancelButton"),
  sidebar: document.querySelector("#sidebar"),
  connectionDot: document.querySelector("#connectionDot"),
  connectionText: document.querySelector("#connectionText"),
  toastRegion: document.querySelector("#toastRegion")
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderNavigation() {
  let currentGroup = "";
  dom.nav.innerHTML = Object.entries(modules).map(([key, module]) => {
    const section = module.group !== currentGroup
      ? `<span class="nav-section">${escapeHtml(module.group)}</span>`
      : "";
    currentGroup = module.group;
    return `${section}
      <button class="nav-button${key === state.currentKey ? " active" : ""}" type="button" data-module="${key}">
        <span class="nav-icon">${module.short}</span>
        <span class="nav-label">${escapeHtml(module.label)}</span>
      </button>`;
  }).join("");
}

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = payload?.mensaje || payload?.message || payload?.error || `Error HTTP ${response.status}`;
    throw new Error(message);
  }
  return payload;
}

function normalizeList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.rows)) return payload.rows;
  return [];
}

function setConnection(isOnline) {
  dom.connectionDot.classList.toggle("online", isOnline);
  dom.connectionDot.classList.toggle("offline", !isOnline);
  dom.connectionText.textContent = isOnline ? "API conectada" : "API no disponible";
}

async function loadRecords({ silent = false } = {}) {
  const module = modules[state.currentKey];
  const token = ++state.requestToken;
  if (!silent) renderLoading(module);
  dom.refresh.disabled = true;

  try {
    const payload = await apiRequest(module.endpoint);
    if (token !== state.requestToken) return;
    state.records = normalizeList(payload);
    applySearch();
    setConnection(true);
  } catch (error) {
    if (token !== state.requestToken) return;
    state.records = [];
    state.filteredRecords = [];
    renderError(module, error);
    setConnection(false);
    if (silent) showToast("No se pudo actualizar", friendlyError(error), "error");
  } finally {
    if (token === state.requestToken) dom.refresh.disabled = false;
  }
}

function renderLoading(module) {
  dom.tableHead.innerHTML = `<tr>${[...module.columns, "acciones"].map(column => `<th>${column === "acciones" ? "Acciones" : escapeHtml(labels[column] || column)}</th>`).join("")}</tr>`;
  dom.tableBody.innerHTML = Array.from({ length: 5 }, () => `
    <tr>${[...module.columns, "acciones"].map(() => '<td><div class="loading-line"></div></td>').join("")}</tr>
  `).join("");
  dom.resultText.textContent = "Cargando registrosâ€¦";
  dom.count.textContent = "â€”";
}

function renderError(module, error) {
  dom.tableHead.innerHTML = `<tr>${[...module.columns, "acciones"].map(column => `<th>${column === "acciones" ? "Acciones" : escapeHtml(labels[column] || column)}</th>`).join("")}</tr>`;
  dom.tableBody.innerHTML = `
    <tr class="empty-state"><td colspan="${module.columns.length + 1}">
      <div class="empty-content">
        <div class="empty-icon">${icons.alert}</div>
        <strong>No pudimos conectar con la API</strong>
        <span>${escapeHtml(friendlyError(error))} Verifica que el backend estÃ© activo y permita solicitudes CORS desde Live Server.</span>
      </div>
    </td></tr>`;
  dom.resultText.textContent = "No se pudieron cargar los datos";
  dom.count.textContent = "0";
}

function friendlyError(error) {
  if (error instanceof TypeError && /fetch/i.test(error.message)) {
    return "La conexiÃ³n fue rechazada o bloqueada por el navegador.";
  }
  return error?.message || "OcurriÃ³ un error inesperado.";
}

function applySearch() {
  const term = dom.search.value.trim().toLocaleLowerCase("es");
  state.filteredRecords = term
    ? state.records.filter(record => Object.values(record).some(value => String(value ?? "").toLocaleLowerCase("es").includes(term)))
    : [...state.records];
  renderTable();
}

function renderTable() {
  const module = modules[state.currentKey];
  dom.tableHead.innerHTML = `<tr>${module.columns.map(column => `<th>${escapeHtml(labels[column] || column.replaceAll("_", " "))}</th>`).join("")}<th>Acciones</th></tr>`;

  if (!state.filteredRecords.length) {
    const hasSearch = Boolean(dom.search.value.trim());
    dom.tableBody.innerHTML = `
      <tr class="empty-state"><td colspan="${module.columns.length + 1}">
        <div class="empty-content">
          <div class="empty-icon">${icons.empty}</div>
          <strong>${hasSearch ? "No hay coincidencias" : "No hay registros"}</strong>
          <span>${hasSearch ? "Prueba con otro tÃ©rmino de bÃºsqueda." : `TodavÃ­a no existen registros en ${module.label.toLocaleLowerCase("es")}. Usa â€œNuevo registroâ€ para agregar el primero.`}</span>
        </div>
      </td></tr>`;
  } else {
    dom.tableBody.innerHTML = state.filteredRecords.map(record => `
      <tr>
        ${module.columns.map((column, index) => `<td class="${index === 0 ? "id-cell" : ""}${index === 1 ? " cell-primary" : ""}" title="${escapeHtml(rawDisplayValue(column, record[column]))}">${formatCell(column, record[column])}</td>`).join("")}
        <td>
          <div class="actions">
            <button class="action-button" type="button" data-action="edit" data-id="${escapeHtml(record[module.id])}" aria-label="Editar ${escapeHtml(module.singular)}">${icons.edit}<span>Editar</span></button>
            <button class="action-button delete" type="button" data-action="delete" data-id="${escapeHtml(record[module.id])}" aria-label="Eliminar ${escapeHtml(module.singular)}">${icons.delete}<span>Eliminar</span></button>
          </div>
        </td>
      </tr>`).join("");
  }

  dom.count.textContent = String(state.filteredRecords.length);
  dom.resultText.textContent = state.filteredRecords.length === state.records.length
    ? `${state.records.length} ${state.records.length === 1 ? "registro" : "registros"}`
    : `${state.filteredRecords.length} de ${state.records.length} registros`;
}

function rawDisplayValue(column, value) {
  if (column === "estado" && typeof value === "boolean") return value ? "Activo" : "Inactivo";
  if (value === null || value === undefined || value === "") return "â€”";
  return value;
}

function formatCell(column, value) {
  if (column === "estado") {
    const status = String(value ?? "").toUpperCase();
    const positive = value === true || ["ACTIVO", "ACTIVA", "VIGENTE"].includes(status);
    const negative = value === false || ["INACTIVO", "INACTIVA", "ANULADA", "FINALIZADO"].includes(status);
    const label = typeof value === "boolean" ? (value ? "Activo" : "Inactivo") : (value || "Sin estado");
    return `<span class="status-badge${negative ? " inactive" : positive ? "" : " neutral"}">${escapeHtml(label)}</span>`;
  }
  if (/^fecha_/.test(column) && value) return escapeHtml(formatDate(value));
  if (column === "costo_hora" && value !== null && value !== undefined) {
    return escapeHtml(new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(Number(value)));
  }
  return escapeHtml(rawDisplayValue(column, value));
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", ...(String(value).includes("T") ? { timeStyle: "short" } : {}) }).format(date);
}

async function switchModule(key) {
  if (!modules[key] || key === state.currentKey) {
    return;
  }
  state.currentKey = key;
  state.records = [];
  state.filteredRecords = [];
  dom.search.value = "";
  const module = modules[key];
  dom.title.textContent = module.label;
  dom.description.textContent = module.description;
  dom.tableHeading.textContent = `Listado de ${module.label.toLocaleLowerCase("es")}`;
  renderNavigation();
  await loadRecords();
}

function fieldsForMode(module, isEdit) {
  if (!isEdit) return module.fields;
  const baseFields = module.updateFields
    ? module.fields.filter(field => module.updateFields.includes(field.name))
    : module.fields;
  return [...baseFields, ...(module.updateExtra || [])];
}

async function openForm(record = null) {
  const module = modules[state.currentKey];
  state.editingRecord = record;
  const isEdit = Boolean(record);
  dom.modalEyebrow.textContent = isEdit ? "Editar registro" : "Nuevo registro";
  dom.modalTitle.textContent = `${isEdit ? "Editar" : "Registrar"} ${module.singular}`;
  dom.saveButton.querySelector(".button-label").textContent = isEdit ? "Guardar cambios" : "Guardar registro";
  dom.formNote.hidden = true;

  if (isEdit && module.replaceOnEdit) {
    dom.formNote.hidden = false;
    dom.formNote.textContent = "La API no incluye una ruta PUT para este recurso. Al guardar, se eliminarÃ¡ el detalle actual y se registrarÃ¡ uno nuevo con los datos indicados.";
  } else if (isEdit && module.updateFields) {
    dom.formNote.hidden = false;
    dom.formNote.textContent = "El endpoint de actualizaciÃ³n de docentes solo admite datos profesionales, de contacto, costo por hora y estado.";
  }

  const fields = fieldsForMode(module, isEdit);
  dom.formFields.innerHTML = fields.map(field => renderField(field, record)).join("");
  dom.modal.hidden = false;
  document.body.style.overflow = "hidden";

  await populateRelationFields(fields, record);
  requestAnimationFrame(() => dom.formFields.querySelector("input, select, textarea")?.focus());
}

function renderField(field, record) {
  const value = normalizeInputValue(field, record?.[field.name]);
  const requiredMark = field.required ? '<span class="required">*</span>' : "";
  const attributes = [
    `id="field-${field.name}"`,
    `name="${field.name}"`,
    'class="form-control"',
    field.required ? "required" : "",
    field.min !== undefined ? `min="${field.min}"` : "",
    field.step !== undefined ? `step="${field.step}"` : ""
  ].filter(Boolean).join(" ");

  let control;
  if (field.type === "select") {
    control = `<select ${attributes}>
      <option value="" disabled${value === "" ? " selected" : ""}>Selecciona una opciÃ³n</option>
      ${field.options.map(option => `<option value="${escapeHtml(option.value)}"${String(option.value) === String(value) ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
    </select>`;
  } else if (field.type === "relation") {
    control = `<select ${attributes} data-relation="${field.source}" data-current="${escapeHtml(value)}">
      <option value="">Cargando opcionesâ€¦</option>
    </select>`;
  } else if (field.full) {
    control = `<textarea ${attributes}>${escapeHtml(value)}</textarea>`;
  } else {
    control = `<input ${attributes} type="${field.type}" value="${escapeHtml(value)}" autocomplete="${field.type === "password" ? "new-password" : "off"}">`;
  }

  return `<div class="form-group${field.full ? " full-width" : ""}">
    <label for="field-${field.name}">${escapeHtml(field.label)} ${requiredMark}</label>
    ${control}
    ${field.hint ? `<span class="field-hint">${escapeHtml(field.hint)}</span>` : ""}
  </div>`;
}

function normalizeInputValue(field, value) {
  if (value === null || value === undefined) return "";
  if (field.type === "date") return String(value).slice(0, 10);
  if (field.type === "time") return String(value).slice(0, 5);
  return String(value);
}

async function populateRelationFields(fields, record) {
  await Promise.all(fields.filter(field => field.type === "relation").map(async field => {
    const select = dom.formFields.querySelector(`[name="${field.name}"]`);
    try {
      const records = await getRelationRecords(field.source);
      if (!document.body.contains(select)) return;
      const current = normalizeInputValue(field, record?.[field.name]);
      const placeholder = field.nullable || !field.required ? "Sin vincular" : "Selecciona una opciÃ³n";
      select.innerHTML = `<option value="">${placeholder}</option>${records.map(item => {
        const sourceModule = modules[field.source];
        const value = item[sourceModule.id];
        const label = relationLabel(item, field.display);
        return `<option value="${escapeHtml(value)}"${String(value) === String(current) ? " selected" : ""}>${escapeHtml(label)}</option>`;
      }).join("")}`;
    } catch (error) {
      select.innerHTML = '<option value="">No se pudieron cargar las opciones</option>';
      showToast("Datos relacionados no disponibles", `No se cargaron las opciones de ${field.label.toLocaleLowerCase("es")}.`, "error");
    }
  }));
}

async function getRelationRecords(key) {
  if (state.relationCache.has(key)) return state.relationCache.get(key);
  const payload = await apiRequest(modules[key].endpoint);
  const records = normalizeList(payload);
  state.relationCache.set(key, records);
  return records;
}

function relationLabel(record, display) {
  const keys = Array.isArray(display) ? display : [display];
  return keys.map(key => record[key]).filter(value => value !== null && value !== undefined && value !== "").join(" Â· ") || `ID ${record[Object.keys(record)[0]]}`;
}

function closeForm() {
  if (dom.saveButton.disabled) return;
  dom.modal.hidden = true;
  dom.form.reset();
  state.editingRecord = null;
  document.body.style.overflow = "";
}

function serializeForm(fields) {
  const formData = new FormData(dom.form);
  const payload = {};
  fields.forEach(field => {
    const raw = formData.get(field.name);
    if (field.type === "number" || field.type === "relation") {
      payload[field.name] = raw === "" && field.nullable ? null : Number(raw);
    } else if (field.type === "select" && ["true", "false"].includes(raw)) {
      payload[field.name] = raw === "true";
    } else {
      payload[field.name] = raw === "" && !field.required ? null : raw;
    }
  });
  return payload;
}

async function saveRecord(event) {
  event.preventDefault();
  const module = modules[state.currentKey];
  const isEdit = Boolean(state.editingRecord);
  const fields = fieldsForMode(module, isEdit);
  const payload = serializeForm(fields);

  if (state.currentKey === "horarios" && payload.hora_inicio >= payload.hora_fin) {
    showToast("Revisa el horario", "La hora de fin debe ser posterior a la hora de inicio.", "error");
    return;
  }
  if (state.currentKey === "periodos" && payload.fecha_inicio > payload.fecha_fin) {
    showToast("Revisa las fechas", "La fecha de fin debe ser igual o posterior a la fecha de inicio.", "error");
    return;
  }
  if (isEdit && module.replaceOnEdit && !window.confirm("Este cambio eliminarÃ¡ el detalle actual y crearÃ¡ uno nuevo. Â¿Deseas continuar?")) return;

  setSaving(true);
  try {
    if (isEdit && module.replaceOnEdit) {
      await apiRequest(`${module.endpoint}/${state.editingRecord[module.id]}`, { method: "DELETE" });
      await apiRequest(module.endpoint, { method: "POST", body: JSON.stringify(payload) });
    } else {
      const endpoint = isEdit ? `${module.endpoint}/${state.editingRecord[module.id]}` : module.endpoint;
      await apiRequest(endpoint, { method: isEdit ? "PUT" : "POST", body: JSON.stringify(payload) });
    }
    state.relationCache.clear();
    closeFormAfterSave();
    showToast(isEdit ? "Registro actualizado" : "Registro creado", `El ${module.singular} se guardÃ³ correctamente.`);
    await loadRecords({ silent: true });
  } catch (error) {
    showToast("No se pudo guardar", friendlyError(error), "error");
  } finally {
    setSaving(false);
  }
}

function setSaving(isSaving) {
  dom.saveButton.disabled = isSaving;
  dom.cancelButton.disabled = isSaving;
  dom.saveButton.classList.toggle("is-saving", isSaving);
}

function closeFormAfterSave() {
  dom.modal.hidden = true;
  dom.form.reset();
  state.editingRecord = null;
  document.body.style.overflow = "";
}

async function editRecord(id) {
  const module = modules[state.currentKey];
  let record = state.records.find(item => String(item[module.id]) === String(id));
  try {
    const fresh = await apiRequest(`${module.endpoint}/${id}`);
    if (fresh && !Array.isArray(fresh)) record = fresh.data && !Array.isArray(fresh.data) ? fresh.data : fresh;
  } catch {
    // Si GET por ID falla, el registro ya listado permite continuar con la ediciÃ³n.
  }
  if (!record) {
    showToast("Registro no encontrado", "Actualiza la tabla e intÃ©ntalo nuevamente.", "error");
    return;
  }
  openForm(record);
}

async function deleteRecord(id) {
  const module = modules[state.currentKey];
  if (!window.confirm(`Â¿Deseas eliminar este ${module.singular}? Esta acciÃ³n puede cambiar su estado o retirarlo definitivamente.`)) return;

  try {
    await apiRequest(`${module.endpoint}/${id}`, { method: "DELETE" });
    state.relationCache.clear();
    showToast("Registro eliminado", `El ${module.singular} se eliminÃ³ correctamente.`);
    await loadRecords({ silent: true });
  } catch (error) {
    showToast("No se pudo eliminar", friendlyError(error), "error");
  }
}

function showToast(title, message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${type === "error" ? icons.alert : icons.check}</div>
    <div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(message)}</p></div>`;
  dom.toastRegion.appendChild(toast);
  window.setTimeout(() => toast.remove(), 4800);
}

function bindEvents() {
  dom.nav.addEventListener("click", event => {
    const button = event.target.closest("[data-module]");
    if (button) switchModule(button.dataset.module);
  });
  dom.tableBody.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    if (button.dataset.action === "edit") editRecord(button.dataset.id);
    if (button.dataset.action === "delete") deleteRecord(button.dataset.id);
  });
  dom.search.addEventListener("input", applySearch);
  dom.refresh.addEventListener("click", () => loadRecords());
  dom.newButton.addEventListener("click", () => openForm());
  dom.form.addEventListener("submit", saveRecord);
  dom.closeModal.addEventListener("click", closeForm);
  dom.cancelButton.addEventListener("click", closeForm);
  dom.modal.addEventListener("click", event => {
    if (event.target === dom.modal) closeForm();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !dom.modal.hidden) closeForm();
  });
}

function initialize() {
  document.querySelector("#todayText").textContent = new Intl.DateTimeFormat("es-PE", {
    weekday: "long", day: "numeric", month: "long"
  }).format(new Date());
  renderNavigation();
  bindEvents();
  loadRecords();
}

initialize();

