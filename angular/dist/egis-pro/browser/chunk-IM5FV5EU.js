import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-O4IN2EJS.js";
import {
  DocumentosService
} from "./chunk-OKFAIESM.js";
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OHDET2P6.js";

// src/app/features/visado/visado.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.id ?? $item.name;
function VisadoComponent_Conditional_38_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("bg-danger", f_r1.status === "rejected")("bg-opacity-10", f_r1.status === "rejected")("text-danger", f_r1.status === "rejected")("bg-warning", f_r1.status === "alert")("bg-opacity-10", f_r1.status === "alert")("text-warning", f_r1.status === "alert");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", f_r1.note, " ");
  }
}
function VisadoComponent_Conditional_38_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "div")(3, "span", 14);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 34);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, VisadoComponent_Conditional_38_For_2_Conditional_9_Template, 2, 13, "div", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(f_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r1.value);
    \u0275\u0275advance();
    \u0275\u0275classProp("badge-enviada", f_r1.status === "approved")("badge-cerrada", f_r1.status === "rejected")("badge-borrador", f_r1.status === "alert");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabel(f_r1.status));
    \u0275\u0275advance();
    \u0275\u0275conditional(f_r1.note ? 9 : -1);
  }
}
function VisadoComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275repeaterCreate(1, VisadoComponent_Conditional_38_For_2_Template, 10, 10, "div", 31, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.extractionResults);
  }
}
function VisadoComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "div", 37);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Analizando documento con IA...");
    \u0275\u0275elementEnd()();
  }
}
function VisadoComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 4)(2, "h6", 5);
    \u0275\u0275text(3, "Resumen de Validaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 7)(5, "div", 38)(6, "div", 39)(7, "div", 40);
    \u0275\u0275element(8, "i", 41);
    \u0275\u0275elementStart(9, "div", 42);
    \u0275\u0275text(10, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "small", 6);
    \u0275\u0275text(12, "Aprobados");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 39)(14, "div", 43);
    \u0275\u0275element(15, "i", 44);
    \u0275\u0275elementStart(16, "div", 45);
    \u0275\u0275text(17, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "small", 6);
    \u0275\u0275text(19, "Rechazados");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 39)(21, "div", 46);
    \u0275\u0275element(22, "i", 47);
    \u0275\u0275elementStart(23, "div", 48);
    \u0275\u0275text(24, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "small", 6);
    \u0275\u0275text(26, "Alertas");
    \u0275\u0275elementEnd()()()()()();
  }
}
function VisadoComponent_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275element(1, "div", 37);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando cola...");
    \u0275\u0275elementEnd()();
  }
}
function VisadoComponent_Conditional_61_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50);
    \u0275\u0275element(2, "i", 51);
    \u0275\u0275elementStart(3, "div")(4, "div", 52);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "span", 34);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const doc_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(doc_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(doc_r3.type);
    \u0275\u0275advance();
    \u0275\u0275classProp("badge-enviada", doc_r3.status === "approved")("badge-cerrada", doc_r3.status === "rejected")("badge-borrador", doc_r3.status === "alert");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabel(doc_r3.status));
  }
}
function VisadoComponent_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275repeaterCreate(1, VisadoComponent_Conditional_61_For_2_Template, 10, 9, "div", 49, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredQueue);
  }
}
var VisadoComponent = class _VisadoComponent {
  constructor(documentosService) {
    this.documentosService = documentosService;
    this.extractionResults = [];
    this.documentQueue = [];
    this.vigenciaFilter = "todos";
    this.isScanning = false;
    this.showResults = false;
    this.loadingQueue = true;
  }
  ngOnInit() {
    this.loadQueue();
  }
  loadQueue() {
    const vigencia = this.vigenciaFilter === "todos" ? void 0 : this.vigenciaFilter;
    this.loadingQueue = true;
    this.documentosService.getCola(vigencia).subscribe({
      next: (list) => {
        this.documentQueue = list;
        this.loadingQueue = false;
      },
      error: () => {
        this.loadingQueue = false;
      }
    });
  }
  onFilterChange() {
    this.loadQueue();
  }
  get filteredQueue() {
    return this.documentQueue;
  }
  scan() {
    this.isScanning = true;
    this.showResults = false;
    this.documentosService.visar().subscribe({
      next: (res) => {
        this.extractionResults = res.resultados;
        this.isScanning = false;
        this.showResults = true;
        this.loadQueue();
      },
      error: () => {
        this.isScanning = false;
        this.showResults = true;
      }
    });
  }
  statusClass(s) {
    if (s === "approved")
      return "bg-success";
    if (s === "rejected")
      return "bg-danger";
    return "bg-warning";
  }
  statusLabel(s) {
    if (s === "approved")
      return "Aprobado";
    if (s === "rejected")
      return "Rechazado";
    return "Alerta";
  }
  static {
    this.\u0275fac = function VisadoComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VisadoComponent)(\u0275\u0275directiveInject(DocumentosService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VisadoComponent, selectors: [["app-visado"]], decls: 62, vars: 7, consts: [[1, "d-flex", "flex-column", "gap-4"], [1, "row", "g-4"], [1, "col-12", "col-lg-6"], [1, "card", "mb-3"], [1, "card-header"], [1, "mb-0"], [1, "text-body-secondary"], [1, "card-body"], ["tabindex", "0", "role", "button", 1, "border", "border-2", "border-primary", "border-opacity-25", "rounded", "bg-primary", "bg-opacity-10", "d-flex", "flex-column", "align-items-center", "justify-content-center", "gap-3", "p-4", "cursor-pointer", 2, "min-height", "200px", 3, "click", "keydown.enter"], [1, "bi", "bi-upload", "display-6", "text-primary"], [1, "mb-0", "fw-medium"], [1, "card"], [1, "bg-light", "rounded", "d-flex", "flex-column", "align-items-center", "justify-content-center", "gap-2", 2, "min-height", "200px"], [1, "bi", "bi-eye", "text-body-secondary"], [1, "small", "text-body-secondary"], [1, "small", "font-monospace"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "d-flex", "align-items-center", "gap-2"], [1, "bi", "bi-robot", "text-primary"], ["type", "button", 1, "btn", "btn-outline-otic", "btn-auto-width", 3, "click", "disabled"], [1, "bi", "bi-upc-scan", "me-1"], [1, "d-flex", "flex-column", "gap-2"], [1, "d-flex", "flex-column", "align-items-center", "justify-content-center", "gap-3", "text-body-secondary", 2, "min-height", "200px"], [1, "card-header", "d-flex", "flex-column", "flex-sm-row", "justify-content-between", "align-items-start", "gap-2"], [1, "bi", "bi-calendar-check", "text-body-secondary"], [1, "form-select", "form-select-sm", 2, "width", "180px", 3, "ngModelChange", "ngModel"], ["value", "todos"], ["value", "vigente"], ["value", "por_vencer"], ["value", "vencido"], [1, "d-flex", "flex-column", "align-items-center", "justify-content-center", "gap-3", "text-body-secondary", "py-4"], [1, "border", "rounded", "p-3"], [1, "d-flex", "justify-content-between", "align-items-start"], [1, "fw-medium"], [1, "badge"], [1, "mt-2", "small", "rounded", "p-2", 3, "bg-danger", "bg-opacity-10", "text-danger", "bg-warning", "text-warning"], [1, "mt-2", "small", "rounded", "p-2"], [1, "spinner-border", "text-primary"], [1, "row", "g-2", "text-center"], [1, "col-4"], [1, "rounded", "p-3", "bg-success", "bg-opacity-10"], [1, "bi", "bi-check-circle", "text-success"], [1, "fw-bold", "text-success"], [1, "rounded", "p-3", "bg-danger", "bg-opacity-10"], [1, "bi", "bi-x-circle", "text-danger"], [1, "fw-bold", "text-danger"], [1, "rounded", "p-3", "bg-warning", "bg-opacity-10"], [1, "bi", "bi-exclamation-circle", "text-warning"], [1, "fw-bold", "text-warning"], [1, "d-flex", "align-items-center", "justify-content-between", "border", "rounded", "p-3"], [1, "d-flex", "align-items-center", "gap-3"], [1, "bi", "bi-file-pdf", "text-body-secondary"], [1, "fw-medium", "font-monospace", "small"]], template: function VisadoComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h6", 5);
        \u0275\u0275text(6, "Carga de Documentos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "small", 6);
        \u0275\u0275text(8, "Arrastra PDFs o im\xE1genes para escanear con OCR");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 7)(10, "div", 8);
        \u0275\u0275listener("click", function VisadoComponent_Template_div_click_10_listener() {
          return ctx.scan();
        })("keydown.enter", function VisadoComponent_Template_div_keydown_enter_10_listener() {
          return ctx.scan();
        });
        \u0275\u0275element(11, "i", 9);
        \u0275\u0275elementStart(12, "p", 10);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "small", 6);
        \u0275\u0275text(15, "PDF, JPG, PNG - Max 10MB");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(16, "div", 11)(17, "div", 4)(18, "h6", 5);
        \u0275\u0275text(19, "Previsualizaci\xF3n");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 7)(21, "div", 12);
        \u0275\u0275element(22, "i", 13);
        \u0275\u0275elementStart(23, "span", 14);
        \u0275\u0275text(24, "Vista previa del documento");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "span", 15);
        \u0275\u0275text(26, "12345678-9_DOMINIO_2026.pdf");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(27, "div", 2)(28, "div", 3)(29, "div", 16)(30, "div", 17);
        \u0275\u0275element(31, "i", 18);
        \u0275\u0275elementStart(32, "h6", 5);
        \u0275\u0275text(33, "Resultados de Extracci\xF3n IA");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "button", 19);
        \u0275\u0275listener("click", function VisadoComponent_Template_button_click_34_listener() {
          return ctx.scan();
        });
        \u0275\u0275element(35, "i", 20);
        \u0275\u0275text(36);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 7);
        \u0275\u0275conditionalCreate(38, VisadoComponent_Conditional_38_Template, 3, 0, "div", 21)(39, VisadoComponent_Conditional_39_Template, 4, 0, "div", 22);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(40, VisadoComponent_Conditional_40_Template, 27, 0, "div", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "div", 11)(42, "div", 23)(43, "div")(44, "h6", 5);
        \u0275\u0275text(45, "Cola de Documentos Visados");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "small", 6);
        \u0275\u0275text(47, "Historial de documentos procesados por la IA");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "div", 17);
        \u0275\u0275element(49, "i", 24);
        \u0275\u0275elementStart(50, "select", 25);
        \u0275\u0275twoWayListener("ngModelChange", function VisadoComponent_Template_select_ngModelChange_50_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.vigenciaFilter, $event) || (ctx.vigenciaFilter = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function VisadoComponent_Template_select_ngModelChange_50_listener() {
          return ctx.onFilterChange();
        });
        \u0275\u0275elementStart(51, "option", 26);
        \u0275\u0275text(52, "Todos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "option", 27);
        \u0275\u0275text(54, "Vigentes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "option", 28);
        \u0275\u0275text(56, "Por vencer");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "option", 29);
        \u0275\u0275text(58, "Vencidos");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(59, "div", 7);
        \u0275\u0275conditionalCreate(60, VisadoComponent_Conditional_60_Template, 4, 0, "div", 30)(61, VisadoComponent_Conditional_61_Template, 3, 0, "div", 21);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275textInterpolate(ctx.isScanning ? "Escaneando documento..." : "Drag & Drop o haz clic para subir");
        \u0275\u0275advance(21);
        \u0275\u0275property("disabled", ctx.isScanning);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("", ctx.isScanning ? "Procesando..." : "Visar con IA", " ");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.showResults ? 38 : 39);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.showResults ? 40 : -1);
        \u0275\u0275advance(10);
        \u0275\u0275twoWayProperty("ngModel", ctx.vigenciaFilter);
        \u0275\u0275advance(10);
        \u0275\u0275conditional(ctx.loadingQueue ? 60 : 61);
      }
    }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VisadoComponent, [{
    type: Component,
    args: [{ selector: "app-visado", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="d-flex flex-column gap-4">\r
  <div class="row g-4">\r
    <div class="col-12 col-lg-6">\r
      <div class="card mb-3">\r
        <div class="card-header">\r
          <h6 class="mb-0">Carga de Documentos</h6>\r
          <small class="text-body-secondary">Arrastra PDFs o im\xE1genes para escanear con OCR</small>\r
        </div>\r
        <div class="card-body">\r
          <div class="border border-2 border-primary border-opacity-25 rounded bg-primary bg-opacity-10 d-flex flex-column align-items-center justify-content-center gap-3 p-4 cursor-pointer" style="min-height: 200px;" (click)="scan()" (keydown.enter)="scan()" tabindex="0" role="button">\r
            <i class="bi bi-upload display-6 text-primary"></i>\r
            <p class="mb-0 fw-medium">{{ isScanning ? 'Escaneando documento...' : 'Drag & Drop o haz clic para subir' }}</p>\r
            <small class="text-body-secondary">PDF, JPG, PNG - Max 10MB</small>\r
          </div>\r
        </div>\r
      </div>\r
      <div class="card">\r
        <div class="card-header"><h6 class="mb-0">Previsualizaci\xF3n</h6></div>\r
        <div class="card-body">\r
          <div class="bg-light rounded d-flex flex-column align-items-center justify-content-center gap-2" style="min-height: 200px;">\r
            <i class="bi bi-eye text-body-secondary"></i>\r
            <span class="small text-body-secondary">Vista previa del documento</span>\r
            <span class="small font-monospace">12345678-9_DOMINIO_2026.pdf</span>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="col-12 col-lg-6">\r
      <div class="card mb-3">\r
        <div class="card-header d-flex justify-content-between align-items-center">\r
          <div class="d-flex align-items-center gap-2">\r
            <i class="bi bi-robot text-primary"></i>\r
            <h6 class="mb-0">Resultados de Extracci\xF3n IA</h6>\r
          </div>\r
          <button type="button" class="btn btn-outline-otic btn-auto-width" (click)="scan()" [disabled]="isScanning">\r
            <i class="bi bi-upc-scan me-1"></i>{{ isScanning ? 'Procesando...' : 'Visar con IA' }}\r
          </button>\r
        </div>\r
        <div class="card-body">\r
          @if (showResults) {\r
            <div class="d-flex flex-column gap-2">\r
              @for (f of extractionResults; track f.label) {\r
                <div class="border rounded p-3">\r
                  <div class="d-flex justify-content-between align-items-start">\r
                    <div>\r
                      <span class="small text-body-secondary">{{ f.label }}</span>\r
                      <div class="fw-medium">{{ f.value }}</div>\r
                    </div>\r
                    <span class="badge" [class.badge-enviada]="f.status === 'approved'" [class.badge-cerrada]="f.status === 'rejected'" [class.badge-borrador]="f.status === 'alert'">{{ statusLabel(f.status) }}</span>\r
                  </div>\r
                  @if (f.note) {\r
                    <div class="mt-2 small rounded p-2" [class.bg-danger]="f.status === 'rejected'" [class.bg-opacity-10]="f.status === 'rejected'" [class.text-danger]="f.status === 'rejected'" [class.bg-warning]="f.status === 'alert'" [class.bg-opacity-10]="f.status === 'alert'" [class.text-warning]="f.status === 'alert'">\r
                      {{ f.note }}\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          } @else {\r
            <div class="d-flex flex-column align-items-center justify-content-center gap-3 text-body-secondary" style="min-height: 200px;">\r
              <div class="spinner-border text-primary"></div>\r
              <span>Analizando documento con IA...</span>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
      @if (showResults) {\r
        <div class="card">\r
          <div class="card-header"><h6 class="mb-0">Resumen de Validaci\xF3n</h6></div>\r
          <div class="card-body">\r
            <div class="row g-2 text-center">\r
              <div class="col-4">\r
                <div class="rounded p-3 bg-success bg-opacity-10">\r
                  <i class="bi bi-check-circle text-success"></i>\r
                  <div class="fw-bold text-success">3</div>\r
                  <small class="text-body-secondary">Aprobados</small>\r
                </div>\r
              </div>\r
              <div class="col-4">\r
                <div class="rounded p-3 bg-danger bg-opacity-10">\r
                  <i class="bi bi-x-circle text-danger"></i>\r
                  <div class="fw-bold text-danger">1</div>\r
                  <small class="text-body-secondary">Rechazados</small>\r
                </div>\r
              </div>\r
              <div class="col-4">\r
                <div class="rounded p-3 bg-warning bg-opacity-10">\r
                  <i class="bi bi-exclamation-circle text-warning"></i>\r
                  <div class="fw-bold text-warning">1</div>\r
                  <small class="text-body-secondary">Alertas</small>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
\r
  <div class="card">\r
    <div class="card-header d-flex flex-column flex-sm-row justify-content-between align-items-start gap-2">\r
      <div>\r
        <h6 class="mb-0">Cola de Documentos Visados</h6>\r
        <small class="text-body-secondary">Historial de documentos procesados por la IA</small>\r
      </div>\r
      <div class="d-flex align-items-center gap-2">\r
        <i class="bi bi-calendar-check text-body-secondary"></i>\r
        <select class="form-select form-select-sm" style="width: 180px;" [(ngModel)]="vigenciaFilter" (ngModelChange)="onFilterChange()">\r
          <option value="todos">Todos</option>\r
          <option value="vigente">Vigentes</option>\r
          <option value="por_vencer">Por vencer</option>\r
          <option value="vencido">Vencidos</option>\r
        </select>\r
      </div>\r
    </div>\r
    <div class="card-body">\r
      @if (loadingQueue) {\r
        <div class="d-flex flex-column align-items-center justify-content-center gap-3 text-body-secondary py-4">\r
          <div class="spinner-border text-primary"></div>\r
          <span>Cargando cola...</span>\r
        </div>\r
      } @else {\r
      <div class="d-flex flex-column gap-2">\r
        @for (doc of filteredQueue; track doc.id ?? doc.name) {\r
          <div class="d-flex align-items-center justify-content-between border rounded p-3">\r
            <div class="d-flex align-items-center gap-3">\r
              <i class="bi bi-file-pdf text-body-secondary"></i>\r
              <div>\r
                <div class="fw-medium font-monospace small">{{ doc.name }}</div>\r
                <div class="small text-body-secondary">{{ doc.type }}</div>\r
              </div>\r
            </div>\r
            <span class="badge" [class.badge-enviada]="doc.status === 'approved'" [class.badge-cerrada]="doc.status === 'rejected'" [class.badge-borrador]="doc.status === 'alert'">{{ statusLabel(doc.status) }}</span>\r
          </div>\r
        }\r
      </div>\r
      }\r
    </div>\r
  </div>\r
</div>\r
` }]
  }], () => [{ type: DocumentosService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VisadoComponent, { className: "VisadoComponent", filePath: "src/app/features/visado/visado.component.ts", lineNumber: 16 });
})();
export {
  VisadoComponent
};
//# sourceMappingURL=chunk-IM5FV5EU.js.map
