import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵinterpolate1,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-7OUYEERV.js";

// src/app/features/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.title;
var _forTrack1 = ($index, $item) => $item.name;
var _forTrack2 = ($index, $item) => $item.rut + $item.document;
function DashboardComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 2)(1, "div", 22)(2, "div", 9)(3, "div", 23)(4, "span", 24);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "span", 25);
    \u0275\u0275domElement(7, "i");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 26);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "p", 27);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "small", 28);
    \u0275\u0275domElement(13, "i", 29);
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const m_r1 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(m_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("bi ", m_r1.icon, " text-primary"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r1.subtitle);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r1.trend);
  }
}
function DashboardComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g");
    \u0275\u0275domElement(1, "rect", 30);
    \u0275\u0275domElementStart(2, "text", 31);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "text", 32);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const b_r2 = ctx.$implicit;
    const \u0275$index_52_r3 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + \u0275$index_52_r3 * 72 + ", 0)");
    \u0275\u0275advance();
    \u0275\u0275attribute("x", 0)("y", 200 - ctx_r3.barHeight(b_r2.value))("width", 40)("height", ctx_r3.barHeight(b_r2.value))("fill", b_r2.fill);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r2.name);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", 20)("y", 194 - ctx_r3.barHeight(b_r2.value));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r2.value);
  }
}
function DashboardComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 16);
    \u0275\u0275domElement(1, "span", 33);
    \u0275\u0275domElementStart(2, "span", 34);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", 10, "px")("height", 10, "px")("background", p_r5.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", p_r5.name, " (", p_r5.value, "%)");
  }
}
function DashboardComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 21)(1, "div")(2, "span", 35);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span", 36);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "div", 37);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 38)(9, "div");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "div", 8);
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(13, "div", 16);
    \u0275\u0275domElement(14, "i", 39);
    \u0275\u0275domElementStart(15, "span", 40);
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const a_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r6.beneficiary);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-danger", a_r6.severity === "critical")("bg-warning", a_r6.severity === "warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", a_r6.severity === "critical" ? "Cr\xEDtico" : "Alerta", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r6.rut);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r6.document);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r6.committee);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-danger", a_r6.daysLeft <= 5)("text-warning", a_r6.daysLeft > 5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", a_r6.daysLeft, " d\xEDas");
  }
}
var METRICS = [
  { title: "Total UF en Proceso", value: "12.450", subtitle: "UF activas en subsidios", trend: "+5.2% vs mes anterior", icon: "bi-currency-dollar" },
  { title: "Carpetas 100% Listas", value: "34", subtitle: "Listas para SERVIU", trend: "8 nuevas esta semana", icon: "bi-folder-check" },
  { title: "Proyectos en Construcci\xF3n", value: "12", subtitle: "En ejecuci\xF3n activa", trend: "3 por iniciar", icon: "bi-bricks" },
  { title: "Alertas Cr\xEDticas", value: "7", subtitle: "Requieren atenci\xF3n", trend: "2 documentos por vencer hoy", icon: "bi-exclamation-triangle" }
];
var BAR_DATA = [
  { name: "Pendiente", value: 23, fill: "var(--bs-warning)" },
  { name: "En Proceso", value: 45, fill: "var(--bs-primary)" },
  { name: "Visado", value: 34, fill: "#6f42c1" },
  { name: "Listo SERVIU", value: 34, fill: "var(--bs-success)" },
  { name: "Rechazado", value: 8, fill: "var(--bs-danger)" }
];
var PIE_DATA = [
  { name: "DS49", value: 45, color: "var(--bs-primary)" },
  { name: "DS1", value: 30, color: "#6f42c1" },
  { name: "DS27", value: 15, color: "var(--bs-info)" },
  { name: "Otros", value: 10, color: "var(--bs-secondary)" }
];
var ALERTS = [
  { beneficiary: "Maria Gonzalez Soto", rut: "12.345.678-9", document: "Dominio Vigente", daysLeft: 3, committee: "Villa Esperanza", severity: "critical" },
  { beneficiary: "Pedro Ramirez Lagos", rut: "11.222.333-4", document: "Certificado RSH", daysLeft: 7, committee: "Poblaci\xF3n Aurora", severity: "warning" },
  { beneficiary: "Ana Mu\xF1oz Vera", rut: "15.678.901-2", document: "Carnet de Identidad", daysLeft: 5, committee: "Comit\xE9 Los Aromos", severity: "critical" },
  { beneficiary: "Carlos Diaz Fuentes", rut: "9.876.543-1", document: "Certificado de Ahorro", daysLeft: 12, committee: "Villa Esperanza", severity: "warning" },
  { beneficiary: "Luisa Torres Pino", rut: "14.567.890-K", document: "Dominio Vigente", daysLeft: 2, committee: "Poblaci\xF3n Aurora", severity: "critical" }
];
var DashboardComponent = class _DashboardComponent {
  constructor() {
    this.metrics = METRICS;
    this.barData = BAR_DATA;
    this.pieData = PIE_DATA;
    this.alerts = ALERTS;
  }
  get barMax() {
    return Math.max(...this.barData.map((b) => b.value));
  }
  barHeight(value) {
    const max = this.barMax;
    return max > 0 ? value / max * 200 : 0;
  }
  get pieChartBackground() {
    let acc = 0;
    const parts = this.pieData.map((p) => {
      const start = acc;
      acc += p.value;
      return `${p.color} ${start}% ${acc}%`;
    });
    return `conic-gradient(${parts.join(", ")})`;
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 40, vars: 6, consts: [[1, "d-flex", "flex-column", "gap-4"], [1, "row", "g-3"], [1, "col-12", "col-sm-6", "col-lg-3"], [1, "row", "g-4"], [1, "col-12", "col-lg-8"], [1, "card"], [1, "card-header"], [1, "mb-0"], [1, "text-body-secondary"], [1, "card-body"], ["width", "100%", "height", "256", "viewBox", "0 0 400 220", 1, "d-block", 2, "max-width", "100%"], ["transform", "translate(40, 20)"], [1, "col-12", "col-lg-4"], [1, "card-body", "d-flex", "flex-column", "align-items-center", "gap-3"], [1, "rounded-circle", "flex-shrink-0"], [1, "d-flex", "flex-wrap", "gap-3", "justify-content-center"], [1, "d-flex", "align-items-center", "gap-2"], [1, "card-header", "d-flex", "align-items-center", "gap-2"], [1, "bi", "bi-exclamation-triangle", "text-warning"], [1, "small", "text-body-secondary", "mb-3"], [1, "d-flex", "flex-column", "gap-3"], [1, "border", "rounded", "p-3", "d-flex", "flex-column", "flex-sm-row", "flex-wrap", "align-items-sm-center", "justify-content-between", "gap-2"], [1, "card", "h-100"], [1, "d-flex", "justify-content-between", "align-items-start", "mb-2"], [1, "small", "fw-medium", "text-body-secondary"], [1, "rounded", "p-2", "bg-primary", "bg-opacity-10"], [1, "fs-4", "fw-bold"], [1, "small", "text-body-secondary", "mb-1"], [1, "text-success"], [1, "bi", "bi-graph-up-arrow", "me-1"], ["rx", "4", "ry", "0"], ["x", "20", "y", "210", "text-anchor", "middle", "fill", "var(--bs-body-color)", "font-size", "11", 1, "small"], ["text-anchor", "middle", "fill", "var(--bs-body-color)", "font-size", "11", "font-weight", "600"], [1, "rounded-circle", "d-inline-block", "flex-shrink-0"], [1, "small", "text-body-secondary"], [1, "fw-medium", "me-2"], [1, "badge"], [1, "small", "text-body-secondary", "font-monospace"], [1, "small"], [1, "bi", "bi-clock", "text-body-secondary"], [1, "fw-medium"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275repeaterCreate(2, DashboardComponent_For_3_Template, 15, 7, "div", 2, _forTrack0);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "h6", 7);
        \u0275\u0275text(9, "Estado de Carpetas");
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(10, "small", 8);
        \u0275\u0275text(11, "Distribuci\xF3n por estado de avance");
        \u0275\u0275domElementEnd()();
        \u0275\u0275domElementStart(12, "div", 9);
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElementStart(13, "svg", 10)(14, "g", 11);
        \u0275\u0275repeaterCreate(15, DashboardComponent_For_16_Template, 6, 10, ":svg:g", null, _forTrack1);
        \u0275\u0275domElementEnd()()()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275domElementStart(17, "div", 12)(18, "div", 5)(19, "div", 6)(20, "h6", 7);
        \u0275\u0275text(21, "Subsidios Activos");
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(22, "small", 8);
        \u0275\u0275text(23, "Distribuci\xF3n por programa");
        \u0275\u0275domElementEnd()();
        \u0275\u0275domElementStart(24, "div", 13);
        \u0275\u0275domElement(25, "div", 14);
        \u0275\u0275domElementStart(26, "div", 15);
        \u0275\u0275repeaterCreate(27, DashboardComponent_For_28_Template, 4, 8, "div", 16, _forTrack1);
        \u0275\u0275domElementEnd()()()()();
        \u0275\u0275domElementStart(29, "div", 5)(30, "div", 17);
        \u0275\u0275domElement(31, "i", 18);
        \u0275\u0275domElementStart(32, "h6", 7);
        \u0275\u0275text(33, "Alertas de Prioridad IA");
        \u0275\u0275domElementEnd()();
        \u0275\u0275domElementStart(34, "div", 9)(35, "p", 19);
        \u0275\u0275text(36, "Documentos que vencen en menos de 15 d\xEDas detectados autom\xE1ticamente");
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(37, "div", 20);
        \u0275\u0275repeaterCreate(38, DashboardComponent_For_39_Template, 17, 14, "div", 21, _forTrack2);
        \u0275\u0275domElementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.metrics);
        \u0275\u0275advance(13);
        \u0275\u0275repeater(ctx.barData);
        \u0275\u0275advance(10);
        \u0275\u0275styleProp("width", 160, "px")("height", 160, "px")("background", ctx.pieChartBackground);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.pieData);
        \u0275\u0275advance(11);
        \u0275\u0275repeater(ctx.alerts);
      }
    }, dependencies: [CommonModule], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [CommonModule], template: `<div class="d-flex flex-column gap-4">\r
  <div class="row g-3">\r
    @for (m of metrics; track m.title) {\r
      <div class="col-12 col-sm-6 col-lg-3">\r
        <div class="card h-100">\r
          <div class="card-body">\r
            <div class="d-flex justify-content-between align-items-start mb-2">\r
              <span class="small fw-medium text-body-secondary">{{ m.title }}</span>\r
              <span class="rounded p-2 bg-primary bg-opacity-10">\r
                <i class="bi {{ m.icon }} text-primary"></i>\r
              </span>\r
            </div>\r
            <div class="fs-4 fw-bold">{{ m.value }}</div>\r
            <p class="small text-body-secondary mb-1">{{ m.subtitle }}</p>\r
            <small class="text-success"><i class="bi bi-graph-up-arrow me-1"></i>{{ m.trend }}</small>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  </div>\r
\r
  <div class="row g-4">\r
    <div class="col-12 col-lg-8">\r
      <div class="card">\r
        <div class="card-header">\r
          <h6 class="mb-0">Estado de Carpetas</h6>\r
          <small class="text-body-secondary">Distribuci\xF3n por estado de avance</small>\r
        </div>\r
        <div class="card-body">\r
          <svg width="100%" height="256" viewBox="0 0 400 220" class="d-block" style="max-width: 100%;">\r
            <g transform="translate(40, 20)">\r
              @for (b of barData; track b.name; let i = $index) {\r
                <g [attr.transform]="'translate(' + (i * 72) + ', 0)'">\r
                  <rect [attr.x]="0" [attr.y]="200 - barHeight(b.value)" [attr.width]="40" [attr.height]="barHeight(b.value)" [attr.fill]="b.fill" rx="4" ry="0"/>\r
                  <text x="20" y="210" text-anchor="middle" class="small" fill="var(--bs-body-color)" font-size="11">{{ b.name }}</text>\r
                  <text [attr.x]="20" [attr.y]="194 - barHeight(b.value)" text-anchor="middle" fill="var(--bs-body-color)" font-size="11" font-weight="600">{{ b.value }}</text>\r
                </g>\r
              }\r
            </g>\r
          </svg>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-12 col-lg-4">\r
      <div class="card">\r
        <div class="card-header">\r
          <h6 class="mb-0">Subsidios Activos</h6>\r
          <small class="text-body-secondary">Distribuci\xF3n por programa</small>\r
        </div>\r
        <div class="card-body d-flex flex-column align-items-center gap-3">\r
          <div class="rounded-circle flex-shrink-0" [style.width.px]="160" [style.height.px]="160" [style.background]="pieChartBackground"></div>\r
          <div class="d-flex flex-wrap gap-3 justify-content-center">\r
            @for (p of pieData; track p.name) {\r
              <div class="d-flex align-items-center gap-2">\r
                <span class="rounded-circle d-inline-block flex-shrink-0" [style.width.px]="10" [style.height.px]="10" [style.background]="p.color"></span>\r
                <span class="small text-body-secondary">{{ p.name }} ({{ p.value }}%)</span>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="card">\r
    <div class="card-header d-flex align-items-center gap-2">\r
      <i class="bi bi-exclamation-triangle text-warning"></i>\r
      <h6 class="mb-0">Alertas de Prioridad IA</h6>\r
    </div>\r
    <div class="card-body">\r
      <p class="small text-body-secondary mb-3">Documentos que vencen en menos de 15 d\xEDas detectados autom\xE1ticamente</p>\r
      <div class="d-flex flex-column gap-3">\r
        @for (a of alerts; track a.rut + a.document) {\r
          <div class="border rounded p-3 d-flex flex-column flex-sm-row flex-wrap align-items-sm-center justify-content-between gap-2">\r
            <div>\r
              <span class="fw-medium me-2">{{ a.beneficiary }}</span>\r
              <span class="badge" [class.bg-danger]="a.severity === 'critical'" [class.bg-warning]="a.severity === 'warning'">\r
                {{ a.severity === 'critical' ? 'Cr\xEDtico' : 'Alerta' }}\r
              </span>\r
              <div class="small text-body-secondary font-monospace">{{ a.rut }}</div>\r
            </div>\r
            <div class="small">\r
              <div>{{ a.document }}</div>\r
              <div class="text-body-secondary">{{ a.committee }}</div>\r
            </div>\r
            <div class="d-flex align-items-center gap-2">\r
              <i class="bi bi-clock text-body-secondary"></i>\r
              <span class="fw-medium" [class.text-danger]="a.daysLeft <= 5" [class.text-warning]="a.daysLeft > 5">{{ a.daysLeft }} d\xEDas</span>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/features/dashboard/dashboard.component.ts", lineNumber: 40 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-DE5KUWRT.js.map
