import {
  DashboardService
} from "./chunk-FTRQW7YH.js";
import "./chunk-FCVQJ543.js";
import "./chunk-OKFAIESM.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
} from "./chunk-OHDET2P6.js";

// src/app/features/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.title;
var _forTrack1 = ($index, $item) => $item.name;
var _forTrack2 = ($index, $item) => $item.rut + $item.document;
function DashboardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1);
    \u0275\u0275domElement(1, "div", 2);
    \u0275\u0275domElementStart(2, "p", 3);
    \u0275\u0275text(3, "Cargando dashboard...");
    \u0275\u0275domElementEnd()();
  }
}
function DashboardComponent_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "div", 25)(2, "div", 12)(3, "div", 26)(4, "span", 27);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "span", 28);
    \u0275\u0275domElement(7, "i");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 29);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "p", 30);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "small", 31);
    \u0275\u0275domElement(13, "i", 32);
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
function DashboardComponent_Conditional_2_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g");
    \u0275\u0275domElement(1, "rect", 33);
    \u0275\u0275domElementStart(2, "text", 34);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "text", 35);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const b_r2 = ctx.$implicit;
    const \u0275$index_61_r3 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("transform", "translate(" + \u0275$index_61_r3 * 72 + ", 0)");
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
function DashboardComponent_Conditional_2_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 19);
    \u0275\u0275domElement(1, "span", 36);
    \u0275\u0275domElementStart(2, "span", 37);
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
function DashboardComponent_Conditional_2_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 24)(1, "div")(2, "span", 38);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span", 39);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "div", 40);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 41)(9, "div");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "div", 11);
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(13, "div", 19);
    \u0275\u0275domElement(14, "i", 42);
    \u0275\u0275domElementStart(15, "span", 43);
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const a_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r6.beneficiary);
    \u0275\u0275advance();
    \u0275\u0275classProp("badge-cerrada", a_r6.severity === "critical")("badge-borrador", a_r6.severity === "warning");
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
function DashboardComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275repeaterCreate(1, DashboardComponent_Conditional_2_For_2_Template, 15, 7, "div", 5, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 6)(4, "div", 7)(5, "div", 8)(6, "div", 9)(7, "h6", 10);
    \u0275\u0275text(8, "Estado de Carpetas");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "small", 11);
    \u0275\u0275text(10, "Distribuci\xF3n por estado de avance");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "div", 12);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(12, "svg", 13)(13, "g", 14);
    \u0275\u0275repeaterCreate(14, DashboardComponent_Conditional_2_For_15_Template, 6, 10, ":svg:g", null, _forTrack1);
    \u0275\u0275domElementEnd()()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(16, "div", 15)(17, "div", 8)(18, "div", 9)(19, "h6", 10);
    \u0275\u0275text(20, "Subsidios Activos");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(21, "small", 11);
    \u0275\u0275text(22, "Distribuci\xF3n por programa");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(23, "div", 16);
    \u0275\u0275domElement(24, "div", 17);
    \u0275\u0275domElementStart(25, "div", 18);
    \u0275\u0275repeaterCreate(26, DashboardComponent_Conditional_2_For_27_Template, 4, 8, "div", 19, _forTrack1);
    \u0275\u0275domElementEnd()()()()();
    \u0275\u0275domElementStart(28, "div", 8)(29, "div", 20);
    \u0275\u0275domElement(30, "i", 21);
    \u0275\u0275domElementStart(31, "h6", 10);
    \u0275\u0275text(32, "Alertas de Prioridad IA");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(33, "div", 12)(34, "p", 22);
    \u0275\u0275text(35, "Documentos que vencen en menos de 15 d\xEDas detectados autom\xE1ticamente");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(36, "div", 23);
    \u0275\u0275repeaterCreate(37, DashboardComponent_Conditional_2_For_38_Template, 17, 14, "div", 24, _forTrack2);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.metrics);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r3.barData);
    \u0275\u0275advance(10);
    \u0275\u0275styleProp("width", 160, "px")("height", 160, "px")("background", ctx_r3.pieChartBackground);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.pieData);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r3.alerts);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(dashboardService) {
    this.dashboardService = dashboardService;
    this.metrics = [];
    this.barData = [];
    this.pieData = [];
    this.alerts = [];
    this.loading = true;
  }
  ngOnInit() {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.metrics = data.metrics;
        this.barData = data.barData;
        this.pieData = data.pieData;
        this.alerts = data.alerts;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
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
      return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(DashboardService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 3, vars: 1, consts: [[1, "d-flex", "flex-column", "gap-4"], [1, "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "small", "text-body-secondary", "mt-2", "mb-0"], [1, "row", "g-3"], [1, "col-12", "col-sm-6", "col-lg-3"], [1, "row", "g-4"], [1, "col-12", "col-lg-8"], [1, "card"], [1, "card-header"], [1, "mb-0"], [1, "text-body-secondary"], [1, "card-body"], ["width", "100%", "height", "256", "viewBox", "0 0 400 220", 1, "d-block", 2, "max-width", "100%"], ["transform", "translate(40, 20)"], [1, "col-12", "col-lg-4"], [1, "card-body", "d-flex", "flex-column", "align-items-center", "gap-3"], [1, "rounded-circle", "flex-shrink-0"], [1, "d-flex", "flex-wrap", "gap-3", "justify-content-center"], [1, "d-flex", "align-items-center", "gap-2"], [1, "card-header", "d-flex", "align-items-center", "gap-2"], [1, "bi", "bi-exclamation-triangle", "text-warning"], [1, "small", "text-body-secondary", "mb-3"], [1, "d-flex", "flex-column", "gap-3"], [1, "border", "rounded", "p-3", "d-flex", "flex-column", "flex-sm-row", "flex-wrap", "align-items-sm-center", "justify-content-between", "gap-2"], [1, "card", "h-100"], [1, "d-flex", "justify-content-between", "align-items-start", "mb-2"], [1, "small", "fw-medium", "text-body-secondary"], [1, "rounded", "p-2", "bg-primary", "bg-opacity-10"], [1, "fs-4", "fw-bold"], [1, "small", "text-body-secondary", "mb-1"], [1, "text-success"], [1, "bi", "bi-graph-up-arrow", "me-1"], ["rx", "4", "ry", "0"], ["x", "20", "y", "210", "text-anchor", "middle", "fill", "var(--bs-body-color)", "font-size", "11", 1, "small"], ["text-anchor", "middle", "fill", "var(--bs-body-color)", "font-size", "11", "font-weight", "600"], [1, "rounded-circle", "d-inline-block", "flex-shrink-0"], [1, "small", "text-body-secondary"], [1, "fw-medium", "me-2"], [1, "badge"], [1, "small", "text-body-secondary", "font-monospace"], [1, "small"], [1, "bi", "bi-clock", "text-body-secondary"], [1, "fw-medium"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275conditionalCreate(1, DashboardComponent_Conditional_1_Template, 4, 0, "div", 1)(2, DashboardComponent_Conditional_2_Template, 39, 6);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 1 : 2);
      }
    }, dependencies: [CommonModule], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [CommonModule], template: `<div class="d-flex flex-column gap-4">\r
  @if (loading) {\r
    <div class="text-center py-5">\r
      <div class="spinner-border text-primary" role="status"></div>\r
      <p class="small text-body-secondary mt-2 mb-0">Cargando dashboard...</p>\r
    </div>\r
  } @else {\r
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
              <span class="badge" [class.badge-cerrada]="a.severity === 'critical'" [class.badge-borrador]="a.severity === 'warning'">\r
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
  }\r
</div>\r
` }]
  }], () => [{ type: DashboardService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/features/dashboard/dashboard.component.ts", lineNumber: 12 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-XR2TGQNN.js.map
