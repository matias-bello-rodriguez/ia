import {
  RouterOutlet,
  bootstrapApplication,
  provideHttpClient,
  provideRouter
} from "./chunk-3EQANIPA.js";
import {
  Component,
  provideZoneChangeDetection,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-7OUYEERV.js";

// src/app/app.routes.ts
var routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  {
    path: "",
    loadComponent: () => import("./chunk-VS64O2FC.js").then((m) => m.LayoutComponent),
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-DE5KUWRT.js").then((m) => m.DashboardComponent)
      },
      {
        path: "comites",
        loadComponent: () => import("./chunk-XEBFEERJ.js").then((m) => m.ComitesComponent)
      },
      {
        path: "visado",
        loadComponent: () => import("./chunk-GJJSLCY6.js").then((m) => m.VisadoComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-ZXWYSX2E.js").then((m) => m.ReportesComponent)
      },
      {
        path: "notificaciones",
        loadComponent: () => import("./chunk-ZZ5Z35OD.js").then((m) => m.NotificacionesComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-7IYKWWB4.js").then((m) => m.ConfiguracionComponent)
      }
    ]
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideHttpClient()
  ]
};

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  static {
    this.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
      }
    }, dependencies: [RouterOutlet], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{
      selector: "app-root",
      standalone: true,
      imports: [RouterOutlet],
      template: "<router-outlet />"
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
