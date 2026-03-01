import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-BNGTIDGH.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7OUYEERV.js";

// src/app/features/comites/comites.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.rut;
function ComitesComponent_Conditional_10_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275element(1, "i", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r1.name);
  }
}
function ComitesComponent_Conditional_10_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 7)(2, "div", 13)(3, "div", 22)(4, "div")(5, "h6", 11);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 12);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 23);
    \u0275\u0275element(10, "i", 24);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 25)(13, "span", 12);
    \u0275\u0275text(14, "Clasificaci\xF3n IA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 26);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 25)(18, "span", 12);
    \u0275\u0275text(19, "Beneficiarios:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 27);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 25)(23, "span", 12);
    \u0275\u0275text(24, "Avance General:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 27);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 28);
    \u0275\u0275element(28, "div", 29);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const project_r2 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(project_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r2.location);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-danger", project_r2.classification === "Campamento")("bg-success", project_r2.classification !== "Campamento");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", project_r2.type, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(project_r2.classification);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(project_r2.beneficiaries);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", project_r2.progress, "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", project_r2.progress, "%");
  }
}
function ComitesComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 8)(2, "div", 9)(3, "div", 10)(4, "h6", 11);
    \u0275\u0275text(5, "Geolocalizaci\xF3n de Proyectos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 12);
    \u0275\u0275text(7, "Mapa interactivo de ubicaciones");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 13)(9, "div", 14);
    \u0275\u0275element(10, "i", 15);
    \u0275\u0275elementStart(11, "span", 16);
    \u0275\u0275text(12, "Mapa Interactivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 17);
    \u0275\u0275text(14, "Regi\xF3n Metropolitana, Chile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 18);
    \u0275\u0275repeaterCreate(16, ComitesComponent_Conditional_10_For_17_Template, 3, 1, "span", 19, _forTrack0);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(18, "div", 8)(19, "div", 20);
    \u0275\u0275repeaterCreate(20, ComitesComponent_Conditional_10_For_21_Template, 29, 12, "div", 21, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function ComitesComponent_Conditional_11_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 38);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 12);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td")(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small", 12);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td")(15, "div", 39)(16, "div", 40);
    \u0275\u0275element(17, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 41);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "td")(21, "span", 42);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "td")(24, "span", 23);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const b_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r5.rut);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r5.committee);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r5.rsh);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-danger", ctx_r2.toNumber(b_r5.savings) < ctx_r2.toNumber(b_r5.minSavings))("text-success", ctx_r2.toNumber(b_r5.savings) >= ctx_r2.toNumber(b_r5.minSavings));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r5.savings);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" / ", b_r5.minSavings);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", b_r5.matchScore, "%");
    \u0275\u0275classProp("bg-success", b_r5.matchScore >= 80)("bg-warning", b_r5.matchScore >= 60 && b_r5.matchScore < 80)("bg-danger", b_r5.matchScore < 60);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", b_r5.matchScore, "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(b_r5.suggestedSubsidy);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-success", b_r5.status === "approved")("bg-danger", b_r5.status === "alert")("bg-secondary", b_r5.status === "pending");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", b_r5.status === "approved" ? "Aprobado" : b_r5.status === "alert" ? "Alerta" : "Pendiente", " ");
  }
}
function ComitesComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 30)(2, "div")(3, "h6", 11);
    \u0275\u0275text(4, "Panel de Beneficiarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small", 12);
    \u0275\u0275text(6, "Clasificaci\xF3n y match de subsidios por IA");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 31)(8, "span", 32);
    \u0275\u0275element(9, "i", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function ComitesComponent_Conditional_11_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.search, $event) || (ctx_r2.search = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 35)(12, "table", 36)(13, "thead")(14, "tr")(15, "th");
    \u0275\u0275text(16, "Beneficiario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "RUT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Comit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22, "RSH");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th");
    \u0275\u0275text(24, "Ahorro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 37);
    \u0275\u0275text(26, "Match IA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th");
    \u0275\u0275text(28, "Subsidio Sugerido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th");
    \u0275\u0275text(30, "Estado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "tbody");
    \u0275\u0275repeaterCreate(32, ComitesComponent_Conditional_11_For_33_Template, 26, 27, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.search);
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r2.filteredBeneficiaries);
  }
}
var PROJECTS = [
  { id: 1, name: "Villa Esperanza", location: "Puente Alto, RM", type: "Radicaci\xF3n", classification: "Campamento", beneficiaries: 45, progress: 72 },
  { id: 2, name: "Poblaci\xF3n Aurora", location: "La Pintana, RM", type: "Mejoramiento", classification: "Vivienda Consolidada", beneficiaries: 32, progress: 45 },
  { id: 3, name: "Comit\xE9 Los Aromos", location: "Cerro Navia, RM", type: "Radicaci\xF3n", classification: "Campamento", beneficiaries: 28, progress: 90 },
  { id: 4, name: "Condominio Social Sol", location: "San Bernardo, RM", type: "Mejoramiento", classification: "Vivienda Consolidada", beneficiaries: 60, progress: 15 }
];
var BENEFICIARIES = [
  { name: "Maria Gonzalez Soto", rut: "12.345.678-9", rsh: "40%", savings: "25 UF", minSavings: "15 UF", suggestedSubsidy: "DS49", matchScore: 92, status: "approved", committee: "Villa Esperanza" },
  { name: "Pedro Ramirez Lagos", rut: "11.222.333-4", rsh: "50%", savings: "30 UF", minSavings: "20 UF", suggestedSubsidy: "DS1", matchScore: 85, status: "pending", committee: "Poblaci\xF3n Aurora" },
  { name: "Ana Mu\xF1oz Vera", rut: "15.678.901-2", rsh: "35%", savings: "10 UF", minSavings: "15 UF", suggestedSubsidy: "DS49", matchScore: 67, status: "alert", committee: "Comit\xE9 Los Aromos" },
  { name: "Carlos Diaz Fuentes", rut: "9.876.543-1", rsh: "60%", savings: "50 UF", minSavings: "30 UF", suggestedSubsidy: "DS1", matchScore: 95, status: "approved", committee: "Villa Esperanza" },
  { name: "Luisa Torres Pino", rut: "14.567.890-K", rsh: "45%", savings: "12 UF", minSavings: "15 UF", suggestedSubsidy: "DS49", matchScore: 58, status: "alert", committee: "Poblaci\xF3n Aurora" },
  { name: "Roberto Vega Mar\xEDn", rut: "16.789.012-3", rsh: "30%", savings: "20 UF", minSavings: "15 UF", suggestedSubsidy: "DS49", matchScore: 88, status: "approved", committee: "Comit\xE9 Los Aromos" }
];
var ComitesComponent = class _ComitesComponent {
  constructor() {
    this.projects = PROJECTS;
    this.beneficiaries = BENEFICIARIES;
    this.search = "";
    this.activeTab = "projects";
  }
  get filteredBeneficiaries() {
    const s = this.search.toLowerCase();
    return this.beneficiaries.filter((b) => b.name.toLowerCase().includes(s) || b.rut.includes(this.search) || b.committee.toLowerCase().includes(s));
  }
  /** Expone parseInt para usar en la plantilla (ej. "25 UF" → 25). */
  toNumber(s) {
    return parseInt(s, 10) || 0;
  }
  static {
    this.\u0275fac = function ComitesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ComitesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ComitesComponent, selectors: [["app-comites"]], decls: 12, vars: 6, consts: [[1, "d-flex", "flex-column", "gap-4"], [1, "nav", "nav-tabs"], [1, "nav-item"], ["href", "javascript:void(0)", 1, "nav-link", 3, "click"], [1, "bi", "bi-geo-alt", "me-1"], [1, "bi", "bi-people", "me-1"], [1, "row", "g-4"], [1, "card"], [1, "col-12", "col-lg-6"], [1, "card", "h-100"], [1, "card-header"], [1, "mb-0"], [1, "text-body-secondary"], [1, "card-body"], [1, "border", "border-2", "border-dashed", "rounded", "d-flex", "flex-column", "align-items-center", "justify-content-center", "bg-light", 2, "min-height", "280px"], [1, "bi", "bi-geo-alt", "fs-1", "text-body-secondary"], [1, "fw-medium", "text-body-secondary"], [1, "small", "text-body-secondary"], [1, "d-flex", "flex-wrap", "gap-2", "mt-2"], [1, "badge", "bg-light", "text-dark", "border"], [1, "row", "g-3"], [1, "col-12"], [1, "d-flex", "justify-content-between", "align-items-start", "mb-2"], [1, "badge"], [1, "bi", "bi-stars", "me-1"], [1, "d-flex", "justify-content-between", "small", "mb-1"], [1, "badge", "bg-secondary"], [1, "fw-medium"], [1, "progress", 2, "height", "6px"], [1, "progress-bar"], [1, "card-header", "d-flex", "flex-column", "flex-sm-row", "justify-content-between", "align-items-start", "gap-3"], [1, "input-group", 2, "max-width", "280px"], [1, "input-group-text"], [1, "bi", "bi-search"], ["type", "text", "placeholder", "Buscar por nombre, RUT o comit\xE9...", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel"], [1, "card-body", "p-0", "overflow-auto"], [1, "table", "table-hover", "mb-0"], [1, "text-center"], [1, "small", "font-monospace"], [1, "d-flex", "align-items-center", "justify-content-center", "gap-2"], [1, "progress", "flex-grow-1", 2, "width", "60px", "height", "8px"], [1, "small", "fw-medium"], [1, "badge", "bg-secondary", "font-monospace"]], template: function ComitesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "ul", 1)(2, "li", 2)(3, "a", 3);
        \u0275\u0275listener("click", function ComitesComponent_Template_a_click_3_listener() {
          return ctx.activeTab = "projects";
        });
        \u0275\u0275element(4, "i", 4);
        \u0275\u0275text(5, " Proyectos ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "li", 2)(7, "a", 3);
        \u0275\u0275listener("click", function ComitesComponent_Template_a_click_7_listener() {
          return ctx.activeTab = "beneficiaries";
        });
        \u0275\u0275element(8, "i", 5);
        \u0275\u0275text(9, " Beneficiarios ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(10, ComitesComponent_Conditional_10_Template, 22, 0, "div", 6);
        \u0275\u0275conditionalCreate(11, ComitesComponent_Conditional_11_Template, 34, 1, "div", 7);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275classProp("active", ctx.activeTab === "projects");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active", ctx.activeTab === "beneficiaries");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.activeTab === "projects" ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeTab === "beneficiaries" ? 11 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComitesComponent, [{
    type: Component,
    args: [{ selector: "app-comites", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="d-flex flex-column gap-4">\r
  <ul class="nav nav-tabs">\r
    <li class="nav-item">\r
      <a class="nav-link" [class.active]="activeTab === 'projects'" (click)="activeTab = 'projects'" href="javascript:void(0)">\r
        <i class="bi bi-geo-alt me-1"></i> Proyectos\r
      </a>\r
    </li>\r
    <li class="nav-item">\r
      <a class="nav-link" [class.active]="activeTab === 'beneficiaries'" (click)="activeTab = 'beneficiaries'" href="javascript:void(0)">\r
        <i class="bi bi-people me-1"></i> Beneficiarios\r
      </a>\r
    </li>\r
  </ul>\r
\r
  @if (activeTab === 'projects') {\r
    <div class="row g-4">\r
      <div class="col-12 col-lg-6">\r
        <div class="card h-100">\r
          <div class="card-header">\r
            <h6 class="mb-0">Geolocalizaci\xF3n de Proyectos</h6>\r
            <small class="text-body-secondary">Mapa interactivo de ubicaciones</small>\r
          </div>\r
          <div class="card-body">\r
            <div class="border border-2 border-dashed rounded d-flex flex-column align-items-center justify-content-center bg-light" style="min-height: 280px;">\r
              <i class="bi bi-geo-alt fs-1 text-body-secondary"></i>\r
              <span class="fw-medium text-body-secondary">Mapa Interactivo</span>\r
              <span class="small text-body-secondary">Regi\xF3n Metropolitana, Chile</span>\r
              <div class="d-flex flex-wrap gap-2 mt-2">\r
                @for (p of projects; track p.id) {\r
                  <span class="badge bg-light text-dark border"><i class="bi bi-geo-alt me-1"></i>{{ p.name }}</span>\r
                }\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
      <div class="col-12 col-lg-6">\r
        <div class="row g-3">\r
          @for (project of projects; track project.id) {\r
            <div class="col-12">\r
              <div class="card">\r
                <div class="card-body">\r
                  <div class="d-flex justify-content-between align-items-start mb-2">\r
                    <div>\r
                      <h6 class="mb-0">{{ project.name }}</h6>\r
                      <small class="text-body-secondary">{{ project.location }}</small>\r
                    </div>\r
                    <span class="badge" [class.bg-danger]="project.classification === 'Campamento'" [class.bg-success]="project.classification !== 'Campamento'">\r
                      <i class="bi bi-stars me-1"></i>{{ project.type }}\r
                    </span>\r
                  </div>\r
                  <div class="d-flex justify-content-between small mb-1">\r
                    <span class="text-body-secondary">Clasificaci\xF3n IA:</span>\r
                    <span class="badge bg-secondary">{{ project.classification }}</span>\r
                  </div>\r
                  <div class="d-flex justify-content-between small mb-1">\r
                    <span class="text-body-secondary">Beneficiarios:</span>\r
                    <span class="fw-medium">{{ project.beneficiaries }}</span>\r
                  </div>\r
                  <div class="d-flex justify-content-between small mb-1">\r
                    <span class="text-body-secondary">Avance General:</span>\r
                    <span class="fw-medium">{{ project.progress }}%</span>\r
                  </div>\r
                  <div class="progress" style="height: 6px;">\r
                    <div class="progress-bar" [style.width.%]="project.progress"></div>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  @if (activeTab === 'beneficiaries') {\r
    <div class="card">\r
      <div class="card-header d-flex flex-column flex-sm-row justify-content-between align-items-start gap-3">\r
        <div>\r
          <h6 class="mb-0">Panel de Beneficiarios</h6>\r
          <small class="text-body-secondary">Clasificaci\xF3n y match de subsidios por IA</small>\r
        </div>\r
        <div class="input-group" style="max-width: 280px;">\r
          <span class="input-group-text"><i class="bi bi-search"></i></span>\r
          <input type="text" class="form-control form-control-sm" placeholder="Buscar por nombre, RUT o comit\xE9..." [(ngModel)]="search">\r
        </div>\r
      </div>\r
      <div class="card-body p-0 overflow-auto">\r
        <table class="table table-hover mb-0">\r
          <thead>\r
            <tr>\r
              <th>Beneficiario</th>\r
              <th>RUT</th>\r
              <th>Comit\xE9</th>\r
              <th>RSH</th>\r
              <th>Ahorro</th>\r
              <th class="text-center">Match IA</th>\r
              <th>Subsidio Sugerido</th>\r
              <th>Estado</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            @for (b of filteredBeneficiaries; track b.rut) {\r
              <tr>\r
                <td class="fw-medium">{{ b.name }}</td>\r
                <td class="small font-monospace">{{ b.rut }}</td>\r
                <td class="text-body-secondary">{{ b.committee }}</td>\r
                <td>{{ b.rsh }}</td>\r
                <td>\r
                  <span [class.text-danger]="toNumber(b.savings) < toNumber(b.minSavings)" [class.text-success]="toNumber(b.savings) >= toNumber(b.minSavings)">{{ b.savings }}</span>\r
                  <small class="text-body-secondary"> / {{ b.minSavings }}</small>\r
                </td>\r
                <td>\r
                  <div class="d-flex align-items-center justify-content-center gap-2">\r
                    <div class="progress flex-grow-1" style="width: 60px; height: 8px;">\r
                      <div class="progress-bar" [class.bg-success]="b.matchScore >= 80" [class.bg-warning]="b.matchScore >= 60 && b.matchScore < 80" [class.bg-danger]="b.matchScore < 60" [style.width.%]="b.matchScore"></div>\r
                    </div>\r
                    <span class="small fw-medium">{{ b.matchScore }}%</span>\r
                  </div>\r
                </td>\r
                <td><span class="badge bg-secondary font-monospace">{{ b.suggestedSubsidy }}</span></td>\r
                <td>\r
                  <span class="badge" [class.bg-success]="b.status === 'approved'" [class.bg-danger]="b.status === 'alert'" [class.bg-secondary]="b.status === 'pending'">\r
                    {{ b.status === 'approved' ? 'Aprobado' : b.status === 'alert' ? 'Alerta' : 'Pendiente' }}\r
                  </span>\r
                </td>\r
              </tr>\r
            }\r
          </tbody>\r
        </table>\r
      </div>\r
    </div>\r
  }\r
</div>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ComitesComponent, { className: "ComitesComponent", filePath: "src/app/features/comites/comites.component.ts", lineNumber: 27 });
})();
export {
  ComitesComponent
};
//# sourceMappingURL=chunk-XEBFEERJ.js.map
