import {
  CheckboxControlValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-BNGTIDGH.js";
import {
  CommonModule,
  Component,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵarrowFunction,
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
  ɵɵproperty,
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

// src/app/features/reportes/reportes.component.ts
var arrowFn0 = (ctx, view) => (r) => r.vistoBuenoITO;
var arrowFn1 = (ctx, view) => (r) => r.checkSeremi;
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.name;
function ReportesComponent_Conditional_14_Conditional_16_For_18_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275element(1, "i", 40);
    \u0275\u0275text(2, " Listo para Facturar");
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_Conditional_14_Conditional_16_For_18_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function ReportesComponent_Conditional_14_Conditional_16_For_18_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const row_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.marcarListoParaFacturar(row_r4.id));
    });
    \u0275\u0275element(1, "i", 40);
    \u0275\u0275text(2, " Apto para Cobro");
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_Conditional_14_Conditional_16_For_18_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "Falta informe / ITO / resoluci\xF3n");
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_Conditional_14_Conditional_16_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 37);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 35);
    \u0275\u0275element(9, "i", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 35);
    \u0275\u0275element(11, "i", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 35);
    \u0275\u0275conditionalCreate(13, ReportesComponent_Conditional_14_Conditional_16_For_18_Conditional_13_Template, 3, 0, "span", 31)(14, ReportesComponent_Conditional_14_Conditional_16_For_18_Conditional_14_Template, 3, 0, "button", 15)(15, ReportesComponent_Conditional_14_Conditional_16_For_18_Conditional_15_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r4.beneficiario);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r4.estadoSubsidio);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r4.montoUF);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bi-check-circle-fill", row_r4.vistoBuenoITO)("text-success", row_r4.vistoBuenoITO)("bi-x-circle", !row_r4.vistoBuenoITO)("text-secondary", !row_r4.vistoBuenoITO);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bi-check-circle-fill", row_r4.checkSeremi)("text-success", row_r4.checkSeremi)("bi-x-circle", !row_r4.checkSeremi)("text-secondary", !row_r4.checkSeremi);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.listoParaFacturar[row_r4.id] ? 13 : ctx_r1.puedeAptoParaCobro(row_r4) ? 14 : 15);
  }
}
function ReportesComponent_Conditional_14_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "table", 32)(2, "thead", 33)(3, "tr")(4, "th");
    \u0275\u0275text(5, "Beneficiario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Estado Subsidio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 34);
    \u0275\u0275text(9, "Monto UF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 35);
    \u0275\u0275text(11, "Visto Bueno ITO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 35);
    \u0275\u0275text(13, "Check Seremi");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 35);
    \u0275\u0275text(15, "Acci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, ReportesComponent_Conditional_14_Conditional_16_For_18_Template, 16, 20, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r1.reporteGrid);
  }
}
function ReportesComponent_Conditional_14_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "div", 42);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Actualizando datos...");
    \u0275\u0275elementEnd()();
  }
}
function ReportesComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 9)(2, "div", 8)(3, "div", 10)(4, "h6", 11);
    \u0275\u0275text(5, "Reporte SERVIU \u2014 Formulario sucinto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 12)(7, "button", 13);
    \u0275\u0275listener("click", function ReportesComponent_Conditional_14_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.actualizarReporte());
    });
    \u0275\u0275element(8, "i", 14);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 15);
    \u0275\u0275element(11, "i", 16);
    \u0275\u0275text(12, " Exportar");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 17)(14, "p", 18);
    \u0275\u0275text(15, "Vista t\xE9cnica por beneficiario. Sin texto narrativo.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, ReportesComponent_Conditional_14_Conditional_16_Template, 19, 0, "div", 19)(17, ReportesComponent_Conditional_14_Conditional_17_Template, 4, 0, "div", 20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 21)(19, "div", 22)(20, "div", 23)(21, "h6", 11);
    \u0275\u0275text(22, "Resumen");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 17)(24, "div", 24)(25, "span", 25);
    \u0275\u0275text(26, "Registros");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 26);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 24)(30, "span", 25);
    \u0275\u0275text(31, "Con Visto Bueno ITO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 26);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 24)(35, "span", 25);
    \u0275\u0275text(36, "Check Seremi OK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 26);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 27)(40, "span", 25);
    \u0275\u0275text(41, "Listos para Facturar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 28);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(44, "div", 8)(45, "div", 23)(46, "h6", 11);
    \u0275\u0275text(47, "Completitud Carpeta");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 29)(49, "div", 30);
    \u0275\u0275text(50, "100%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 31);
    \u0275\u0275text(52, "Lista para SERVIU");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.isGenerating);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.isGenerating ? "Actualizando..." : "Actualizar", " ");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.reportGenerated ? 16 : 17);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.reporteGrid.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.reporteGrid.filter(\u0275\u0275arrowFunction(7, arrowFn0, ctx)).length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.reporteGrid.filter(\u0275\u0275arrowFunction(8, arrowFn1, ctx)).length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.listosCount);
  }
}
function ReportesComponent_Conditional_15_For_13_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, "Auto-generado");
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_Conditional_15_For_13_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 50);
  }
}
function ReportesComponent_Conditional_15_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47)(2, "span", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 39);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(9, ReportesComponent_Conditional_15_For_13_Conditional_9_Template, 2, 0, "span", 36)(10, ReportesComponent_Conditional_15_For_13_Conditional_10_Template, 1, 0, "i", 50);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(f_r5.folio === 0 ? "IX" : "F" + f_r5.folio);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(f_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r5.type);
    \u0275\u0275advance();
    \u0275\u0275conditional(f_r5.status === "generated" ? 9 : 10);
  }
}
function ReportesComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 10)(2, "div")(3, "h6", 11);
    \u0275\u0275text(4, "Generador de Carpeta SERVIU");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small", 25);
    \u0275\u0275text(6, "Archivos ordenados y renombrados seg\xFAn est\xE1ndar oficial");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 43);
    \u0275\u0275element(8, "i", 44);
    \u0275\u0275text(9, " Descargar .ZIP");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 17)(11, "div", 45);
    \u0275\u0275repeaterCreate(12, ReportesComponent_Conditional_15_For_13_Template, 11, 4, "div", 46, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r1.carpetaFiles);
  }
}
function ReportesComponent_Conditional_16_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 61);
    \u0275\u0275elementStart(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.informePlagas);
  }
}
function ReportesComponent_Conditional_16_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 63);
    \u0275\u0275elementStart(1, "span", 25);
    \u0275\u0275text(2, "Clic para subir informe UBB / UdeC");
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_Conditional_16_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 56);
  }
}
function ReportesComponent_Conditional_16_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 57);
  }
}
function ReportesComponent_Conditional_16_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275element(1, "i", 64);
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "Sin este documento");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ' el sistema avisa: el ITO no dar\xE1 el "Vamos y Pago". Subir certificado de aprobaci\xF3n Seremi de Salud. ');
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 23)(2, "h6", 11);
    \u0275\u0275text(3, "Documentaci\xF3n t\xE9cnica especializada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 25);
    \u0275\u0275text(5, "Informes de terceros (universidades, Seremi). Sin aprobaci\xF3n Seremi de Salud el ITO no dar\xE1 Vamos y Pago.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 17)(7, "h6", 51);
    \u0275\u0275text(8, "Informe Sil\xF3fagos (Plagas)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 39);
    \u0275\u0275text(10, "Informe de la Universidad del B\xEDo-B\xEDo o UdeC. Subir PDF del informe t\xE9cnico.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 52);
    \u0275\u0275conditionalCreate(12, ReportesComponent_Conditional_16_Conditional_12_Template, 3, 1)(13, ReportesComponent_Conditional_16_Conditional_13_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "hr");
    \u0275\u0275elementStart(15, "h6");
    \u0275\u0275text(16, "Validaci\xF3n de qu\xEDmicos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 39);
    \u0275\u0275text(18, "Aprobaci\xF3n Seremi de Salud. Obligatorio para que el ITO (Inspector) otorgue Vamos y Pago.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 53)(20, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function ReportesComponent_Conditional_16_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.seremiQuimicos, $event) || (ctx_r1.seremiQuimicos = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "label", 55);
    \u0275\u0275text(22, "Aprobado por Seremi de Salud");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, ReportesComponent_Conditional_16_Conditional_23_Template, 1, 0, "i", 56)(24, ReportesComponent_Conditional_16_Conditional_24_Template, 1, 0, "i", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(25, ReportesComponent_Conditional_16_Conditional_25_Template, 5, 0, "div", 58);
    \u0275\u0275elementStart(26, "h6", 59);
    \u0275\u0275text(27, "Otros certificados universitarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p", 39);
    \u0275\u0275text(29, "Espacio para otros informes t\xE9cnicos (estructuras, suelos, etc.).");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 60);
    \u0275\u0275text(31, "Arrastrar o subir PDF");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275conditional(ctx_r1.informePlagas ? 12 : 13);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.seremiQuimicos);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.seremiQuimicos ? 23 : 24);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.seremiQuimicos ? 25 : -1);
  }
}
var REPORTE_GRID = [
  { id: "1", beneficiario: "Maria Gonzalez Soto", comite: "Villa Esperanza", estadoSubsidio: "Elegible DS49", montoUF: "25", vistoBuenoITO: true, checkSeremi: true, resolucion: true, informeUniversidad: true },
  { id: "2", beneficiario: "Juan Perez Rojas", comite: "Villa Esperanza", estadoSubsidio: "En revisi\xF3n", montoUF: "18", vistoBuenoITO: true, checkSeremi: false, resolucion: false, informeUniversidad: true },
  { id: "3", beneficiario: "Ana Lopez Diaz", comite: "Los Aromos", estadoSubsidio: "Elegible DS49", montoUF: "22", vistoBuenoITO: false, checkSeremi: false, resolucion: false, informeUniversidad: false }
];
var CARPETA_FILES = [
  { name: "12345678-9_DOMINIO_2026.pdf", type: "Dominio Vigente", folio: 1, status: "ok" },
  { name: "12345678-9_RSH_2026.pdf", type: "Certificado RSH", folio: 2, status: "ok" },
  { name: "12345678-9_AHORRO_2026.pdf", type: "Cartola de Ahorro", folio: 3, status: "ok" },
  { name: "12345678-9_CI_2026.pdf", type: "Carnet de Identidad", folio: 4, status: "ok" },
  { name: "12345678-9_FACTIBILIDAD_2026.pdf", type: "Factibilidad T\xE9cnica", folio: 5, status: "ok" },
  { name: "12345678-9_INDICE_FOLIADO.pdf", type: "\xCDndice Foliado", folio: 0, status: "generated" }
];
var ReportesComponent = class _ReportesComponent {
  constructor() {
    this.reporteGrid = REPORTE_GRID;
    this.carpetaFiles = CARPETA_FILES;
    this.listoParaFacturar = {};
    this.activeTab = "report";
    this.reportGenerated = true;
    this.isGenerating = false;
    this.informePlagas = "Informe_UBB_Silofagos_2026.pdf";
    this.seremiQuimicos = false;
  }
  puedeAptoParaCobro(row) {
    return !!(row.informeUniversidad && row.vistoBuenoITO && row.resolucion);
  }
  marcarListoParaFacturar(id) {
    this.listoParaFacturar = __spreadProps(__spreadValues({}, this.listoParaFacturar), { [id]: true });
  }
  get listosCount() {
    return Object.keys(this.listoParaFacturar).length;
  }
  actualizarReporte() {
    this.isGenerating = true;
    this.reportGenerated = false;
    setTimeout(() => {
      this.isGenerating = false;
      this.reportGenerated = true;
    }, 2e3);
  }
  static {
    this.\u0275fac = function ReportesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReportesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportesComponent, selectors: [["app-reportes"]], decls: 17, vars: 9, consts: [[1, "d-flex", "flex-column", "gap-4"], [1, "nav", "nav-tabs"], [1, "nav-item"], ["href", "javascript:void(0)", 1, "nav-link", 3, "click"], [1, "bi", "bi-file-text", "me-1"], [1, "bi", "bi-folder2-open", "me-1"], [1, "bi", "bi-clipboard-check", "me-1"], [1, "row", "g-4"], [1, "card"], [1, "col-12", "col-lg-8"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center", "flex-wrap", "gap-2"], [1, "mb-0"], [1, "d-flex", "gap-2"], [1, "btn", "btn-sm", "btn-outline-secondary", 3, "click", "disabled"], [1, "bi", "bi-arrow-clockwise", "me-1"], [1, "btn", "btn-sm", "btn-primary"], [1, "bi", "bi-download", "me-1"], [1, "card-body"], [1, "small", "text-body-secondary", "mb-3"], [1, "table-responsive"], [1, "d-flex", "flex-column", "align-items-center", "justify-content-center", "gap-3", "text-body-secondary", 2, "min-height", "200px"], [1, "col-12", "col-lg-4"], [1, "card", "mb-3"], [1, "card-header"], [1, "d-flex", "justify-content-between", "small", "mb-2"], [1, "text-body-secondary"], [1, "fw-medium"], [1, "d-flex", "justify-content-between", "small"], [1, "fw-medium", "text-success"], [1, "card-body", "text-center"], [1, "mb-2", "fw-bold", "display-6"], [1, "badge", "bg-success"], [1, "table", "table-bordered", "table-sm"], [1, "table-light"], [1, "text-end"], [1, "text-center"], [1, "badge", "bg-secondary"], [1, "text-end", "font-monospace"], [1, "bi"], [1, "small", "text-body-secondary"], [1, "bi", "bi-cash-stack", "me-1"], [1, "btn", "btn-sm", "btn-primary", 3, "click"], [1, "spinner-border", "text-primary"], [1, "btn", "btn-primary"], [1, "bi", "bi-download", "me-2"], [1, "d-flex", "flex-column", "gap-2"], [1, "d-flex", "align-items-center", "justify-content-between", "border", "rounded", "p-3"], [1, "d-flex", "align-items-center", "gap-3"], [1, "rounded", "bg-light", "px-2", "py-1", "small", "fw-bold"], [1, "fw-medium", "font-monospace", "small"], [1, "bi", "bi-check-circle-fill", "text-success"], [1, "mt-3"], [1, "border", "border-2", "border-dashed", "rounded", "bg-light", "p-4", "text-center"], [1, "form-check", "form-switch", "border", "rounded", "p-3"], ["type", "checkbox", "id", "seremi", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "seremi", 1, "form-check-label", "fw-medium"], [1, "bi", "bi-check-circle-fill", "text-success", "ms-2"], [1, "bi", "bi-x-circle", "text-body-secondary", "ms-2"], [1, "alert", "alert-danger", "small", "mt-2"], [1, "mt-4"], [1, "border", "border-dashed", "rounded", "bg-light", "p-4", "text-center", "small", "text-body-secondary"], [1, "bi", "bi-check-circle-fill", "text-success", "me-2"], [1, "font-monospace"], [1, "bi", "bi-file-pdf", "text-body-secondary", "me-2"], [1, "bi", "bi-exclamation-triangle", "me-2"]], template: function ReportesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "ul", 1)(2, "li", 2)(3, "a", 3);
        \u0275\u0275listener("click", function ReportesComponent_Template_a_click_3_listener() {
          return ctx.activeTab = "report";
        });
        \u0275\u0275element(4, "i", 4);
        \u0275\u0275text(5, " Resumen Ejecutivo");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "li", 2)(7, "a", 3);
        \u0275\u0275listener("click", function ReportesComponent_Template_a_click_7_listener() {
          return ctx.activeTab = "carpeta";
        });
        \u0275\u0275element(8, "i", 5);
        \u0275\u0275text(9, " Carpeta SERVIU");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "li", 2)(11, "a", 3);
        \u0275\u0275listener("click", function ReportesComponent_Template_a_click_11_listener() {
          return ctx.activeTab = "ficha";
        });
        \u0275\u0275element(12, "i", 6);
        \u0275\u0275text(13, " Informes de Terceros");
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(14, ReportesComponent_Conditional_14_Template, 53, 9, "div", 7);
        \u0275\u0275conditionalCreate(15, ReportesComponent_Conditional_15_Template, 14, 0, "div", 8);
        \u0275\u0275conditionalCreate(16, ReportesComponent_Conditional_16_Template, 32, 4, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275classProp("active", ctx.activeTab === "report");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active", ctx.activeTab === "carpeta");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active", ctx.activeTab === "ficha");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.activeTab === "report" ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeTab === "carpeta" ? 15 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeTab === "ficha" ? 16 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, CheckboxControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportesComponent, [{
    type: Component,
    args: [{ selector: "app-reportes", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="d-flex flex-column gap-4">\r
  <ul class="nav nav-tabs">\r
    <li class="nav-item"><a class="nav-link" [class.active]="activeTab === 'report'" (click)="activeTab = 'report'" href="javascript:void(0)"><i class="bi bi-file-text me-1"></i> Resumen Ejecutivo</a></li>\r
    <li class="nav-item"><a class="nav-link" [class.active]="activeTab === 'carpeta'" (click)="activeTab = 'carpeta'" href="javascript:void(0)"><i class="bi bi-folder2-open me-1"></i> Carpeta SERVIU</a></li>\r
    <li class="nav-item"><a class="nav-link" [class.active]="activeTab === 'ficha'" (click)="activeTab = 'ficha'" href="javascript:void(0)"><i class="bi bi-clipboard-check me-1"></i> Informes de Terceros</a></li>\r
  </ul>\r
\r
  @if (activeTab === 'report') {\r
    <div class="row g-4">\r
      <div class="col-12 col-lg-8">\r
        <div class="card">\r
          <div class="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">\r
            <h6 class="mb-0">Reporte SERVIU \u2014 Formulario sucinto</h6>\r
            <div class="d-flex gap-2">\r
              <button class="btn btn-sm btn-outline-secondary" (click)="actualizarReporte()" [disabled]="isGenerating">\r
                <i class="bi bi-arrow-clockwise me-1" ></i>{{ isGenerating ? 'Actualizando...' : 'Actualizar' }}\r
              </button>\r
              <button class="btn btn-sm btn-primary"><i class="bi bi-download me-1"></i> Exportar</button>\r
            </div>\r
          </div>\r
          <div class="card-body">\r
            <p class="small text-body-secondary mb-3">Vista t\xE9cnica por beneficiario. Sin texto narrativo.</p>\r
            @if (reportGenerated) {\r
              <div class="table-responsive">\r
                <table class="table table-bordered table-sm">\r
                  <thead class="table-light">\r
                    <tr>\r
                      <th>Beneficiario</th>\r
                      <th>Estado Subsidio</th>\r
                      <th class="text-end">Monto UF</th>\r
                      <th class="text-center">Visto Bueno ITO</th>\r
                      <th class="text-center">Check Seremi</th>\r
                      <th class="text-center">Acci\xF3n</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody>\r
                    @for (row of reporteGrid; track row.id) {\r
                      <tr>\r
                        <td class="fw-medium">{{ row.beneficiario }}</td>\r
                        <td><span class="badge bg-secondary">{{ row.estadoSubsidio }}</span></td>\r
                        <td class="text-end font-monospace">{{ row.montoUF }}</td>\r
                        <td class="text-center"><i class="bi" [class.bi-check-circle-fill]="row.vistoBuenoITO" [class.text-success]="row.vistoBuenoITO" [class.bi-x-circle]="!row.vistoBuenoITO" [class.text-secondary]="!row.vistoBuenoITO"></i></td>\r
                        <td class="text-center"><i class="bi" [class.bi-check-circle-fill]="row.checkSeremi" [class.text-success]="row.checkSeremi" [class.bi-x-circle]="!row.checkSeremi" [class.text-secondary]="!row.checkSeremi"></i></td>\r
                        <td class="text-center">\r
                          @if (listoParaFacturar[row.id]) {\r
                            <span class="badge bg-success"><i class="bi bi-cash-stack me-1"></i> Listo para Facturar</span>\r
                          } @else if (puedeAptoParaCobro(row)) {\r
                            <button class="btn btn-sm btn-primary" (click)="marcarListoParaFacturar(row.id)"><i class="bi bi-cash-stack me-1"></i> Apto para Cobro</button>\r
                          } @else {\r
                            <span class="small text-body-secondary">Falta informe / ITO / resoluci\xF3n</span>\r
                          }\r
                        </td>\r
                      </tr>\r
                    }\r
                  </tbody>\r
                </table>\r
              </div>\r
            } @else {\r
              <div class="d-flex flex-column align-items-center justify-content-center gap-3 text-body-secondary" style="min-height: 200px;">\r
                <div class="spinner-border text-primary"></div>\r
                <span>Actualizando datos...</span>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
      <div class="col-12 col-lg-4">\r
        <div class="card mb-3">\r
          <div class="card-header"><h6 class="mb-0">Resumen</h6></div>\r
          <div class="card-body">\r
            <div class="d-flex justify-content-between small mb-2"><span class="text-body-secondary">Registros</span><span class="fw-medium">{{ reporteGrid.length }}</span></div>\r
            <div class="d-flex justify-content-between small mb-2"><span class="text-body-secondary">Con Visto Bueno ITO</span><span class="fw-medium">{{ reporteGrid.filter(r => r.vistoBuenoITO).length }}</span></div>\r
            <div class="d-flex justify-content-between small mb-2"><span class="text-body-secondary">Check Seremi OK</span><span class="fw-medium">{{ reporteGrid.filter(r => r.checkSeremi).length }}</span></div>\r
            <div class="d-flex justify-content-between small"><span class="text-body-secondary">Listos para Facturar</span><span class="fw-medium text-success">{{ listosCount }}</span></div>\r
          </div>\r
        </div>\r
        <div class="card">\r
          <div class="card-header"><h6 class="mb-0">Completitud Carpeta</h6></div>\r
          <div class="card-body text-center">\r
            <div class="mb-2 fw-bold display-6">100%</div>\r
            <span class="badge bg-success">Lista para SERVIU</span>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  @if (activeTab === 'carpeta') {\r
    <div class="card">\r
      <div class="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">\r
        <div>\r
          <h6 class="mb-0">Generador de Carpeta SERVIU</h6>\r
          <small class="text-body-secondary">Archivos ordenados y renombrados seg\xFAn est\xE1ndar oficial</small>\r
        </div>\r
        <button class="btn btn-primary"><i class="bi bi-download me-2"></i> Descargar .ZIP</button>\r
      </div>\r
      <div class="card-body">\r
        <div class="d-flex flex-column gap-2">\r
          @for (f of carpetaFiles; track f.name) {\r
            <div class="d-flex align-items-center justify-content-between border rounded p-3">\r
              <div class="d-flex align-items-center gap-3">\r
                <span class="rounded bg-light px-2 py-1 small fw-bold">{{ f.folio === 0 ? 'IX' : 'F' + f.folio }}</span>\r
                <div>\r
                  <div class="fw-medium font-monospace small">{{ f.name }}</div>\r
                  <div class="small text-body-secondary">{{ f.type }}</div>\r
                </div>\r
              </div>\r
              @if (f.status === 'generated') {\r
                <span class="badge bg-secondary">Auto-generado</span>\r
              } @else {\r
                <i class="bi bi-check-circle-fill text-success"></i>\r
              }\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  @if (activeTab === 'ficha') {\r
    <div class="card">\r
      <div class="card-header">\r
        <h6 class="mb-0">Documentaci\xF3n t\xE9cnica especializada</h6>\r
        <small class="text-body-secondary">Informes de terceros (universidades, Seremi). Sin aprobaci\xF3n Seremi de Salud el ITO no dar\xE1 Vamos y Pago.</small>\r
      </div>\r
      <div class="card-body">\r
        <h6 class="mt-3">Informe Sil\xF3fagos (Plagas)</h6>\r
        <p class="small text-body-secondary">Informe de la Universidad del B\xEDo-B\xEDo o UdeC. Subir PDF del informe t\xE9cnico.</p>\r
        <div class="border border-2 border-dashed rounded bg-light p-4 text-center">\r
          @if (informePlagas) {\r
            <i class="bi bi-check-circle-fill text-success me-2"></i><span class="font-monospace">{{ informePlagas }}</span>\r
          } @else {\r
            <i class="bi bi-file-pdf text-body-secondary me-2"></i><span class="text-body-secondary">Clic para subir informe UBB / UdeC</span>\r
          }\r
        </div>\r
\r
        <hr>\r
\r
        <h6>Validaci\xF3n de qu\xEDmicos</h6>\r
        <p class="small text-body-secondary">Aprobaci\xF3n Seremi de Salud. Obligatorio para que el ITO (Inspector) otorgue Vamos y Pago.</p>\r
        <div class="form-check form-switch border rounded p-3">\r
          <input class="form-check-input" type="checkbox" id="seremi" [(ngModel)]="seremiQuimicos">\r
          <label class="form-check-label fw-medium" for="seremi">Aprobado por Seremi de Salud</label>\r
          @if (seremiQuimicos) {\r
            <i class="bi bi-check-circle-fill text-success ms-2"></i>\r
          } @else {\r
            <i class="bi bi-x-circle text-body-secondary ms-2"></i>\r
          }\r
        </div>\r
        @if (!seremiQuimicos) {\r
          <div class="alert alert-danger small mt-2">\r
            <i class="bi bi-exclamation-triangle me-2"></i><strong>Sin este documento</strong> el sistema avisa: el ITO no dar\xE1 el "Vamos y Pago". Subir certificado de aprobaci\xF3n Seremi de Salud.\r
          </div>\r
        }\r
\r
        <h6 class="mt-4">Otros certificados universitarios</h6>\r
        <p class="small text-body-secondary">Espacio para otros informes t\xE9cnicos (estructuras, suelos, etc.).</p>\r
        <div class="border border-dashed rounded bg-light p-4 text-center small text-body-secondary">Arrastrar o subir PDF</div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportesComponent, { className: "ReportesComponent", filePath: "src/app/features/reportes/reportes.component.ts", lineNumber: 38 });
})();
export {
  ReportesComponent
};
//# sourceMappingURL=chunk-ZXWYSX2E.js.map
