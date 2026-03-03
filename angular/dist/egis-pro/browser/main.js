import {
  AlertService
} from "./chunk-BBVS5UDP.js";
import {
  AuthService
} from "./chunk-O5GVKVE5.js";
import {
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-C6KJUMK6.js";
import {
  Component,
  environment,
  filter,
  from,
  inject,
  map,
  provideHttpClient,
  provideZoneChangeDetection,
  setClassMetadata,
  switchMap,
  take,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-FLNL7WI7.js";

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
    loadComponent: () => import("./chunk-F6MABA62.js").then((m) => m.InicioComponent)
  },
  {
    path: "login",
    canActivate: [publicOnlyGuard],
    loadComponent: () => import("./chunk-W77FTNAE.js").then((m) => m.LoginComponent)
  },
  // ── Dashboard EGIS (protegido: autenticado + rol egis) ────
  {
    path: "dashboard-egis",
    canActivate: [authGuard, egisGuard],
    loadComponent: () => import("./chunk-N4ZIW6NY.js").then((m) => m.LayoutComponent),
    children: [
      {
        path: "",
        loadComponent: () => import("./chunk-S5A5QVJR.js").then((m) => m.DashboardComponent)
      },
      {
        path: "comites",
        loadComponent: () => import("./chunk-DRY6VTJW.js").then((m) => m.ComitesComponent)
      },
      {
        path: "visado",
        loadComponent: () => import("./chunk-DAZEVHXO.js").then((m) => m.VisadoComponent)
      },
      {
        path: "semaforo",
        loadComponent: () => import("./chunk-OXG4AVQY.js").then((m) => m.SemaforoComponent)
      },
      {
        path: "documento/:id",
        loadComponent: () => import("./chunk-5PAXZBMP.js").then((m) => m.DocumentViewerComponent)
      },
      {
        path: "firma-digital",
        loadComponent: () => import("./chunk-3Y6BUKIS.js").then((m) => m.FirmaDigitalComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-5OLFFEKV.js").then((m) => m.ReportesComponent)
      },
      {
        path: "notificaciones",
        loadComponent: () => import("./chunk-6ML4LKTD.js").then((m) => m.NotificacionesComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-SX27MPZ4.js").then((m) => m.ConfiguracionComponent)
      }
    ]
  },
  // ── Dashboard Constructora (protegido: autenticado + rol constructora) ─
  {
    path: "dashboard-constructora",
    canActivate: [authGuard, constructoraGuard],
    loadComponent: () => import("./chunk-DQTJJGSM.js").then((m) => m.LayoutConstructoraComponent),
    children: [
      {
        path: "",
        loadComponent: () => import("./chunk-IFKAEXKQ.js").then((m) => m.DashboardConstructoraComponent)
      },
      {
        path: "semaforo",
        loadComponent: () => import("./chunk-OXG4AVQY.js").then((m) => m.SemaforoComponent)
      },
      {
        path: "firma-digital",
        loadComponent: () => import("./chunk-3Y6BUKIS.js").then((m) => m.FirmaDigitalComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-5OLFFEKV.js").then((m) => m.ReportesComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-SX27MPZ4.js").then((m) => m.ConfiguracionComponent)
      }
    ]
  },
  // ── Fallback ──────────────────────────────────────────────
  { path: "**", redirectTo: "inicio" }
];

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const auth = inject(AuthService);
  if (!req.url.startsWith(environment.apiBaseUrl)) {
    return next(req);
  }
  return from(auth.getSessionToken()).pipe(switchMap((token) => {
    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next(authReq);
    }
    return next(req);
  }));
};

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
