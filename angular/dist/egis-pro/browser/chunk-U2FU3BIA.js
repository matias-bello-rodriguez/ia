import {
  AuthService
} from "./chunk-FTRQW7YH.js";
import {
  Router,
  RouterLink
} from "./chunk-FCVQJ543.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-O4IN2EJS.js";
import "./chunk-OKFAIESM.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-OHDET2P6.js";

// src/app/features/auth/login.component.ts
function LoginComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
function LoginComponent_Conditional_18_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ingrese su correo. ");
  }
}
function LoginComponent_Conditional_18_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Correo no v\xE1lido. ");
  }
}
function LoginComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275conditionalCreate(1, LoginComponent_Conditional_18_Conditional_1_Template, 1, 0);
    \u0275\u0275conditionalCreate(2, LoginComponent_Conditional_18_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r0.form.get("email")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.form.get("email")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["email"]) ? 2 : -1);
  }
}
function LoginComponent_Conditional_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ingrese su contrase\xF1a. ");
  }
}
function LoginComponent_Conditional_23_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " M\xEDnimo 6 caracteres. ");
  }
}
function LoginComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275conditionalCreate(1, LoginComponent_Conditional_23_Conditional_1_Template, 1, 0);
    \u0275\u0275conditionalCreate(2, LoginComponent_Conditional_23_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r0.form.get("password")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.form.get("password")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["minlength"]) ? 2 : -1);
  }
}
function LoginComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 19);
  }
}
var LoginComponent = class _LoginComponent {
  constructor(fb, auth, router) {
    this.fb = fb;
    this.auth = auth;
    this.router = router;
    this.loading = false;
    this.error = null;
    this.form = this.fb.nonNullable.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.loading = true;
    this.auth.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? "Error al iniciar sesi\xF3n. Intente de nuevo.";
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 31, vars: 6, consts: [[1, "auth-page"], [1, "auth-card", "card", "shadow-sm"], [1, "card-body", "p-4", "p-md-5"], [1, "auth-header", "text-center", "mb-4"], [1, "auth-logo", "mb-3"], [1, "bi", "bi-building"], [1, "auth-title"], [1, "auth-subtitle"], [1, "auth-form-title", "mt-4"], [1, "auth-form", 3, "ngSubmit", "formGroup"], ["role", "alert", 1, "alert", "alert-danger", "py-2", "small"], [1, "mb-3"], ["for", "login-email", 1, "form-label"], ["id", "login-email", "type", "email", "formControlName", "email", "placeholder", "tu@ejemplo.cl", "autocomplete", "email", 1, "form-control"], [1, "invalid-feedback", "d-block"], [1, "mb-4"], ["for", "login-password", 1, "form-label"], ["id", "login-password", "type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "current-password", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary-otic", "btn-auto-width", "w-100", "mb-3", 3, "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "text-center", "mb-0", "small", "text-body-secondary"], ["routerLink", "/register", 1, "auth-link"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
        \u0275\u0275element(5, "i", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "h1", 6);
        \u0275\u0275text(7, "EGIS Pro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 7);
        \u0275\u0275text(9, "Gesti\xF3n Habitacional");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "h2", 8);
        \u0275\u0275text(11, "Iniciar sesi\xF3n");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "form", 9);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_12_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275conditionalCreate(13, LoginComponent_Conditional_13_Template, 2, 1, "div", 10);
        \u0275\u0275elementStart(14, "div", 11)(15, "label", 12);
        \u0275\u0275text(16, "Correo electr\xF3nico");
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "input", 13);
        \u0275\u0275conditionalCreate(18, LoginComponent_Conditional_18_Template, 3, 2, "div", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 15)(20, "label", 16);
        \u0275\u0275text(21, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275element(22, "input", 17);
        \u0275\u0275conditionalCreate(23, LoginComponent_Conditional_23_Template, 3, 2, "div", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 18);
        \u0275\u0275conditionalCreate(25, LoginComponent_Conditional_25_Template, 1, 0, "span", 19);
        \u0275\u0275text(26, " Entrar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "p", 20);
        \u0275\u0275text(28, " \xBFNo tiene cuenta? ");
        \u0275\u0275elementStart(29, "a", 21);
        \u0275\u0275text(30, "Registrarse");
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        \u0275\u0275advance(12);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.error ? 13 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.touched) ? 18 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_3_0 = ctx.form.get("password")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("password")) == null ? null : tmp_3_0.touched) ? 23 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 25 : -1);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], template: `<div class="auth-page">\r
  <div class="auth-card card shadow-sm">\r
    <div class="card-body p-4 p-md-5">\r
      <div class="auth-header text-center mb-4">\r
        <div class="auth-logo mb-3">\r
          <i class="bi bi-building"></i>\r
        </div>\r
        <h1 class="auth-title">EGIS Pro</h1>\r
        <p class="auth-subtitle">Gesti\xF3n Habitacional</p>\r
        <h2 class="auth-form-title mt-4">Iniciar sesi\xF3n</h2>\r
      </div>\r
\r
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="auth-form">\r
        @if (error) {\r
          <div class="alert alert-danger py-2 small" role="alert">\r
            {{ error }}\r
          </div>\r
        }\r
\r
        <div class="mb-3">\r
          <label for="login-email" class="form-label">Correo electr\xF3nico</label>\r
          <input\r
            id="login-email"\r
            type="email"\r
            class="form-control"\r
            formControlName="email"\r
            placeholder="tu@ejemplo.cl"\r
            autocomplete="email"\r
          />\r
          @if (form.get('email')?.invalid && form.get('email')?.touched) {\r
            <div class="invalid-feedback d-block">\r
              @if (form.get('email')?.errors?.['required']) {\r
                Ingrese su correo.\r
              }\r
              @if (form.get('email')?.errors?.['email']) {\r
                Correo no v\xE1lido.\r
              }\r
            </div>\r
          }\r
        </div>\r
\r
        <div class="mb-4">\r
          <label for="login-password" class="form-label">Contrase\xF1a</label>\r
          <input\r
            id="login-password"\r
            type="password"\r
            class="form-control"\r
            formControlName="password"\r
            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"\r
            autocomplete="current-password"\r
          />\r
          @if (form.get('password')?.invalid && form.get('password')?.touched) {\r
            <div class="invalid-feedback d-block">\r
              @if (form.get('password')?.errors?.['required']) {\r
                Ingrese su contrase\xF1a.\r
              }\r
              @if (form.get('password')?.errors?.['minlength']) {\r
                M\xEDnimo 6 caracteres.\r
              }\r
            </div>\r
          }\r
        </div>\r
\r
        <button\r
          type="submit"\r
          class="btn btn-primary-otic btn-auto-width w-100 mb-3"\r
          [disabled]="loading"\r
        >\r
          @if (loading) {\r
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
          }\r
          Entrar\r
        </button>\r
\r
        <p class="text-center mb-0 small text-body-secondary">\r
          \xBFNo tiene cuenta?\r
          <a routerLink="/register" class="auth-link">Registrarse</a>\r
        </p>\r
      </form>\r
    </div>\r
  </div>\r
</div>\r
` }]
  }], () => [{ type: FormBuilder }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/login.component.ts", lineNumber: 13 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-U2FU3BIA.js.map
