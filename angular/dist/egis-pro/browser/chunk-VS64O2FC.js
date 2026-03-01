import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-3EQANIPA.js";
import {
  CommonModule,
  Component,
  filter,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-7OUYEERV.js";

// src/app/core/layout/layout.component.ts
var _c0 = () => ({ exact: true });
var MODULE_TITLES = {
  dashboard: { title: "Dashboard Global", description: "Visi\xF3n general del estado de la EGIS" },
  comites: { title: "Comit\xE9s y Fichas T\xE9cnicas", description: "Gesti\xF3n de proyectos y beneficiarios" },
  visado: { title: "Visado Inteligente OCR", description: "Validaci\xF3n de documentos con IA" },
  reportes: { title: "Reportes y Carpeta SERVIU", description: "Generaci\xF3n de informes y exportaci\xF3n" },
  notificaciones: { title: "Centro de Notificaciones", description: "Comunicaci\xF3n con beneficiarios" },
  configuracion: { title: "Configuraci\xF3n del Sistema", description: "Par\xE1metros y reglas de la IA" }
};
var LayoutComponent = class _LayoutComponent {
  constructor(router) {
    this.router = router;
    this.currentTitle = MODULE_TITLES["dashboard"].title;
    this.currentDescription = MODULE_TITLES["dashboard"].description;
  }
  ngOnInit() {
    this.updateTitleFromUrl(this.router.url);
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => this.updateTitleFromUrl(e.urlAfterRedirects));
  }
  updateTitleFromUrl(url) {
    const key = url.replace(/^\//, "").split("/")[0] || "dashboard";
    const info = MODULE_TITLES[key] ?? MODULE_TITLES["dashboard"];
    this.currentTitle = info.title;
    this.currentDescription = info.description;
  }
  onActivate() {
    this.updateTitleFromUrl(this.router.url);
  }
  static {
    this.\u0275fac = function LayoutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LayoutComponent)(\u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LayoutComponent, selectors: [["app-layout"]], decls: 74, vars: 4, consts: [[1, "d-flex"], [1, "sidebar-egis", "flex-shrink-0", "p-3", 2, "width", "16rem"], [1, "d-flex", "align-items-center", "gap-2", "mb-4", "px-2"], [1, "rounded", "bg-primary", "bg-opacity-25", "p-2"], [1, "bi", "bi-building", "text-primary"], [1, "fw-semibold", "text-white"], [1, "text-white-50"], [1, "border-secondary", "opacity-50"], [1, "nav", "flex-column", "small"], [1, "nav-item", "mb-1", "text-uppercase", "text-white-50", "fw-semibold", 2, "font-size", "10px", "letter-spacing", "0.05em"], [1, "nav-item"], ["routerLink", "/dashboard", "routerLinkActive", "active", 1, "nav-link", 3, "click", "routerLinkActiveOptions"], [1, "bi", "bi-grid-1x2"], [1, "nav-item", "mt-3", "mb-1", "text-uppercase", "text-white-50", "fw-semibold", 2, "font-size", "10px", "letter-spacing", "0.05em"], ["routerLink", "/comites", "routerLinkActive", "active", 1, "nav-link", 3, "click"], [1, "bi", "bi-geo-alt"], ["routerLink", "/visado", "routerLinkActive", "active", 1, "nav-link", 3, "click"], [1, "bi", "bi-upc-scan"], ["routerLink", "/reportes", "routerLinkActive", "active", 1, "nav-link", 3, "click"], [1, "bi", "bi-file-text"], ["routerLink", "/notificaciones", "routerLinkActive", "active", 1, "nav-link", 3, "click"], [1, "bi", "bi-chat-dots"], ["routerLink", "/configuracion", "routerLinkActive", "active", 1, "nav-link", 3, "click"], [1, "bi", "bi-gear"], [1, "border-secondary", "opacity-50", "mt-auto"], [1, "d-flex", "align-items-center", "gap-2", "px-2", "py-2"], [1, "rounded-circle", "bg-primary", "bg-opacity-25", "p-2"], [1, "bi", "bi-robot", "text-primary"], [1, "small", "fw-medium", "text-white"], [1, "small", "text-white-50"], [1, "ms-auto", "rounded-circle", "bg-success", 2, "width", "8px", "height", "8px"], [1, "flex-grow-1", "d-flex", "flex-column", "min-vh-100"], [1, "border-bottom", "bg-white", "px-4", "py-3", "d-flex", "align-items-center", "gap-3"], [1, "vr", "d-none", "d-md-block"], [1, "flex-grow-1"], [1, "h6", "fw-semibold", "mb-0", "text-body"], [1, "small", "text-body-secondary", "mb-0"], [1, "badge", "border", "text-primary", "d-none", "d-sm-inline-flex", "align-items-center", "gap-1"], [1, "bi", "bi-robot"], [1, "bi", "bi-stars"], [1, "flex-grow-1", "overflow-auto", "p-4"], [3, "activate"]], template: function LayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "i", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div")(6, "span", 5);
        \u0275\u0275text(7, "EGIS Pro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(8, "br");
        \u0275\u0275elementStart(9, "small", 6);
        \u0275\u0275text(10, "Gesti\xF3n Habitacional");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(11, "hr", 7);
        \u0275\u0275elementStart(12, "ul", 8)(13, "li", 9);
        \u0275\u0275text(14, "Control");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "li", 10)(16, "a", 11);
        \u0275\u0275listener("click", function LayoutComponent_Template_a_click_16_listener() {
          return ctx.onActivate();
        });
        \u0275\u0275element(17, "i", 12);
        \u0275\u0275text(18, " Dashboard Global ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "li", 13);
        \u0275\u0275text(20, "Operativo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "li", 10)(22, "a", 14);
        \u0275\u0275listener("click", function LayoutComponent_Template_a_click_22_listener() {
          return ctx.onActivate();
        });
        \u0275\u0275element(23, "i", 15);
        \u0275\u0275text(24, " Comit\xE9s y Fichas ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "li", 13);
        \u0275\u0275text(26, "Visado IA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "li", 10)(28, "a", 16);
        \u0275\u0275listener("click", function LayoutComponent_Template_a_click_28_listener() {
          return ctx.onActivate();
        });
        \u0275\u0275element(29, "i", 17);
        \u0275\u0275text(30, " Visado Inteligente ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "li", 13);
        \u0275\u0275text(32, "Cierre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "li", 10)(34, "a", 18);
        \u0275\u0275listener("click", function LayoutComponent_Template_a_click_34_listener() {
          return ctx.onActivate();
        });
        \u0275\u0275element(35, "i", 19);
        \u0275\u0275text(36, " Reportes y SERVIU ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "li", 13);
        \u0275\u0275text(38, "Comunicaci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "li", 10)(40, "a", 20);
        \u0275\u0275listener("click", function LayoutComponent_Template_a_click_40_listener() {
          return ctx.onActivate();
        });
        \u0275\u0275element(41, "i", 21);
        \u0275\u0275text(42, " Notificaciones ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "li", 13);
        \u0275\u0275text(44, "Sistema");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "li", 10)(46, "a", 22);
        \u0275\u0275listener("click", function LayoutComponent_Template_a_click_46_listener() {
          return ctx.onActivate();
        });
        \u0275\u0275element(47, "i", 23);
        \u0275\u0275text(48, " Configuraci\xF3n ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(49, "hr", 24);
        \u0275\u0275elementStart(50, "div", 25)(51, "div", 26);
        \u0275\u0275element(52, "i", 27);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "div")(54, "span", 28);
        \u0275\u0275text(55, "Asistente IA");
        \u0275\u0275elementEnd();
        \u0275\u0275element(56, "br");
        \u0275\u0275elementStart(57, "span", 29);
        \u0275\u0275text(58, "Activo");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(59, "span", 30);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(60, "div", 31)(61, "header", 32);
        \u0275\u0275element(62, "div", 33);
        \u0275\u0275elementStart(63, "div", 34)(64, "h1", 35);
        \u0275\u0275text(65);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "p", 36);
        \u0275\u0275text(67);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(68, "span", 37);
        \u0275\u0275element(69, "i", 38);
        \u0275\u0275text(70, " IA Activa ");
        \u0275\u0275element(71, "i", 39);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(72, "main", 40)(73, "router-outlet", 41);
        \u0275\u0275listener("activate", function LayoutComponent_Template_router_outlet_activate_73_listener() {
          return ctx.onActivate();
        });
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(16);
        \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(3, _c0));
        \u0275\u0275advance(49);
        \u0275\u0275textInterpolate(ctx.currentTitle);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.currentDescription);
      }
    }, dependencies: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutComponent, [{
    type: Component,
    args: [{ selector: "app-layout", standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet], template: '<div class="d-flex">\r\n  <!-- Sidebar -->\r\n  <nav class="sidebar-egis flex-shrink-0 p-3" style="width: 16rem;">\r\n    <div class="d-flex align-items-center gap-2 mb-4 px-2">\r\n      <div class="rounded bg-primary bg-opacity-25 p-2">\r\n        <i class="bi bi-building text-primary"></i>\r\n      </div>\r\n      <div>\r\n        <span class="fw-semibold text-white">EGIS Pro</span>\r\n        <br>\r\n        <small class="text-white-50">Gesti\xF3n Habitacional</small>\r\n      </div>\r\n    </div>\r\n    <hr class="border-secondary opacity-50">\r\n\r\n    <ul class="nav flex-column small">\r\n      <li class="nav-item mb-1 text-uppercase text-white-50 fw-semibold" style="font-size: 10px; letter-spacing: 0.05em;">Control</li>\r\n      <li class="nav-item">\r\n        <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link" (click)="onActivate()">\r\n          <i class="bi bi-grid-1x2"></i> Dashboard Global\r\n        </a>\r\n      </li>\r\n\r\n      <li class="nav-item mt-3 mb-1 text-uppercase text-white-50 fw-semibold" style="font-size: 10px; letter-spacing: 0.05em;">Operativo</li>\r\n      <li class="nav-item">\r\n        <a routerLink="/comites" routerLinkActive="active" class="nav-link" (click)="onActivate()">\r\n          <i class="bi bi-geo-alt"></i> Comit\xE9s y Fichas\r\n        </a>\r\n      </li>\r\n\r\n      <li class="nav-item mt-3 mb-1 text-uppercase text-white-50 fw-semibold" style="font-size: 10px; letter-spacing: 0.05em;">Visado IA</li>\r\n      <li class="nav-item">\r\n        <a routerLink="/visado" routerLinkActive="active" class="nav-link" (click)="onActivate()">\r\n          <i class="bi bi-upc-scan"></i> Visado Inteligente\r\n        </a>\r\n      </li>\r\n\r\n      <li class="nav-item mt-3 mb-1 text-uppercase text-white-50 fw-semibold" style="font-size: 10px; letter-spacing: 0.05em;">Cierre</li>\r\n      <li class="nav-item">\r\n        <a routerLink="/reportes" routerLinkActive="active" class="nav-link" (click)="onActivate()">\r\n          <i class="bi bi-file-text"></i> Reportes y SERVIU\r\n        </a>\r\n      </li>\r\n\r\n      <li class="nav-item mt-3 mb-1 text-uppercase text-white-50 fw-semibold" style="font-size: 10px; letter-spacing: 0.05em;">Comunicaci\xF3n</li>\r\n      <li class="nav-item">\r\n        <a routerLink="/notificaciones" routerLinkActive="active" class="nav-link" (click)="onActivate()">\r\n          <i class="bi bi-chat-dots"></i> Notificaciones\r\n        </a>\r\n      </li>\r\n\r\n      <li class="nav-item mt-3 mb-1 text-uppercase text-white-50 fw-semibold" style="font-size: 10px; letter-spacing: 0.05em;">Sistema</li>\r\n      <li class="nav-item">\r\n        <a routerLink="/configuracion" routerLinkActive="active" class="nav-link" (click)="onActivate()">\r\n          <i class="bi bi-gear"></i> Configuraci\xF3n\r\n        </a>\r\n      </li>\r\n    </ul>\r\n\r\n    <hr class="border-secondary opacity-50 mt-auto">\r\n    <div class="d-flex align-items-center gap-2 px-2 py-2">\r\n      <div class="rounded-circle bg-primary bg-opacity-25 p-2">\r\n        <i class="bi bi-robot text-primary"></i>\r\n      </div>\r\n      <div>\r\n        <span class="small fw-medium text-white">Asistente IA</span>\r\n        <br>\r\n        <span class="small text-white-50">Activo</span>\r\n      </div>\r\n      <span class="ms-auto rounded-circle bg-success" style="width: 8px; height: 8px;"></span>\r\n    </div>\r\n  </nav>\r\n\r\n  <!-- Main -->\r\n  <div class="flex-grow-1 d-flex flex-column min-vh-100">\r\n    <header class="border-bottom bg-white px-4 py-3 d-flex align-items-center gap-3">\r\n      <div class="vr d-none d-md-block"></div>\r\n      <div class="flex-grow-1">\r\n        <h1 class="h6 fw-semibold mb-0 text-body">{{ currentTitle }}</h1>\r\n        <p class="small text-body-secondary mb-0">{{ currentDescription }}</p>\r\n      </div>\r\n      <span class="badge border text-primary d-none d-sm-inline-flex align-items-center gap-1">\r\n        <i class="bi bi-robot"></i> IA Activa <i class="bi bi-stars"></i>\r\n      </span>\r\n    </header>\r\n    <main class="flex-grow-1 overflow-auto p-4">\r\n      <router-outlet (activate)="onActivate()"></router-outlet>\r\n    </main>\r\n  </div>\r\n</div>\r\n' }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LayoutComponent, { className: "LayoutComponent", filePath: "src/app/core/layout/layout.component.ts", lineNumber: 21 });
})();
export {
  LayoutComponent
};
//# sourceMappingURL=chunk-VS64O2FC.js.map
