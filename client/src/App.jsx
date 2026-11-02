import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

const modules = {
  media: {
    label: "Películas y series",
    singular: "producción",
    endpoint: "/media",
    fields: [
      { name: "serial", label: "Serial", required: true },
      { name: "titulo", label: "Título", required: true },
      { name: "sinopsis", label: "Sinopsis", type: "textarea" },
      { name: "url", label: "URL", type: "url", required: true },
      { name: "imagenPortada", label: "URL de la portada", type: "url" },
      { name: "anoEstreno", label: "Año de estreno", type: "number" },
      { name: "genero", label: "Género", type: "select", required: true },
      { name: "director", label: "Director", type: "select", required: true },
      { name: "productora", label: "Productora", type: "select", required: true },
      { name: "tipo", label: "Tipo", type: "select", required: true },
    ],
    columns: [
      { name: "titulo", label: "Título" },
      { name: "serial", label: "Serial" },
      { name: "anoEstreno", label: "Año" },
      { name: "genero", label: "Género" },
      { name: "tipo", label: "Tipo" },
    ],
  },
  generos: {
    label: "Géneros",
    singular: "género",
    endpoint: "/generos",
    fields: [
      { name: "nombre", label: "Nombre", required: true },
      { name: "descripcion", label: "Descripción", type: "textarea" },
      { name: "estado", label: "Estado", type: "status" },
    ],
    columns: [
      { name: "nombre", label: "Nombre" },
      { name: "descripcion", label: "Descripción" },
      { name: "estado", label: "Estado" },
    ],
  },
  directores: {
    label: "Directores",
    singular: "director",
    endpoint: "/directores",
    fields: [
      { name: "nombres", label: "Nombres", required: true },
      { name: "estado", label: "Estado", type: "status" },
    ],
    columns: [
      { name: "nombres", label: "Nombres" },
      { name: "estado", label: "Estado" },
    ],
  },
  productoras: {
    label: "Productoras",
    singular: "productora",
    endpoint: "/productoras",
    fields: [
      { name: "nombre", label: "Nombre", required: true },
      { name: "slogan", label: "Eslogan" },
      { name: "descripcion", label: "Descripción", type: "textarea" },
      { name: "estado", label: "Estado", type: "status" },
    ],
    columns: [
      { name: "nombre", label: "Nombre" },
      { name: "slogan", label: "Eslogan" },
      { name: "estado", label: "Estado" },
    ],
  },
  tipos: {
    label: "Tipos",
    singular: "tipo",
    endpoint: "/tipos",
    fields: [
      { name: "nombre", label: "Nombre", required: true },
      { name: "descripcion", label: "Descripción", type: "textarea" },
    ],
    columns: [
      { name: "nombre", label: "Nombre" },
      { name: "descripcion", label: "Descripción" },
    ],
  },
};

const navigation = [
  { key: "media", label: "Películas y series", mark: "M" },
  { key: "generos", label: "Géneros", mark: "G" },
  { key: "directores", label: "Directores", mark: "D" },
  { key: "productoras", label: "Productoras", mark: "P" },
  { key: "tipos", label: "Tipos", mark: "T" },
];

const emptyCatalogs = { generos: [], directores: [], productoras: [], tipos: [] };
const emptyForm = (fields) =>
  Object.fromEntries(fields.map(({ name }) => [name, name === "estado" ? "Activo" : ""]));
const recordId = (record) => record?._id || record?.id;
const relationName = (value) => {
  if (!value) return "—";
  if (typeof value !== "object") return String(value);
  return value.nombre || value.nombres || "—";
};
const cellValue = (record, field) =>
  ["genero", "director", "productora", "tipo"].includes(field)
    ? relationName(record[field])
    : record[field] || "—";

function errorMessage(error) {
  return error.response?.data?.mensaje
    || error.response?.data?.message
    || error.response?.data?.error
    || error.message
    || "No fue posible completar la solicitud.";
}

