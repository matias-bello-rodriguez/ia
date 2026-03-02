import {
  BeneficiariosService,
  ProyectosService
} from "./chunk-FTRQW7YH.js";
import "./chunk-FCVQJ543.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-O4IN2EJS.js";
import "./chunk-OKFAIESM.js";
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
  ɵɵdirectiveInject,
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
} from "./chunk-OHDET2P6.js";

// src/app/features/comites/comites.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.rut;
function ComitesComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "div", 8);
    \u0275\u0275elementStart(2, "p", 9);
    \u0275\u0275text(3, "Cargando proyectos...");
    \u0275\u0275elementEnd()();
  }
}
function ComitesComponent_Conditional_10_Conditional_1_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
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
function ComitesComponent_Conditional_10_Conditional_1_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "div", 15)(3, "div", 25)(4, "div")(5, "h6", 13);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 26);
    \u0275\u0275element(10, "i", 27);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 28)(13, "span", 14);
    \u0275\u0275text(14, "Clasificaci\xF3n IA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 29);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 28)(18, "span", 14);
    \u0275\u0275text(19, "Beneficiarios:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 30);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 28)(23, "span", 14);
    \u0275\u0275text(24, "Avance General:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 30);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 31);
    \u0275\u0275element(28, "div", 32);
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
function ComitesComponent_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 10)(2, "div", 11)(3, "div", 12)(4, "h6", 13);
    \u0275\u0275text(5, "Geolocalizaci\xF3n de Proyectos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 14);
    \u0275\u0275text(7, "Mapa interactivo de ubicaciones");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 15)(9, "div", 16);
    \u0275\u0275element(10, "i", 17);
    \u0275\u0275elementStart(11, "span", 18);
    \u0275\u0275text(12, "Mapa Interactivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 19);
    \u0275\u0275text(14, "Regi\xF3n Metropolitana, Chile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 20);
    \u0275\u0275repeaterCreate(16, ComitesComponent_Conditional_10_Conditional_1_For_17_Template, 3, 1, "span", 21, _forTrack0);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(18, "div", 10)(19, "div", 22);
    \u0275\u0275repeaterCreate(20, ComitesComponent_Conditional_10_Conditional_1_For_21_Template, 29, 12, "div", 23, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function ComitesComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ComitesComponent_Conditional_10_Conditional_0_Template, 4, 0, "div", 6)(1, ComitesComponent_Conditional_10_Conditional_1_Template, 22, 0, "div", 7);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.loadingProjects ? 0 : 1);
  }
}
function ComitesComponent_Conditional_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "div", 8);
    \u0275\u0275elementStart(2, "p", 9);
    \u0275\u0275text(3, "Cargando beneficiarios...");
    \u0275\u0275elementEnd()();
  }
}
function ComitesComponent_Conditional_11_Conditional_1_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 14);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td")(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small", 14);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td")(15, "div", 43)(16, "div", 44);
    \u0275\u0275element(17, "div", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 45);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "td")(21, "span", 46);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "td")(24, "span", 26);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const b_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
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
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", b_r5.matchScore, "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(b_r5.suggestedSubsidy);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("badge-enviada", b_r5.status === "approved")("badge-cerrada", b_r5.status === "alert")("badge-borrador", b_r5.status === "pending");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", b_r5.status === "approved" ? "Aprobado" : b_r5.status === "alert" ? "Alerta" : "Pendiente", " ");
  }
}
function ComitesComponent_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 33)(2, "div")(3, "h6", 13);
    \u0275\u0275text(4, "Panel de Beneficiarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small", 14);
    \u0275\u0275text(6, "Clasificaci\xF3n y match de subsidios por IA");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 34)(8, "span", 35);
    \u0275\u0275element(9, "i", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function ComitesComponent_Conditional_11_Conditional_1_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.search, $event) || (ctx_r2.search = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 38)(12, "div", 39)(13, "table", 40)(14, "thead")(15, "tr")(16, "th");
    \u0275\u0275text(17, "Beneficiario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "RUT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "Comit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th");
    \u0275\u0275text(23, "RSH");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th");
    \u0275\u0275text(25, "Ahorro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th", 41);
    \u0275\u0275text(27, "Match IA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "th");
    \u0275\u0275text(29, "Subsidio Sugerido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "th");
    \u0275\u0275text(31, "Estado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "tbody");
    \u0275\u0275repeaterCreate(33, ComitesComponent_Conditional_11_Conditional_1_For_34_Template, 26, 21, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.search);
    \u0275\u0275advance(23);
    \u0275\u0275repeater(ctx_r2.filteredBeneficiaries);
  }
}
function ComitesComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ComitesComponent_Conditional_11_Conditional_0_Template, 4, 0, "div", 6)(1, ComitesComponent_Conditional_11_Conditional_1_Template, 35, 1, "div", 24);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.loadingBeneficiaries ? 0 : 1);
  }
}
var ComitesComponent = class _ComitesComponent {
  constructor(proyectosService, beneficiariosService) {
    this.proyectosService = proyectosService;
    this.beneficiariosService = beneficiariosService;
    this.projects = [];
    this.beneficiaries = [];
    this.search = "";
    this.activeTab = "projects";
    this.loadingProjects = true;
    this.loadingBeneficiaries = false;
  }
  ngOnInit() {
    this.proyectosService.getAll().subscribe({
      next: (list) => {
        this.projects = list;
        this.loadingProjects = false;
      },
      error: () => {
        this.loadingProjects = false;
      }
    });
    this.loadBeneficiaries();
  }
  loadBeneficiaries() {
    this.loadingBeneficiaries = true;
    this.beneficiariosService.getAll().subscribe({
      next: (list) => {
        this.beneficiaries = list;
        this.loadingBeneficiaries = false;
      },
      error: () => {
        this.loadingBeneficiaries = false;
      }
    });
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
      return new (__ngFactoryType__ || _ComitesComponent)(\u0275\u0275directiveInject(ProyectosService), \u0275\u0275directiveInject(BeneficiariosService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ComitesComponent, selectors: [["app-comites"]], decls: 12, vars: 6, consts: [[1, "d-flex", "flex-column", "gap-4"], [1, "nav", "nav-tabs"], [1, "nav-item"], ["href", "javascript:void(0)", 1, "nav-link", 3, "click"], [1, "bi", "bi-geo-alt", "me-1"], [1, "bi", "bi-people", "me-1"], [1, "text-center", "py-5"], [1, "row", "g-4"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "small", "text-body-secondary", "mt-2", "mb-0"], [1, "col-12", "col-lg-6"], [1, "card", "h-100"], [1, "card-header"], [1, "mb-0"], [1, "text-body-secondary"], [1, "card-body"], [1, "border", "border-2", "border-dashed", "rounded", "d-flex", "flex-column", "align-items-center", "justify-content-center", "bg-light", 2, "min-height", "280px"], [1, "bi", "bi-geo-alt", "fs-1", "text-body-secondary"], [1, "fw-medium", "text-body-secondary"], [1, "small", "text-body-secondary"], [1, "d-flex", "flex-wrap", "gap-2", "mt-2"], [1, "badge", "bg-light", "text-dark", "border"], [1, "row", "g-3"], [1, "col-12"], [1, "card"], [1, "d-flex", "justify-content-between", "align-items-start", "mb-2"], [1, "badge"], [1, "bi", "bi-stars", "me-1"], [1, "d-flex", "justify-content-between", "small", "mb-1"], [1, "badge", "bg-secondary"], [1, "fw-medium"], [1, "progress", 2, "height", "6px", "border-radius", "1000px", "background-color", "#E9EBEE"], [1, "progress-bar", "progress-bar-gradient"], [1, "card-header", "d-flex", "flex-column", "flex-sm-row", "justify-content-between", "align-items-start", "gap-3"], [1, "input-group", 2, "max-width", "280px"], [1, "input-group-text"], [1, "bi", "bi-search"], ["type", "text", "placeholder", "Buscar por nombre, RUT o comit\xE9...", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel"], [1, "card-body", "p-0", "overflow-auto"], [1, "custom-grid-container"], [1, "table", "custom-grid", "align-middle", "mb-0"], [1, "text-center"], [1, "small", "font-monospace"], [1, "d-flex", "align-items-center", "justify-content-center", "gap-2"], [1, "progress", "flex-grow-1", 2, "width", "60px", "height", "8px", "border-radius", "1000px", "background-color", "#E9EBEE"], [1, "small", "fw-medium"], [1, "badge", "bg-secondary", "font-monospace"]], template: function ComitesComponent_Template(rf, ctx) {
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
        \u0275\u0275conditionalCreate(10, ComitesComponent_Conditional_10_Template, 2, 1);
        \u0275\u0275conditionalCreate(11, ComitesComponent_Conditional_11_Template, 2, 1);
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
    @if (loadingProjects) {\r
      <div class="text-center py-5">\r
        <div class="spinner-border text-primary" role="status"></div>\r
        <p class="small text-body-secondary mt-2 mb-0">Cargando proyectos...</p>\r
      </div>\r
    } @else {\r
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
                  <div class="progress" style="height: 6px; border-radius: 1000px; background-color: #E9EBEE;">\r
                    <div class="progress-bar progress-bar-gradient" [style.width.%]="project.progress"></div>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
    }\r
  }\r
\r
  @if (activeTab === 'beneficiaries') {\r
    @if (loadingBeneficiaries) {\r
      <div class="text-center py-5">\r
        <div class="spinner-border text-primary" role="status"></div>\r
        <p class="small text-body-secondary mt-2 mb-0">Cargando beneficiarios...</p>\r
      </div>\r
    } @else {\r
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
        <div class="custom-grid-container">\r
          <table class="table custom-grid align-middle mb-0">\r
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
                    <div class="progress flex-grow-1" style="width: 60px; height: 8px; border-radius: 1000px; background-color: #E9EBEE;">\r
                      <div class="progress-bar progress-bar-gradient" [style.width.%]="b.matchScore"></div>\r
                    </div>\r
                    <span class="small fw-medium">{{ b.matchScore }}%</span>\r
                  </div>\r
                </td>\r
                <td><span class="badge bg-secondary font-monospace">{{ b.suggestedSubsidy }}</span></td>\r
                <td>\r
                  <span class="badge" [class.badge-enviada]="b.status === 'approved'" [class.badge-cerrada]="b.status === 'alert'" [class.badge-borrador]="b.status === 'pending'">\r
                    {{ b.status === 'approved' ? 'Aprobado' : b.status === 'alert' ? 'Alerta' : 'Pendiente' }}\r
                  </span>\r
                </td>\r
              </tr>\r
            }\r
          </tbody>\r
        </table>\r
        </div>\r
      </div>\r
    </div>\r
    }\r
  }\r
</div>\r
` }]
  }], () => [{ type: ProyectosService }, { type: BeneficiariosService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ComitesComponent, { className: "ComitesComponent", filePath: "src/app/features/comites/comites.component.ts", lineNumber: 13 });
})();
export {
  ComitesComponent
};
//# sourceMappingURL=chunk-OYTDESXO.js.map
