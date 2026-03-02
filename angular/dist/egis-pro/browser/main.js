import {
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-FCVQJ543.js";
import {
  Component,
  provideHttpClient,
  provideZoneChangeDetection,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-OHDET2P6.js";

// src/app/app.routes.ts
var routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  {
    path: "login",
    loadComponent: () => import("./chunk-U2FU3BIA.js").then((m) => m.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () => import("./chunk-UAJ2C7YI.js").then((m) => m.RegisterComponent)
  },
  {
    path: "",
    loadComponent: () => import("./chunk-ORTG2BKO.js").then((m) => m.LayoutComponent),
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-XR2TGQNN.js").then((m) => m.DashboardComponent)
      },
      {
        path: "comites",
        loadComponent: () => import("./chunk-OYTDESXO.js").then((m) => m.ComitesComponent)
      },
      {
        path: "visado",
        loadComponent: () => import("./chunk-IM5FV5EU.js").then((m) => m.VisadoComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-5EJ6KKC4.js").then((m) => m.ReportesComponent)
      },
      {
        path: "notificaciones",
        loadComponent: () => import("./chunk-VWA56NUW.js").then((m) => m.NotificacionesComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-IQKMZ7BT.js").then((m) => m.ConfiguracionComponent)
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
