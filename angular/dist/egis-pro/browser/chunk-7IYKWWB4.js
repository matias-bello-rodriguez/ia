import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-BNGTIDGH.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
  __spreadValues,
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7OUYEERV.js";

// src/app/features/configuracion/configuracion.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.name;
var _forTrack2 = ($index, $item) => $item.module;
function ConfiguracionComponent_For_39_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_For_39_Conditional_7_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const r_r2 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(r_r2.minSavings, $event) || (r_r2.minSavings = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275twoWayProperty("ngModel", r_r2.minSavings);
  }
}
function ConfiguracionComponent_For_39_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r2.minSavings);
  }
}
function ConfiguracionComponent_For_39_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_For_39_Conditional_10_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const r_r2 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(r_r2.maxRSH, $event) || (r_r2.maxRSH = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275twoWayProperty("ngModel", r_r2.maxRSH);
  }
}
function ConfiguracionComponent_For_39_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", r_r2.maxRSH, " ");
  }
}
function ConfiguracionComponent_For_39_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_For_39_Conditional_13_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const r_r2 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(r_r2.cutoffScore, $event) || (r_r2.cutoffScore = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275twoWayProperty("ngModel", r_r2.cutoffScore);
  }
}
function ConfiguracionComponent_For_39_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, r_r2.cutoffScore));
  }
}
function ConfiguracionComponent_For_39_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function ConfiguracionComponent_For_39_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.saveEdit());
    });
    \u0275\u0275element(1, "i", 36);
    \u0275\u0275text(2, " Guardar ");
    \u0275\u0275elementEnd();
  }
}
function ConfiguracionComponent_For_39_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function ConfiguracionComponent_For_39_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const r_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.startEdit(r_r2.id));
    });
    \u0275\u0275element(1, "i", 38);
    \u0275\u0275elementEnd();
  }
}
function ConfiguracionComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 21);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275conditionalCreate(7, ConfiguracionComponent_For_39_Conditional_7_Template, 1, 1, "input", 23)(8, ConfiguracionComponent_For_39_Conditional_8_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275conditionalCreate(10, ConfiguracionComponent_For_39_Conditional_10_Template, 1, 1, "input", 25)(11, ConfiguracionComponent_For_39_Conditional_11_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275conditionalCreate(13, ConfiguracionComponent_For_39_Conditional_13_Template, 1, 1, "input", 26)(14, ConfiguracionComponent_For_39_Conditional_14_Template, 3, 3, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td")(18, "div", 28);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 29);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "td", 14);
    \u0275\u0275conditionalCreate(23, ConfiguracionComponent_For_39_Conditional_23_Template, 3, 0, "button", 30)(24, ConfiguracionComponent_For_39_Conditional_24_Template, 2, 0, "button", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r5.editingRow === r_r2.id ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r5.editingRow === r_r2.id ? 10 : 11);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r5.editingRow === r_r2.id ? 13 : 14);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.maxUF);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.lastUpdate);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.source);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r5.editingRow === r_r2.id ? 23 : 24);
  }
}
function ConfiguracionComponent_For_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 39);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "span", 40);
    \u0275\u0275element(10, "i", 41);
    \u0275\u0275text(11, " IA Configurada");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const rule_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rule_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rule_r8.maxAge === 0 ? "Debe estar vigente" : rule_r8.maxAge + " " + rule_r8.unit);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-primary", rule_r8.required)("bg-secondary", !rule_r8.required);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(rule_r8.required ? "Obligatorio" : "Opcional");
  }
}
function ConfiguracionComponent_For_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 42)(2, "div")(3, "div", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 22);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 3);
    \u0275\u0275element(8, "span", 43);
    \u0275\u0275elementStart(9, "span", 40);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ai_r9 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ai_r9.module);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ai_r9.version);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ai_r9.status);
  }
}
var SUBSIDY_RULES = [
  { id: 1, name: "DS49", description: "Fondo Solidario de Elecci\xF3n de Vivienda", minSavings: "15 UF", maxRSH: "40%", cutoffScore: 13484, maxUF: "800 UF", lastUpdate: "15/01/2026", source: "Resoluci\xF3n Exenta 123/2026" },
  { id: 2, name: "DS1", description: "Sistema Integrado de Subsidio Habitacional", minSavings: "20 UF", maxRSH: "70%", cutoffScore: 13484, maxUF: "1.100 UF", lastUpdate: "20/01/2026", source: "Resoluci\xF3n Exenta 456/2026" },
  { id: 3, name: "DS27", description: "Programa de Protecci\xF3n del Patrimonio Familiar", minSavings: "5 UF", maxRSH: "60%", cutoffScore: 11734, maxUF: "120 UF", lastUpdate: "10/02/2026", source: "Resoluci\xF3n Exenta 789/2026" },
  { id: 4, name: "DS19", description: "Programa de Integraci\xF3n Social y Territorial", minSavings: "50 UF", maxRSH: "90%", cutoffScore: 14557, maxUF: "1.400 UF", lastUpdate: "05/02/2026", source: "Resoluci\xF3n Exenta 101/2026" }
];
var DOCUMENT_RULES = [
  { name: "Dominio Vigente", maxAge: 90, unit: "d\xEDas", required: true },
  { name: "Certificado RSH", maxAge: 6, unit: "meses", required: true },
  { name: "Carnet de Identidad", maxAge: 0, unit: "vigente", required: true },
  { name: "Cartola de Ahorro", maxAge: 30, unit: "d\xEDas", required: true },
  { name: "Factibilidad T\xE9cnica", maxAge: 12, unit: "meses", required: true },
  { name: "Informe Social", maxAge: 6, unit: "meses", required: false }
];
var AI_MODULES = [
  { module: "OCR / Extracci\xF3n", status: "Activo", version: "v2.3" },
  { module: "Validaci\xF3n Legal", status: "Activo", version: "v1.8" },
  { module: "Match de Subsidios", status: "Activo", version: "v1.5" },
  { module: "Redacci\xF3n Ejecutiva", status: "Activo", version: "v2.0" },
  { module: "Clasificaci\xF3n Territorial", status: "Activo", version: "v1.2" },
  { module: "WhatsApp Cobranza", status: "Activo", version: "v1.1" }
];
var ConfiguracionComponent = class _ConfiguracionComponent {
  constructor() {
    this.subsidyRules = SUBSIDY_RULES.map((r) => __spreadValues({}, r));
    this.documentRules = DOCUMENT_RULES;
    this.aiModules = AI_MODULES;
    this.editingRow = null;
  }
  startEdit(id) {
    this.editingRow = id;
  }
  saveEdit() {
    this.editingRow = null;
  }
  static {
    this.\u0275fac = function ConfiguracionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ConfiguracionComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfiguracionComponent, selectors: [["app-configuracion"]], decls: 75, vars: 0, consts: [[1, "d-flex", "flex-column", "gap-4"], [1, "card"], [1, "card-header", "d-flex", "flex-column", "flex-sm-row", "justify-content-between", "align-items-start", "gap-3"], [1, "d-flex", "align-items-center", "gap-2"], [1, "bi", "bi-book", "text-primary"], [1, "mb-0"], [1, "text-body-secondary"], [1, "d-flex", "gap-2"], [1, "btn", "btn-sm", "btn-outline-secondary"], [1, "bi", "bi-arrow-clockwise", "me-1"], [1, "btn", "btn-sm", "btn-primary"], [1, "bi", "bi-plus", "me-1"], [1, "card-body", "p-0", "overflow-auto"], [1, "table", "table-hover", "mb-0"], [1, "text-end"], [1, "card-header", "d-flex", "align-items-center", "gap-2"], [1, "bi", "bi-gear", "text-primary"], [1, "bi", "bi-robot", "text-primary"], [1, "card-body"], [1, "row", "g-3"], [1, "col-12", "col-sm-6", "col-lg-4"], [1, "badge", "bg-secondary", "fw-bold", "font-monospace"], [1, "small", "text-body-secondary"], ["type", "text", 1, "form-control", "form-control-sm", 2, "width", "5rem", 3, "ngModel"], [1, "fw-medium"], ["type", "text", 1, "form-control", "form-control-sm", 2, "width", "4rem", 3, "ngModel"], ["type", "number", 1, "form-control", "form-control-sm", 2, "width", "6rem", 3, "ngModel"], [1, "font-monospace"], [1, "small"], [1, "small", "text-body-secondary", 2, "font-size", "10px"], ["type", "button", 1, "btn", "btn-sm", "btn-primary"], ["type", "button", 1, "btn", "btn-sm", "btn-link", "p-0"], ["type", "text", 1, "form-control", "form-control-sm", 2, "width", "5rem", 3, "ngModelChange", "ngModel"], ["type", "text", 1, "form-control", "form-control-sm", 2, "width", "4rem", 3, "ngModelChange", "ngModel"], ["type", "number", 1, "form-control", "form-control-sm", 2, "width", "6rem", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn-sm", "btn-primary", 3, "click"], [1, "bi", "bi-check2", "me-1"], ["type", "button", 1, "btn", "btn-sm", "btn-link", "p-0", 3, "click"], [1, "bi", "bi-pencil"], [1, "badge"], [1, "small", "text-success"], [1, "bi", "bi-robot", "me-1"], [1, "border", "rounded", "p-3", "d-flex", "justify-content-between", "align-items-center"], [1, "rounded-circle", "bg-success", 2, "width", "8px", "height", "8px"]], template: function ConfiguracionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "i", 4);
        \u0275\u0275elementStart(5, "div")(6, "h6", 5);
        \u0275\u0275text(7, "Biblioteca de Subsidios");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "small", 6);
        \u0275\u0275text(9, "Par\xE1metros de referencia que utiliza la IA para validar");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 7)(11, "button", 8);
        \u0275\u0275element(12, "i", 9);
        \u0275\u0275text(13, " Sincronizar MINVU");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "button", 10);
        \u0275\u0275element(15, "i", 11);
        \u0275\u0275text(16, " Agregar Subsidio");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "div", 12)(18, "table", 13)(19, "thead")(20, "tr")(21, "th");
        \u0275\u0275text(22, "Programa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "th");
        \u0275\u0275text(24, "Descripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "th");
        \u0275\u0275text(26, "Ahorro Min.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "th");
        \u0275\u0275text(28, "RSH Max.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "th");
        \u0275\u0275text(30, "Puntaje Corte");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "th");
        \u0275\u0275text(32, "Tope UF");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "th");
        \u0275\u0275text(34, "\xDAlt. Actualizaci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "th", 14);
        \u0275\u0275text(36, "Acciones");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(37, "tbody");
        \u0275\u0275repeaterCreate(38, ConfiguracionComponent_For_39_Template, 25, 9, "tr", null, _forTrack0);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(40, "div", 1)(41, "div", 15);
        \u0275\u0275element(42, "i", 16);
        \u0275\u0275elementStart(43, "div")(44, "h6", 5);
        \u0275\u0275text(45, "Reglas de Validaci\xF3n de Documentos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "small", 6);
        \u0275\u0275text(47, "Par\xE1metros que la IA utiliza para aprobar o rechazar documentos");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(48, "div", 12)(49, "table", 13)(50, "thead")(51, "tr")(52, "th");
        \u0275\u0275text(53, "Documento");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "th");
        \u0275\u0275text(55, "Vigencia M\xE1xima");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "th");
        \u0275\u0275text(57, "Obligatorio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "th");
        \u0275\u0275text(59, "Estado");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(60, "tbody");
        \u0275\u0275repeaterCreate(61, ConfiguracionComponent_For_62_Template, 12, 7, "tr", null, _forTrack1);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(63, "div", 1)(64, "div", 15);
        \u0275\u0275element(65, "i", 17);
        \u0275\u0275elementStart(66, "div")(67, "h6", 5);
        \u0275\u0275text(68, "Estado del Asistente IA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "small", 6);
        \u0275\u0275text(70, "Configuraci\xF3n y estado de los m\xF3dulos de inteligencia artificial");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(71, "div", 18)(72, "div", 19);
        \u0275\u0275repeaterCreate(73, ConfiguracionComponent_For_74_Template, 11, 3, "div", 20, _forTrack2);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(38);
        \u0275\u0275repeater(ctx.subsidyRules);
        \u0275\u0275advance(23);
        \u0275\u0275repeater(ctx.documentRules);
        \u0275\u0275advance(12);
        \u0275\u0275repeater(ctx.aiModules);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel, DecimalPipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfiguracionComponent, [{
    type: Component,
    args: [{ selector: "app-configuracion", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="d-flex flex-column gap-4">
  <div class="card">
    <div class="card-header d-flex flex-column flex-sm-row justify-content-between align-items-start gap-3">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-book text-primary"></i>
        <div>
          <h6 class="mb-0">Biblioteca de Subsidios</h6>
          <small class="text-body-secondary">Par\xE1metros de referencia que utiliza la IA para validar</small>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-clockwise me-1"></i> Sincronizar MINVU</button>
        <button class="btn btn-sm btn-primary"><i class="bi bi-plus me-1"></i> Agregar Subsidio</button>
      </div>
    </div>
    <div class="card-body p-0 overflow-auto">
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th>Programa</th>
            <th>Descripci\xF3n</th>
            <th>Ahorro Min.</th>
            <th>RSH Max.</th>
            <th>Puntaje Corte</th>
            <th>Tope UF</th>
            <th>\xDAlt. Actualizaci\xF3n</th>
            <th class="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (r of subsidyRules; track r.id) {
            <tr>
              <td><span class="badge bg-secondary fw-bold font-monospace">{{ r.name }}</span></td>
              <td class="small text-body-secondary">{{ r.description }}</td>
              <td>
                @if (editingRow === r.id) {
                  <input type="text" class="form-control form-control-sm" style="width: 5rem;" [(ngModel)]="r.minSavings">
                } @else {
                  <span class="fw-medium">{{ r.minSavings }}</span>
                }
              </td>
              <td>
                @if (editingRow === r.id) {
                  <input type="text" class="form-control form-control-sm" style="width: 4rem;" [(ngModel)]="r.maxRSH">
                } @else {
                  {{ r.maxRSH }}
                }
              </td>
              <td>
                @if (editingRow === r.id) {
                  <input type="number" class="form-control form-control-sm" style="width: 6rem;" [(ngModel)]="r.cutoffScore">
                } @else {
                  <span class="font-monospace">{{ r.cutoffScore | number }}</span>
                }
              </td>
              <td>{{ r.maxUF }}</td>
              <td>
                <div class="small">{{ r.lastUpdate }}</div>
                <div class="small text-body-secondary" style="font-size: 10px;">{{ r.source }}</div>
              </td>
              <td class="text-end">
                @if (editingRow === r.id) {
                  <button type="button" class="btn btn-sm btn-primary" (click)="saveEdit()">
                    <i class="bi bi-check2 me-1"></i> Guardar
                  </button>
                } @else {
                  <button type="button" class="btn btn-sm btn-link p-0" (click)="startEdit(r.id)">
                    <i class="bi bi-pencil"></i>
                  </button>
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>

  <div class="card">
    <div class="card-header d-flex align-items-center gap-2">
      <i class="bi bi-gear text-primary"></i>
      <div>
        <h6 class="mb-0">Reglas de Validaci\xF3n de Documentos</h6>
        <small class="text-body-secondary">Par\xE1metros que la IA utiliza para aprobar o rechazar documentos</small>
      </div>
    </div>
    <div class="card-body p-0 overflow-auto">
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Vigencia M\xE1xima</th>
            <th>Obligatorio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          @for (rule of documentRules; track rule.name) {
            <tr>
              <td class="fw-medium">{{ rule.name }}</td>
              <td>{{ rule.maxAge === 0 ? 'Debe estar vigente' : rule.maxAge + ' ' + rule.unit }}</td>
              <td><span class="badge" [class.bg-primary]="rule.required" [class.bg-secondary]="!rule.required">{{ rule.required ? 'Obligatorio' : 'Opcional' }}</span></td>
              <td><span class="small text-success"><i class="bi bi-robot me-1"></i> IA Configurada</span></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>

  <div class="card">
    <div class="card-header d-flex align-items-center gap-2">
      <i class="bi bi-robot text-primary"></i>
      <div>
        <h6 class="mb-0">Estado del Asistente IA</h6>
        <small class="text-body-secondary">Configuraci\xF3n y estado de los m\xF3dulos de inteligencia artificial</small>
      </div>
    </div>
    <div class="card-body">
      <div class="row g-3">
        @for (ai of aiModules; track ai.module) {
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="border rounded p-3 d-flex justify-content-between align-items-center">
              <div>
                <div class="fw-medium">{{ ai.module }}</div>
                <div class="small text-body-secondary">{{ ai.version }}</div>
              </div>
              <div class="d-flex align-items-center gap-2">
                <span class="rounded-circle bg-success" style="width: 8px; height: 8px;"></span>
                <span class="small text-success">{{ ai.status }}</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfiguracionComponent, { className: "ConfiguracionComponent", filePath: "src/app/features/configuracion/configuracion.component.ts", lineNumber: 48 });
})();
export {
  ConfiguracionComponent
};
//# sourceMappingURL=chunk-7IYKWWB4.js.map
