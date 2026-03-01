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
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
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
} from "./chunk-7OUYEERV.js";

// src/app/features/notificaciones/notificaciones.component.ts
var _forTrack0 = ($index, $item) => $item.rut;
function NotificacionesComponent_For_11_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const doc_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(doc_r4);
  }
}
function NotificacionesComponent_For_11_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "i", 22);
  }
}
function NotificacionesComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 10);
    \u0275\u0275domListener("click", function NotificacionesComponent_For_11_Template_button_click_0_listener() {
      const \u0275$index_19_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedIndex = \u0275$index_19_r2);
    });
    \u0275\u0275domElementStart(1, "div", 11)(2, "span", 12);
    \u0275\u0275domElement(3, "i", 13);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(4, "span", 14);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 15)(6, "div", 16);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 17);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "div", 18);
    \u0275\u0275repeaterCreate(11, NotificacionesComponent_For_11_For_12_Template, 2, 1, "span", 19, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "div", 20);
    \u0275\u0275domElement(14, "i", 21);
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(16, NotificacionesComponent_For_11_Conditional_16_Template, 1, 0, "i", 22);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const \u0275$index_19_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("border-primary", ctx_r2.selectedIndex === \u0275$index_19_r2)("bg-primary", ctx_r2.selectedIndex === \u0275$index_19_r2)("bg-opacity-10", ctx_r2.selectedIndex === \u0275$index_19_r2);
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
    \u0275\u0275conditional(ctx_r2.sentMessages.has(\u0275$index_19_r2) ? 16 : -1);
  }
}
function NotificacionesComponent_Conditional_13_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 34);
    \u0275\u0275domElement(1, "i", 38);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const doc_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(doc_r7);
  }
}
function NotificacionesComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 3)(1, "div", 23)(2, "div")(3, "span", 24);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "span", 25);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "div", 20);
    \u0275\u0275domElement(8, "i", 26);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(10, "div", 27)(11, "div", 28)(12, "div", 29);
    \u0275\u0275domElement(13, "i", 30);
    \u0275\u0275text(14, " Mensaje generado por IA");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "p", 31);
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(17, "div", 32)(18, "h6", 29);
    \u0275\u0275text(19, "Documentos solicitados:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(20, "div", 33);
    \u0275\u0275repeaterCreate(21, NotificacionesComponent_Conditional_13_For_22_Template, 3, 1, "span", 34, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElement(23, "hr");
    \u0275\u0275domElementStart(24, "div", 35)(25, "span", 17);
    \u0275\u0275text(26, "Enviar por WhatsApp / SMS");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(27, "button", 36);
    \u0275\u0275domListener("click", function NotificacionesComponent_Conditional_13_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.enviar(ctx_r2.selectedIndex));
    });
    \u0275\u0275domElement(28, "i", 37);
    \u0275\u0275text(29, " Enviar ");
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.selected.name);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-danger", ctx_r2.selected.urgency === "critical")("bg-warning", ctx_r2.selected.urgency === "warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selected.urgency === "critical" ? "Urgente" : "Pendiente", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.selected.phone);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.message(ctx_r2.selected));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.selected.missing);
  }
}
var CONTACTS = [
  { name: "Maria Gonzalez Soto", rut: "12.345.678-9", phone: "+56 9 1234 5678", missing: ["Carnet Identidad"], urgency: "critical", lastContact: "Hace 3 d\xEDas", committee: "Villa Esperanza" },
  { name: "Pedro Ramirez Lagos", rut: "11.222.333-4", phone: "+56 9 8765 4321", missing: ["Certificado RSH"], urgency: "warning", lastContact: "Hace 1 semana", committee: "Poblaci\xF3n Aurora" },
  { name: "Ana Mu\xF1oz Vera", rut: "15.678.901-2", phone: "+56 9 5555 1234", missing: ["Dominio Vigente", "Cartola Ahorro"], urgency: "critical", lastContact: "Nunca contactado", committee: "Comit\xE9 Los Aromos" },
  { name: "Luisa Torres Pino", rut: "14.567.890-K", phone: "+56 9 4444 5678", missing: ["Dominio Vigente"], urgency: "warning", lastContact: "Hace 2 d\xEDas", committee: "Poblaci\xF3n Aurora" }
];
var NotificacionesComponent = class _NotificacionesComponent {
  constructor() {
    this.contacts = CONTACTS;
    this.selectedIndex = 0;
    this.sentMessages = /* @__PURE__ */ new Set();
  }
  get selected() {
    return this.contacts[this.selectedIndex];
  }
  message(contact) {
    const docList = contact.missing.join(" y ");
    const firstName = contact.name.split(" ")[0];
    return `Hola ${firstName}, para no perder su subsidio de vivienda, necesitamos que nos env\xEDe una foto de su ${docList} vigente lo antes posible. Puede responder a este mensaje con la foto o acercarse a nuestra oficina. Cualquier duda estamos para ayudarle.`;
  }
  enviar(index) {
    this.sentMessages = new Set(this.sentMessages).add(index);
  }
  static {
    this.\u0275fac = function NotificacionesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificacionesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificacionesComponent, selectors: [["app-notificaciones"]], decls: 14, vars: 1, consts: [[1, "d-flex", "flex-column", "gap-4"], [1, "row", "g-4"], [1, "col-12", "col-lg-4"], [1, "card"], [1, "card-header"], [1, "mb-0"], [1, "text-body-secondary"], [1, "card-body", "p-2"], ["type", "button", 1, "btn", "btn-light", "w-100", "text-start", "d-flex", "align-items-start", "gap-2", "p-3", "mb-2", "rounded", "border", 3, "border-primary", "bg-primary", "bg-opacity-10"], [1, "col-12", "col-lg-8"], ["type", "button", 1, "btn", "btn-light", "w-100", "text-start", "d-flex", "align-items-start", "gap-2", "p-3", "mb-2", "rounded", "border", 3, "click"], [1, "position-relative"], [1, "rounded-circle", "bg-secondary", "bg-opacity-25", "d-inline-flex", "align-items-center", "justify-content-center", 2, "width", "40px", "height", "40px"], [1, "bi", "bi-person", "text-body-secondary"], [1, "position-absolute", "top-0", "start-100", "translate-middle", "rounded-circle", "border", "border-2", "border-white", 2, "width", "12px", "height", "12px"], [1, "flex-grow-1", "min-w-0"], [1, "fw-medium", "text-truncate"], [1, "small", "text-body-secondary"], [1, "d-flex", "flex-wrap", "gap-1", "mt-1"], [1, "badge", "bg-danger", "bg-opacity-10", "text-danger", "small"], [1, "small", "text-body-secondary", "mt-1"], [1, "bi", "bi-clock", "me-1"], [1, "bi", "bi-check-circle-fill", "text-success"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center", "flex-wrap", "gap-2"], [1, "fw-medium"], [1, "badge", "ms-2"], [1, "bi", "bi-telephone", "me-1"], [1, "card-body"], [1, "rounded", "p-3", "bg-success", "bg-opacity-10", "border", "border-success", "border-opacity-25", "mb-3"], [1, "small", "text-body-secondary", "mb-2"], [1, "bi", "bi-stars", "text-primary", "me-1"], [1, "small", "mb-0"], [1, "mb-3"], [1, "d-flex", "flex-wrap", "gap-2"], [1, "badge", "bg-danger"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "bi", "bi-send", "me-1"], [1, "bi", "bi-exclamation-circle", "me-1"]], template: function NotificacionesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h6", 5);
        \u0275\u0275text(6, "Contactos Pendientes");
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(7, "small", 6);
        \u0275\u0275text(8, "Beneficiarios con documentos faltantes");
        \u0275\u0275domElementEnd()();
        \u0275\u0275domElementStart(9, "div", 7);
        \u0275\u0275repeaterCreate(10, NotificacionesComponent_For_11_Template, 17, 14, "button", 8, _forTrack0);
        \u0275\u0275domElementEnd()()();
        \u0275\u0275domElementStart(12, "div", 9);
        \u0275\u0275conditionalCreate(13, NotificacionesComponent_Conditional_13_Template, 30, 8, "div", 3);
        \u0275\u0275domElementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.contacts);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.selected ? 13 : -1);
      }
    }, dependencies: [CommonModule], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificacionesComponent, [{
    type: Component,
    args: [{ selector: "app-notificaciones", standalone: true, imports: [CommonModule], template: `<div class="d-flex flex-column gap-4">
  <div class="row g-4">
    <div class="col-12 col-lg-4">
      <div class="card">
        <div class="card-header">
          <h6 class="mb-0">Contactos Pendientes</h6>
          <small class="text-body-secondary">Beneficiarios con documentos faltantes</small>
        </div>
        <div class="card-body p-2">
          @for (c of contacts; track c.rut; let i = $index) {
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
              @if (sentMessages.has(i)) {
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
              <span class="badge ms-2" [class.bg-danger]="selected.urgency === 'critical'" [class.bg-warning]="selected.urgency === 'warning'">
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
              <button class="btn btn-primary btn-sm" (click)="enviar(selectedIndex)">
                <i class="bi bi-send me-1"></i> Enviar
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificacionesComponent, { className: "NotificacionesComponent", filePath: "src/app/features/notificaciones/notificaciones.component.ts", lineNumber: 27 });
})();
export {
  NotificacionesComponent
};
//# sourceMappingURL=chunk-ZZ5Z35OD.js.map
