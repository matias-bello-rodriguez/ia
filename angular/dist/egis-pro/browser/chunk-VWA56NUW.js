import {
  NotificacionesService
} from "./chunk-FTRQW7YH.js";
import "./chunk-FCVQJ543.js";
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
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-OHDET2P6.js";

// src/app/features/notificaciones/notificaciones.component.ts
var _forTrack0 = ($index, $item) => $item.id ?? $item.rut;
function NotificacionesComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1);
    \u0275\u0275domElement(1, "div", 3);
    \u0275\u0275domElementStart(2, "p", 4);
    \u0275\u0275text(3, "Cargando contactos...");
    \u0275\u0275domElementEnd()();
  }
}
function NotificacionesComponent_Conditional_2_For_10_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const doc_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(doc_r4);
  }
}
function NotificacionesComponent_Conditional_2_For_10_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "i", 25);
  }
}
function NotificacionesComponent_Conditional_2_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 13);
    \u0275\u0275domListener("click", function NotificacionesComponent_Conditional_2_For_10_Template_button_click_0_listener() {
      const \u0275$index_28_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectedIndex = \u0275$index_28_r2);
    });
    \u0275\u0275domElementStart(1, "div", 14)(2, "span", 15);
    \u0275\u0275domElement(3, "i", 16);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(4, "span", 17);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 18)(6, "div", 19);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 20);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "div", 21);
    \u0275\u0275repeaterCreate(11, NotificacionesComponent_Conditional_2_For_10_For_12_Template, 2, 1, "span", 22, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "div", 23);
    \u0275\u0275domElement(14, "i", 24);
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(16, NotificacionesComponent_Conditional_2_For_10_Conditional_16_Template, 1, 0, "i", 25);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const \u0275$index_28_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("border-primary", ctx_r2.selectedIndex === \u0275$index_28_r2)("bg-primary", ctx_r2.selectedIndex === \u0275$index_28_r2)("bg-opacity-10", ctx_r2.selectedIndex === \u0275$index_28_r2);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("bg-danger", c_r5.urgency === "critical")("bg-warning", c_r5.urgency === "warning");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.committee);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(c_r5.missing);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(c_r5.lastContact);
    \u0275\u0275advance();
    \u0275\u0275conditional(c_r5.id != null && ctx_r2.sentMessages.has(c_r5.id) ? 16 : -1);
  }
}
function NotificacionesComponent_Conditional_2_Conditional_12_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 37);
    \u0275\u0275domElement(1, "i", 41);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const doc_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(doc_r7);
  }
}
function NotificacionesComponent_Conditional_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 6)(1, "div", 26)(2, "div")(3, "span", 27);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "span", 28);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "div", 23);
    \u0275\u0275domElement(8, "i", 29);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(10, "div", 30)(11, "div", 31)(12, "div", 32);
    \u0275\u0275domElement(13, "i", 33);
    \u0275\u0275text(14, " Mensaje generado por IA");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "p", 34);
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(17, "div", 35)(18, "h6", 32);
    \u0275\u0275text(19, "Documentos solicitados:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(20, "div", 36);
    \u0275\u0275repeaterCreate(21, NotificacionesComponent_Conditional_2_Conditional_12_For_22_Template, 3, 1, "span", 37, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElement(23, "hr");
    \u0275\u0275domElementStart(24, "div", 38)(25, "span", 20);
    \u0275\u0275text(26, "Enviar por WhatsApp / SMS");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(27, "button", 39);
    \u0275\u0275domListener("click", function NotificacionesComponent_Conditional_2_Conditional_12_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selected && ctx_r2.enviar(ctx_r2.selected));
    });
    \u0275\u0275domElement(28, "i", 40);
    \u0275\u0275text(29, " Enviar ");
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.selected.name);
    \u0275\u0275advance();
    \u0275\u0275classProp("badge-cerrada", ctx_r2.selected.urgency === "critical")("badge-borrador", ctx_r2.selected.urgency === "warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selected.urgency === "critical" ? "Urgente" : "Pendiente", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.selected.phone);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.message(ctx_r2.selected));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.selected.missing);
    \u0275\u0275advance(6);
    \u0275\u0275domProperty("disabled", ctx_r2.selected && ctx_r2.selected.id != null && ctx_r2.sentMessages.has(ctx_r2.selected.id));
  }
}
function NotificacionesComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 2)(1, "div", 5)(2, "div", 6)(3, "div", 7)(4, "h6", 8);
    \u0275\u0275text(5, "Contactos Pendientes");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "small", 9);
    \u0275\u0275text(7, "Beneficiarios con documentos faltantes");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 10);
    \u0275\u0275repeaterCreate(9, NotificacionesComponent_Conditional_2_For_10_Template, 17, 14, "button", 11, _forTrack0);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(11, "div", 12);
    \u0275\u0275conditionalCreate(12, NotificacionesComponent_Conditional_2_Conditional_12_Template, 30, 9, "div", 6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r2.contacts);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.selected ? 12 : -1);
  }
}
var NotificacionesComponent = class _NotificacionesComponent {
  constructor(notificacionesService) {
    this.notificacionesService = notificacionesService;
    this.contacts = [];
    this.selectedIndex = 0;
    this.sentMessages = /* @__PURE__ */ new Set();
    this.loading = true;
  }
  ngOnInit() {
    this.notificacionesService.getContactosPendientes().subscribe({
      next: (list) => {
        this.contacts = list;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  get selected() {
    return this.contacts[this.selectedIndex] ?? null;
  }
  message(contact) {
    const docList = contact.missing.join(" y ");
    const firstName = contact.name.split(" ")[0];
    return `Hola ${firstName}, para no perder su subsidio de vivienda, necesitamos que nos env\xEDe una foto de su ${docList} vigente lo antes posible. Puede responder a este mensaje con la foto o acercarse a nuestra oficina. Cualquier duda estamos para ayudarle.`;
  }
  enviar(contact) {
    const id = contact.id;
    if (id == null)
      return;
    this.notificacionesService.marcarEnviado(id).subscribe({
      next: () => {
        this.sentMessages = new Set(this.sentMessages).add(id);
      }
    });
  }
  static {
    this.\u0275fac = function NotificacionesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificacionesComponent)(\u0275\u0275directiveInject(NotificacionesService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificacionesComponent, selectors: [["app-notificaciones"]], decls: 3, vars: 1, consts: [[1, "d-flex", "flex-column", "gap-4"], [1, "text-center", "py-5"], [1, "row", "g-4"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "small", "text-body-secondary", "mt-2", "mb-0"], [1, "col-12", "col-lg-4"], [1, "card"], [1, "card-header"], [1, "mb-0"], [1, "text-body-secondary"], [1, "card-body", "p-2"], ["type", "button", 1, "btn", "btn-light", "w-100", "text-start", "d-flex", "align-items-start", "gap-2", "p-3", "mb-2", "rounded", "border", 3, "border-primary", "bg-primary", "bg-opacity-10"], [1, "col-12", "col-lg-8"], ["type", "button", 1, "btn", "btn-light", "w-100", "text-start", "d-flex", "align-items-start", "gap-2", "p-3", "mb-2", "rounded", "border", 3, "click"], [1, "position-relative"], [1, "rounded-circle", "bg-secondary", "bg-opacity-25", "d-inline-flex", "align-items-center", "justify-content-center", 2, "width", "40px", "height", "40px"], [1, "bi", "bi-person", "text-body-secondary"], [1, "position-absolute", "top-0", "start-100", "translate-middle", "rounded-circle", "border", "border-2", "border-white", 2, "width", "12px", "height", "12px"], [1, "flex-grow-1", "min-w-0"], [1, "fw-medium", "text-truncate"], [1, "small", "text-body-secondary"], [1, "d-flex", "flex-wrap", "gap-1", "mt-1"], [1, "badge", "bg-danger", "bg-opacity-10", "text-danger", "small"], [1, "small", "text-body-secondary", "mt-1"], [1, "bi", "bi-clock", "me-1"], [1, "bi", "bi-check-circle-fill", "text-success"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center", "flex-wrap", "gap-2"], [1, "fw-medium"], [1, "badge", "ms-2"], [1, "bi", "bi-telephone", "me-1"], [1, "card-body"], [1, "rounded", "p-3", "bg-success", "bg-opacity-10", "border", "border-success", "border-opacity-25", "mb-3"], [1, "small", "text-body-secondary", "mb-2"], [1, "bi", "bi-stars", "text-primary", "me-1"], [1, "small", "mb-0"], [1, "mb-3"], [1, "d-flex", "flex-wrap", "gap-2"], [1, "badge", "bg-danger"], [1, "d-flex", "justify-content-between", "align-items-center"], ["type", "button", 1, "btn", "btn-primary-otic", "btn-auto-width", 3, "click", "disabled"], [1, "bi", "bi-send", "me-1"], [1, "bi", "bi-exclamation-circle", "me-1"]], template: function NotificacionesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275conditionalCreate(1, NotificacionesComponent_Conditional_1_Template, 4, 0, "div", 1)(2, NotificacionesComponent_Conditional_2_Template, 13, 1, "div", 2);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificacionesComponent, [{
    type: Component,
    args: [{ selector: "app-notificaciones", standalone: true, imports: [CommonModule], template: `<div class="d-flex flex-column gap-4">
  @if (loading) {
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="small text-body-secondary mt-2 mb-0">Cargando contactos...</p>
    </div>
  } @else {
  <div class="row g-4">
    <div class="col-12 col-lg-4">
      <div class="card">
        <div class="card-header">
          <h6 class="mb-0">Contactos Pendientes</h6>
          <small class="text-body-secondary">Beneficiarios con documentos faltantes</small>
        </div>
        <div class="card-body p-2">
          @for (c of contacts; track c.id ?? c.rut; let i = $index) {
            <button type="button" class="btn btn-light w-100 text-start d-flex align-items-start gap-2 p-3 mb-2 rounded border" [class.border-primary]="selectedIndex === i" [class.bg-primary]="selectedIndex === i" [class.bg-opacity-10]="selectedIndex === i" (click)="selectedIndex = i">
              <div class="position-relative">
                <span class="rounded-circle bg-secondary bg-opacity-25 d-inline-flex align-items-center justify-content-center" style="width: 40px; height: 40px;"><i class="bi bi-person text-body-secondary"></i></span>
                <span class="position-absolute top-0 start-100 translate-middle rounded-circle border border-2 border-white" [class.bg-danger]="c.urgency === 'critical'" [class.bg-warning]="c.urgency === 'warning'" style="width: 12px; height: 12px;"></span>
              </div>
              <div class="flex-grow-1 min-w-0">
                <div class="fw-medium text-truncate">{{ c.name }}</div>
                <div class="small text-body-secondary">{{ c.committee }}</div>
                <div class="d-flex flex-wrap gap-1 mt-1">
                  @for (doc of c.missing; track doc) {
                    <span class="badge bg-danger bg-opacity-10 text-danger small">{{ doc }}</span>
                  }
                </div>
                <div class="small text-body-secondary mt-1"><i class="bi bi-clock me-1"></i>{{ c.lastContact }}</div>
              </div>
              @if (c.id != null && sentMessages.has(c.id)) {
                <i class="bi bi-check-circle-fill text-success"></i>
              }
            </button>
          }
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-8">
      @if (selected) {
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <span class="fw-medium">{{ selected.name }}</span>
              <span class="badge ms-2" [class.badge-cerrada]="selected.urgency === 'critical'" [class.badge-borrador]="selected.urgency === 'warning'">
                {{ selected.urgency === 'critical' ? 'Urgente' : 'Pendiente' }}
              </span>
              <div class="small text-body-secondary mt-1"><i class="bi bi-telephone me-1"></i>{{ selected.phone }}</div>
            </div>
          </div>
          <div class="card-body">
            <div class="rounded p-3 bg-success bg-opacity-10 border border-success border-opacity-25 mb-3">
              <div class="small text-body-secondary mb-2"><i class="bi bi-stars text-primary me-1"></i> Mensaje generado por IA</div>
              <p class="small mb-0">{{ message(selected) }}</p>
            </div>
            <div class="mb-3">
              <h6 class="small text-body-secondary mb-2">Documentos solicitados:</h6>
              <div class="d-flex flex-wrap gap-2">
                @for (doc of selected.missing; track doc) {
                  <span class="badge bg-danger"><i class="bi bi-exclamation-circle me-1"></i>{{ doc }}</span>
                }
              </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
              <span class="small text-body-secondary">Enviar por WhatsApp / SMS</span>
              <button type="button" class="btn btn-primary-otic btn-auto-width" (click)="selected && enviar(selected)" [disabled]="selected && selected.id != null && sentMessages.has(selected.id)">
                <i class="bi bi-send me-1"></i> Enviar
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  </div>
  }
</div>
` }]
  }], () => [{ type: NotificacionesService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificacionesComponent, { className: "NotificacionesComponent", filePath: "src/app/features/notificaciones/notificaciones.component.ts", lineNumber: 12 });
})();
export {
  NotificacionesComponent
};
//# sourceMappingURL=chunk-VWA56NUW.js.map