function App() {
  const [selected, setSelected] = useState("media");
  const [records, setRecords] = useState([]);
  const [catalogs, setCatalogs] = useState(emptyCatalogs);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [formRecord, setFormRecord] = useState(null);
  const [saving, setSaving] = useState(false);

  const config = modules[selected];

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const { data } = await api.get(config.endpoint);
      if (!Array.isArray(data)) {
        throw new Error("La API devolvió una respuesta inesperada.");
      }
      setRecords(data);
    } catch (error) {
      setRecords([]);
      setLoadError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [config]);

  const loadCatalogs = useCallback(async () => {
    try {
      const keys = Object.keys(emptyCatalogs);
      const responses = await Promise.all(keys.map((key) => api.get(modules[key].endpoint)));
      setCatalogs(Object.fromEntries(keys.map((key, index) => [key, responses[index].data])));
    } catch (error) {
      setLoadError(`No se pudieron cargar los catálogos: ${errorMessage(error)}`);
    }
  }, []);

  useEffect(() => {
    setSearch("");
    setFormRecord(null);
    loadRecords();
    if (selected === "media") loadCatalogs();
  }, [selected, loadRecords, loadCatalogs]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("es");
    if (!query) return records;
    return records.filter((record) =>
      config.columns.some(({ name }) =>
        String(cellValue(record, name)).toLocaleLowerCase("es").includes(query),
      ),
    );
  }, [config.columns, records, search]);

  function openCreateForm() {
    setFormRecord({ ...emptyForm(config.fields), _isNew: true });
  }

  function openEditForm(record) {
    const values = Object.fromEntries(
      config.fields.map(({ name }) => {
        const value = record[name];
        return [name, value && typeof value === "object" ? recordId(value) : value ?? ""];
      }),
    );
    setFormRecord({ ...values, _id: recordId(record) });
  }

  function closeForm() {
    if (!saving) setFormRecord(null);
  }

  async function submitForm(event) {
    event.preventDefault();
    setSaving(true);
    const isNew = formRecord._isNew;
    const payload = Object.fromEntries(
      config.fields.map(({ name }) => {
        const value = formRecord[name];
        return [name, name === "anoEstreno" && value === "" ? undefined : value];
      }).filter(([, value]) => value !== undefined),
    );
    try {
      if (isNew) {
        await api.post(config.endpoint, payload);
      } else {
        await api.put(`${config.endpoint}/${formRecord._id}`, payload);
      }
      setFormRecord(null);
      await loadRecords();
      await Swal.fire({
        icon: "success",
        title: isNew ? "Registro creado" : "Cambios guardados",
        text: `El ${config.singular} se guardó correctamente.`,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#4f46e5",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "No se pudo guardar",
        text: errorMessage(error),
        confirmButtonText: "Entendido",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setSaving(false);
    }
  }

  async function deleteRecord(record) {
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar este registro?",
      text: `Se eliminará "${record.titulo || record.nombre || record.nombres}".`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });
    if (!confirmation.isConfirmed) return;
    try {
      await api.delete(`${config.endpoint}/${recordId(record)}`);
      await loadRecords();
      await Swal.fire({
        icon: "success",
        title: "Registro eliminado",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#4f46e5",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "No se pudo eliminar",
        text: errorMessage(error),
        confirmButtonText: "Entendido",
        confirmButtonColor: "#4f46e5",
      });
    }
  }

  function updateField(name, value) {
    setFormRecord((current) => ({ ...current, [name]: value }));
  }

  function fieldOptions(field) {
    if (field.type === "status") {
      return ["Activo", "Inactivo"].map((value) => ({ value, label: value }));
    }
    const options = catalogs[field.name] || [];
    return options
      .filter((option) => option.estado === "Activo" || recordId(option) === formRecord[field.name])
      .map((option) => ({
        value: recordId(option),
        label: option.nombre || option.nombres,
      }));
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark">C</span>
          <span>Cine<span className="brand-light">Admin</span></span>
        </a>
        <div className="sidebar-caption">GESTIÓN</div>
        <nav className="nav flex-column" aria-label="Módulos">
          {navigation.map((item) => (
            <button
              className={`nav-link ${selected === item.key ? "active" : ""}`}
              key={item.key}
              onClick={() => setSelected(item.key)}
              type="button"
            >
              <span className="nav-mark">{item.mark}</span>
              {item.label}
              {selected === item.key && <span className="nav-current" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="connection-dot" />
          API REST
          <span className="sidebar-version">v1.0</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb-text">Catálogo <span>/</span> {config.label}</div>
          <div className="profile">
            <span className="profile-avatar">A</span>
            <span><strong>Administrador</strong><small>Panel de control</small></span>
          </div>
        </header>

        <section className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">BIBLIOTECA AUDIOVISUAL</div>
              <h1>{config.label}</h1>
              <p>Administra y organiza la información de tu catálogo.</p>
            </div>
            <button className="btn btn-primary create-button" onClick={openCreateForm} type="button">
              <span className="plus">+</span> Nuevo {config.singular}
            </button>
          </div>

          <div className="summary-strip">
            <div className="summary-icon">{navigation.find((item) => item.key === selected)?.mark}</div>
            <div><strong>{records.length}</strong><span>registros en {config.label.toLocaleLowerCase("es")}</span></div>
            <div className="summary-divider" />
            <span className="summary-note"><span className="connection-dot" /> Sincronizado con la API</span>
          </div>

          <section className="data-card">
            <div className="card-toolbar">
              <div><h2>Listado de {config.label.toLocaleLowerCase("es")}</h2><span>{filteredRecords.length} resultados</span></div>
              <label className="search-box">
                <span aria-hidden="true">⌕</span>
                <input
                  aria-label="Buscar en el listado"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar..."
                  value={search}
                />
              </label>
            </div>
            {loadError && (
              <div className="alert alert-danger mx-4 mb-0" role="alert">
                {loadError} Comprueba que la API esté activa y que VITE_API_URL sea correcto.
                <button className="btn btn-sm btn-outline-danger ms-3" onClick={loadRecords} type="button">Reintentar</button>
              </div>
            )}
            <div className="table-responsive">
              <table className="table align-middle data-table">
                <thead>
                  <tr>{config.columns.map((column) => <th key={column.name}>{column.label}</th>)}<th className="actions-heading">ACCIONES</th></tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td className="empty-state" colSpan={config.columns.length + 1}><span className="spinner-border spinner-border-sm me-2" />Cargando registros...</td></tr>
                  ) : filteredRecords.length === 0 ? (
                    <tr><td className="empty-state" colSpan={config.columns.length + 1}>
                      {loadError ? "No hay datos disponibles." : search ? "No se encontraron resultados." : "Aún no hay registros. Crea el primero con el botón superior."}
                    </td></tr>
                  ) : filteredRecords.map((record) => (
                    <tr key={recordId(record)}>
                      {config.columns.map((column) => (
                        <td key={column.name}>
                          {column.name === "estado" ? (
                            <span className={`status-badge ${record.estado === "Activo" ? "status-active" : "status-inactive"}`}>{record.estado}</span>
                          ) : cellValue(record, column.name)}
                        </td>
                      ))}
                      <td className="actions-cell">
                        <button aria-label={`Editar ${record.titulo || record.nombre || record.nombres}`} className="action-button edit-action" onClick={() => openEditForm(record)} type="button">Editar</button>
                        <button aria-label={`Eliminar ${record.titulo || record.nombre || record.nombres}`} className="action-button delete-action" onClick={() => deleteRecord(record)} type="button">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-footer">Mostrando {filteredRecords.length} de {records.length} registros</div>
          </section>
          <footer className="page-footer">CineAdmin <span>·</span> Administración de películas y series</footer>
        </section>
      </main>

      {formRecord && (
        <div className="modal-backdrop-custom" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeForm();
        }}>
          <section aria-labelledby="form-title" aria-modal="true" className="form-modal" role="dialog">
            <div className="modal-header-custom">
              <div>
                <div className="eyebrow">{formRecord._isNew ? "NUEVO REGISTRO" : "EDITAR REGISTRO"}</div>
                <h2 id="form-title">{formRecord._isNew ? "Crear" : "Editar"} {config.singular}</h2>
              </div>
              <button aria-label="Cerrar formulario" className="close-button" onClick={closeForm} type="button">×</button>
            </div>
            <form onSubmit={submitForm}>
              <div className="form-fields">
                {config.fields.map((field) => (
                  <label className={`form-field ${field.type === "textarea" ? "field-wide" : ""}`} key={field.name}>
                    <span>{field.label}{field.required && <em> *</em>}</span>
                    {field.type === "textarea" ? (
                      <textarea
                        onChange={(event) => updateField(field.name, event.target.value)}
                        required={field.required}
                        rows="3"
                        value={formRecord[field.name] || ""}
                      />
                    ) : field.type === "select" || field.type === "status" ? (
                      <select
                        onChange={(event) => updateField(field.name, event.target.value)}
                        required={field.required}
                        value={formRecord[field.name] || ""}
                      >
                        <option value="" disabled>Selecciona una opción</option>
                        {fieldOptions(field).map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        max={field.type === "number" ? new Date().getFullYear() + 10 : undefined}
                        min={field.type === "number" ? 1888 : undefined}
                        onChange={(event) => updateField(field.name, event.target.value)}
                        required={field.required}
                        type={field.type || "text"}
                        value={formRecord[field.name] || ""}
                      />
                    )}
                  </label>
                ))}
              </div>
              <div className="modal-actions">
                <button className="btn btn-light cancel-button" disabled={saving} onClick={closeForm} type="button">Cancelar</button>
                <button className="btn btn-primary save-button" disabled={saving} type="submit">
                  {saving && <span className="spinner-border spinner-border-sm me-2" />}
                  {saving ? "Guardando..." : formRecord._isNew ? "Crear registro" : "Guardar cambios"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
