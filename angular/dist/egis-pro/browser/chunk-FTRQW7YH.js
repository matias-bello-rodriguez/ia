import {
  Router
} from "./chunk-FCVQJ543.js";
import {
  API_BASE_URL,
  mapAiModules,
  mapBeneficiario,
  mapBeneficiarioToApi,
  mapBeneficiarios,
  mapCarpetaFiles,
  mapContacts,
  mapDashboardAlerts,
  mapDashboardBarData,
  mapDashboardPieData,
  mapDocumentRules,
  mapProjectToApi,
  mapProyecto,
  mapProyectos,
  mapReporteGrid,
  mapSubsidyRule,
  mapSubsidyRuleToApi,
  mapSubsidyRules
} from "./chunk-OKFAIESM.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  catchError,
  map,
  of,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-OHDET2P6.js";

// src/app/core/services/auth.service.ts
var TOKEN_KEY = "egis_token";
var USER_KEY = "egis_user";
var AuthService = class _AuthService {
  constructor(http, router) {
    this.http = http;
    this.router = router;
  }
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  getUser() {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
  isLoggedIn() {
    return !!this.getToken();
  }
  login(email, password) {
    const url = `${API_BASE_URL}/auth/login/`;
    return this.http.post(url, { email, password }).pipe(tap((res) => {
      sessionStorage.setItem(TOKEN_KEY, res.token);
      sessionStorage.setItem(USER_KEY, JSON.stringify(res.user));
    }), catchError(() => this.loginLocal(email, password)));
  }
  /** Login local cuando el backend no tiene auth. */
  loginLocal(email, _password) {
    const user = { id: 1, email, nombre: email.split("@")[0] };
    const token = "local-" + Math.random().toString(36).slice(2);
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    return of({ token, user });
  }
  register(payload) {
    const url = `${API_BASE_URL}/auth/register/`;
    return this.http.post(url, payload).pipe(tap((res) => {
      sessionStorage.setItem(TOKEN_KEY, res.token);
      sessionStorage.setItem(USER_KEY, JSON.stringify(res.user));
    }), catchError(() => this.registerLocal(payload)));
  }
  /** Registro local cuando el backend no tiene auth. */
  registerLocal(payload) {
    const user = {
      id: Date.now(),
      email: payload.email,
      nombre: payload.nombre ?? payload.email.split("@")[0]
    };
    const token = "local-" + Math.random().toString(36).slice(2);
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    return of({ token, user });
  }
  logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    this.router.navigate(["/login"]);
  }
  static {
    this.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

// src/app/core/services/dashboard.service.ts
var METRIC_ICONS = {
  totalUfProceso: "bi-currency-dollar",
  carpetasListas: "bi-folder-check",
  proyectosConstruccion: "bi-bricks",
  alertasCriticas: "bi-exclamation-triangle"
};
var DashboardService = class _DashboardService {
  constructor(http) {
    this.http = http;
    this.url = `${API_BASE_URL}/dashboard/`;
  }
  getDashboard() {
    return this.http.get(this.url).pipe(map((res) => {
      const m = res.metricas;
      const metrics = [
        {
          title: "Total UF en Proceso",
          value: String(m.totalUfProceso),
          subtitle: "UF activas en subsidios",
          trend: "+5.2% vs mes anterior",
          icon: METRIC_ICONS.totalUfProceso
        },
        {
          title: "Carpetas 100% Listas",
          value: String(m.carpetasListas),
          subtitle: "Listas para SERVIU",
          trend: "8 nuevas esta semana",
          icon: METRIC_ICONS.carpetasListas
        },
        {
          title: "Proyectos en Construcci\xF3n",
          value: String(m.proyectosConstruccion),
          subtitle: "En ejecuci\xF3n activa",
          trend: "3 por iniciar",
          icon: METRIC_ICONS.proyectosConstruccion
        },
        {
          title: "Alertas Cr\xEDticas",
          value: String(m.alertasCriticas),
          subtitle: "Requieren atenci\xF3n",
          trend: "2 documentos por vencer hoy",
          icon: METRIC_ICONS.alertasCriticas
        }
      ];
      return {
        metrics,
        barData: mapDashboardBarData(res.estadoCarpetas),
        pieData: mapDashboardPieData(res.subsidiosActivos),
        alerts: mapDashboardAlerts(res.alertas)
      };
    }));
  }
  static {
    this.\u0275fac = function DashboardService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/core/services/proyectos.service.ts
var ProyectosService = class _ProyectosService {
  constructor(http) {
    this.http = http;
    this.url = `${API_BASE_URL}/proyectos/`;
  }
  getAll() {
    return this.http.get(this.url).pipe(map(mapProyectos));
  }
  getById(id) {
    return this.http.get(`${this.url}${id}/`).pipe(map(mapProyecto));
  }
  create(project) {
    return this.http.post(this.url, mapProjectToApi(project)).pipe(map(mapProyecto));
  }
  update(id, project) {
    return this.http.patch(`${this.url}${id}/`, mapProjectToApi(project)).pipe(map(mapProyecto));
  }
  static {
    this.\u0275fac = function ProyectosService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProyectosService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProyectosService, factory: _ProyectosService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProyectosService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/core/services/beneficiarios.service.ts
var BeneficiariosService = class _BeneficiariosService {
  constructor(http) {
    this.http = http;
    this.url = `${API_BASE_URL}/beneficiarios/`;
  }
  getAll(query) {
    let params = new HttpParams();
    if (query?.proyectoId != null)
      params = params.set("proyectoId", query.proyectoId);
    if (query?.q)
      params = params.set("q", query.q);
    return this.http.get(this.url, { params }).pipe(map(mapBeneficiarios));
  }
  getById(id) {
    return this.http.get(`${this.url}${id}/`).pipe(map(mapBeneficiario));
  }
  create(beneficiary, proyectoId) {
    return this.http.post(this.url, mapBeneficiarioToApi(beneficiary, proyectoId)).pipe(map(mapBeneficiario));
  }
  update(id, beneficiary, proyectoId) {
    return this.http.patch(`${this.url}${id}/`, mapBeneficiarioToApi(beneficiary, proyectoId)).pipe(map(mapBeneficiario));
  }
  static {
    this.\u0275fac = function BeneficiariosService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BeneficiariosService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BeneficiariosService, factory: _BeneficiariosService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BeneficiariosService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/core/services/reportes.service.ts
var ReportesService = class _ReportesService {
  constructor(http) {
    this.http = http;
    this.base = API_BASE_URL;
  }
  getReporteEjecutivo() {
    return this.http.get(`${this.base}/reportes/ejecutivo/`).pipe(map(mapReporteGrid));
  }
  getCarpetaArchivos(carpetaId) {
    return this.http.get(`${this.base}/carpetas/${carpetaId}/archivos/`).pipe(map(mapCarpetaFiles));
  }
  marcarListoParaFacturar(carpetaId) {
    return this.http.patch(`${this.base}/carpetas/${carpetaId}/listo-facturar/`, {});
  }
  getInformesTerceros(carpetaId) {
    return this.http.get(`${this.base}/carpetas/${carpetaId}/informes-terceros/`);
  }
  static {
    this.\u0275fac = function ReportesService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReportesService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReportesService, factory: _ReportesService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/core/services/notificaciones.service.ts
var NotificacionesService = class _NotificacionesService {
  constructor(http) {
    this.http = http;
    this.base = `${API_BASE_URL}/notificaciones`;
  }
  getContactosPendientes() {
    return this.http.get(`${this.base}/contactos-pendientes/`).pipe(map(mapContacts));
  }
  marcarEnviado(contactoId) {
    return this.http.post(`${this.base}/contactos-pendientes/${contactoId}/enviar/`, {});
  }
  static {
    this.\u0275fac = function NotificacionesService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificacionesService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificacionesService, factory: _NotificacionesService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificacionesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/core/services/configuracion.service.ts
var ConfiguracionService = class _ConfiguracionService {
  constructor(http) {
    this.http = http;
    this.base = `${API_BASE_URL}/configuracion`;
  }
  getReglasSubsidio() {
    return this.http.get(`${this.base}/reglas-subsidio/`).pipe(map(mapSubsidyRules));
  }
  getReglaSubsidio(id) {
    return this.http.get(`${this.base}/reglas-subsidio/${id}/`).pipe(map(mapSubsidyRule));
  }
  updateReglaSubsidio(id, rule) {
    return this.http.patch(`${this.base}/reglas-subsidio/${id}/`, mapSubsidyRuleToApi(rule)).pipe(map(mapSubsidyRule));
  }
  getReglasDocumento() {
    return this.http.get(`${this.base}/reglas-documento/`).pipe(map(mapDocumentRules));
  }
  getModulosIA() {
    return this.http.get(`${this.base}/modulos-ia/`).pipe(map(mapAiModules));
  }
  static {
    this.\u0275fac = function ConfiguracionService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ConfiguracionService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ConfiguracionService, factory: _ConfiguracionService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfiguracionService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  AuthService,
  DashboardService,
  ProyectosService,
  BeneficiariosService,
  ReportesService,
  NotificacionesService,
  ConfiguracionService
};
//# sourceMappingURL=chunk-FTRQW7YH.js.map
