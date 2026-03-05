import {
  AlertService
} from "./chunk-WBRLHA3Z.js";
import {
  AuthService
} from "./chunk-SKSN6737.js";
import {
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-U2AX3SLR.js";
import {
  Component,
  filter,
  inject,
  map,
  provideHttpClient,
  provideZoneChangeDetection,
  setClassMetadata,
  take,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-6UFPIQNI.js";
import "./chunk-NUWPPFEP.js";

// src/app/core/guards/auth.guard.ts
function whenReady(fn) {
  const auth = inject(AuthService);
  return auth.ready$.pipe(filter((ready) => ready), take(1), map(() => fn()));
}
var authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const alert = inject(AlertService);
  return whenReady(() => {
    if (auth.isLoggedIn())
      return true;
    alert.warning("Debe iniciar sesi\xF3n para acceder.");
    return router.createUrlTree(["/"]);
  });
};
function roleGuard(expected) {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const alert = inject(AlertService);
    return whenReady(() => {
      if (!auth.isLoggedIn()) {
        alert.warning("Debe iniciar sesi\xF3n para acceder.");
        return router.createUrlTree(["/"]);
      }
      const role = auth.getRole();
      if (role === expected)
        return true;
      alert.error("Acceso no autorizado para su perfil.");
      return router.createUrlTree([auth.getDashboardPath()]);
    });
  };
}
var egisGuard = roleGuard("egis");
var constructoraGuard = roleGuard("constructora");
var publicOnlyGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return whenReady(() => {
    if (!auth.isLoggedIn())
      return true;
    return router.createUrlTree([auth.getDashboardPath()]);
  });
};

// src/app/app.routes.ts
var routes = [
  { path: "", pathMatch: "full", redirectTo: "inicio" },
  // ── Públicas (redirigen al dashboard si ya hay sesión) ────
  {
    path: "inicio",
    canActivate: [publicOnlyGuard],
    loadComponent: () => import("./chunk-WIAWSBRQ.js").then((m) => m.InicioComponent)
  },
  {
    path: "login",
    canActivate: [publicOnlyGuard],
    loadComponent: () => import("./chunk-ZVN2CNMI.js").then((m) => m.LoginComponent)
  },
  // ── Dashboard EGIS (protegido: autenticado + rol egis) ────
  {
    path: "dashboard-egis",
    canActivate: [authGuard, egisGuard],
    loadComponent: () => import("./chunk-FYIIYLAL.js").then((m) => m.LayoutComponent),
    children: [
      {
        path: "",
        loadComponent: () => import("./chunk-XOVBNTZV.js").then((m) => m.DashboardComponent)
      },
      {
        path: "comites",
        loadComponent: () => import("./chunk-46YNBLZZ.js").then((m) => m.ComitesComponent)
      },
      {
        path: "visado",
        loadComponent: () => import("./chunk-BRAVFRU7.js").then((m) => m.VisadoComponent)
      },
      {
        path: "semaforo",
        loadComponent: () => import("./chunk-DDERCDR6.js").then((m) => m.SemaforoComponent)
      },
      {
        path: "documento/:id",
        loadComponent: () => import("./chunk-7NKCOKEK.js").then((m) => m.DocumentViewerComponent)
      },
      {
        path: "firma-digital",
        loadComponent: () => import("./chunk-RJ7STKJQ.js").then((m) => m.FirmaDigitalComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-ZWDQ3G5I.js").then((m) => m.ReportesComponent)
      },
      {
        path: "notificaciones",
        loadComponent: () => import("./chunk-EONSGCGB.js").then((m) => m.NotificacionesComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-S633CAJP.js").then((m) => m.ConfiguracionComponent)
      }
    ]
  },
  // ── Dashboard Constructora (protegido: autenticado + rol constructora) ─
  {
    path: "dashboard-constructora",
    canActivate: [authGuard, constructoraGuard],
    loadComponent: () => import("./chunk-ZHPNQT5G.js").then((m) => m.LayoutConstructoraComponent),
    children: [
      {
        path: "",
        loadComponent: () => import("./chunk-G3GDZ4OY.js").then((m) => m.DashboardConstructoraComponent)
      },
      {
        path: "semaforo",
        loadComponent: () => import("./chunk-DDERCDR6.js").then((m) => m.SemaforoComponent)
      },
      {
        path: "firma-digital",
        loadComponent: () => import("./chunk-RJ7STKJQ.js").then((m) => m.FirmaDigitalComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-ZWDQ3G5I.js").then((m) => m.ReportesComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-S633CAJP.js").then((m) => m.ConfiguracionComponent)
      }
    ]
  },
  // ── Fallback ──────────────────────────────────────────────
  { path: "**", redirectTo: "inicio" }
];

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => next(req);

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
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
