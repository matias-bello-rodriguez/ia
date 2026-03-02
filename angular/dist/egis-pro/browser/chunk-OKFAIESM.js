import {
  HttpClient,
  HttpParams,
  Injectable,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-OHDET2P6.js";

// src/app/core/services/api-config.ts
var API_BASE_URL = "http://localhost:8000/api";

// src/app/shared/mappers/index.ts
var BAR_FILLS = {
  "Pendiente": "var(--bs-warning)",
  "En Proceso": "var(--bs-primary)",
  "Visado": "#6f42c1",
  "Listo SERVIU": "var(--bs-success)",
  "Rechazado": "var(--bs-danger)"
};
var PIE_COLORS = ["var(--bs-primary)", "#6f42c1", "var(--bs-info)", "var(--bs-secondary)"];
function mapDashboardAlerts(alertas) {
  return alertas.map((a) => ({
    beneficiary: a.beneficiario_nombre,
    rut: a.rut,
    document: a.nombre_documento,
    daysLeft: a.dias_restantes,
    committee: a.committee,
    severity: a.severidad === "critical" ? "critical" : "warning"
  }));
}
function mapDashboardBarData(estadoCarpetas) {
  return estadoCarpetas.map((e) => ({
    name: e.name,
    value: e.value,
    fill: BAR_FILLS[e.name] ?? "var(--bs-secondary)"
  }));
}
function mapDashboardPieData(subsidiosActivos) {
  return subsidiosActivos.map((s, i) => ({
    name: s.name,
    value: s.value,
    color: PIE_COLORS[i % PIE_COLORS.length]
  }));
}
function mapProyecto(p) {
  return {
    id: p.id,
    name: p.nombre,
    location: p.ubicacion,
    type: p.tipo,
    classification: p.clasificacion,
    beneficiaries: p.cantidad_beneficiarios,
    progress: p.avance_pct,
    status: p.estado
  };
}
function mapProyectos(list) {
  return list.map(mapProyecto);
}
function mapBeneficiario(b) {
  return {
    id: b.id,
    name: b.nombre,
    rut: b.rut,
    rsh: b.rsh_pct ?? "",
    savings: b.ahorro_uf ?? "",
    minSavings: b.ahorro_minimo_uf ?? "",
    suggestedSubsidy: b.subsidio_sugerido_nombre ?? "",
    matchScore: b.puntaje_match ?? 0,
    status: b.estado ?? "pending",
    committee: b.proyecto?.nombre ?? "",
    phone: b.telefono
  };
}
function mapBeneficiarios(list) {
  return list.map(mapBeneficiario);
}
function mapProjectToApi(p) {
  return {
    nombre: p.name,
    ubicacion: p.location,
    tipo: p.type,
    clasificacion: p.classification,
    cantidad_beneficiarios: p.beneficiaries ?? 0,
    avance_pct: p.progress ?? 0,
    estado: p.status ?? "activo"
  };
}
function mapBeneficiarioToApi(b, proyectoId) {
  return {
    proyecto_id: proyectoId,
    nombre: b.name,
    rut: b.rut,
    telefono: b.phone ?? "",
    rsh_pct: b.rsh ?? "",
    ahorro_uf: b.savings ?? "",
    ahorro_minimo_uf: b.minSavings ?? "",
    puntaje_match: b.matchScore,
    estado: b.status ?? "pendiente"
  };
}
function mapDocQueueItem(d) {
  return {
    id: d.id,
    name: d.nombre_archivo,
    type: d.tipo_documento,
    status: d.estado ?? "approved",
    vigencia: d.vigencia
  };
}
function mapDocQueue(list) {
  return list.map(mapDocQueueItem);
}
function mapReporteRow(c) {
  const b = c.beneficiario;
  return {
    id: String(c.id),
    beneficiario: b?.nombre ?? "",
    comite: b?.proyecto?.nombre ?? "",
    estadoSubsidio: c.estado_subsidio ?? "",
    montoUF: c.monto_uf ?? "",
    vistoBuenoITO: c.visto_bueno_ito,
    checkSeremi: c.check_seremi,
    resolucion: c.resolucion,
    informeUniversidad: c.informe_universidad,
    listoParaFacturar: c.listo_para_facturar
  };
}
function mapReporteGrid(list) {
  return list.map(mapReporteRow);
}
function mapCarpetaFile(f) {
  return {
    id: f.id,
    name: f.nombre_archivo,
    type: f.tipo_documento,
    folio: f.folio ?? 0,
    status: f.estado === "aprobado" ? "ok" : "generated"
  };
}
function mapCarpetaFiles(list) {
  return list.map(mapCarpetaFile);
}
function formatLastContact(ultimo) {
  if (!ultimo)
    return "Nunca contactado";
  try {
    const d = new Date(ultimo);
    if (isNaN(d.getTime()))
      return ultimo;
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
    if (diffDays === 0)
      return "Hoy";
    if (diffDays === 1)
      return "Hace 1 d\xEDa";
    if (diffDays < 7)
      return `Hace ${diffDays} d\xEDas`;
    if (diffDays < 30)
      return `Hace ${Math.floor(diffDays / 7)} semana(s)`;
    return ultimo;
  } catch (e) {
    return ultimo ?? "Nunca contactado";
  }
}
function mapContact(c) {
  return {
    id: c.id,
    name: c.beneficiario_nombre,
    rut: c.rut,
    phone: c.telefono ?? "",
    missing: c.documentos_faltantes ?? [],
    urgency: c.urgencia === "critical" ? "critical" : "warning",
    lastContact: formatLastContact(c.ultimo_contacto_en),
    committee: c.committee
  };
}
function mapContacts(list) {
  return list.map(mapContact);
}
function mapSubsidyRule(r) {
  return {
    id: r.id,
    name: r.nombre,
    description: r.descripcion,
    minSavings: r.ahorro_minimo_uf,
    maxRSH: r.rsh_maximo_pct,
    cutoffScore: r.puntaje_corte,
    maxUF: r.tope_uf,
    lastUpdate: r.ultima_actualizacion,
    source: r.fuente
  };
}
function mapSubsidyRules(list) {
  return list.map(mapSubsidyRule);
}
function mapSubsidyRuleToApi(r) {
  return {
    nombre: r.name,
    descripcion: r.description,
    ahorro_minimo_uf: r.minSavings,
    rsh_maximo_pct: r.maxRSH,
    puntaje_corte: r.cutoffScore,
    tope_uf: r.maxUF,
    fuente: r.source
  };
}
function mapDocumentRule(r) {
  return {
    name: r.nombre,
    maxAge: r.vigencia_maxima,
    unit: r.unidad,
    required: r.obligatorio
  };
}
function mapDocumentRules(list) {
  return list.map(mapDocumentRule);
}
function mapAiModule(m) {
  return {
    module: m.nombre_mostrar,
    status: m.estado,
    version: m.version
  };
}
function mapAiModules(list) {
  return list.map(mapAiModule);
}

// src/app/core/services/documentos.service.ts
var DocumentosService = class _DocumentosService {
  constructor(http) {
    this.http = http;
    this.base = `${API_BASE_URL}/documentos`;
  }
  getCola(vigencia) {
    let params = new HttpParams();
    if (vigencia && vigencia !== "todos")
      params = params.set("vigencia", vigencia);
    return this.http.get(`${this.base}/cola/`, { params }).pipe(map(mapDocQueue));
  }
  /** POST /api/documentos/visar/ — devuelve resultados de extracción IA (mock en backend). */
  visar(file) {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      return this.http.post(`${this.base}/visar/`, formData);
    }
    return this.http.post(`${this.base}/visar/`, {});
  }
  static {
    this.\u0275fac = function DocumentosService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DocumentosService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DocumentosService, factory: _DocumentosService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DocumentosService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  API_BASE_URL,
  mapDashboardAlerts,
  mapDashboardBarData,
  mapDashboardPieData,
  mapProyecto,
  mapProyectos,
  mapBeneficiario,
  mapBeneficiarios,
  mapProjectToApi,
  mapBeneficiarioToApi,
  mapReporteGrid,
  mapCarpetaFiles,
  mapContacts,
  mapSubsidyRule,
  mapSubsidyRules,
  mapSubsidyRuleToApi,
  mapDocumentRules,
  mapAiModules,
  DocumentosService
};
//# sourceMappingURL=chunk-OKFAIESM.js.map
