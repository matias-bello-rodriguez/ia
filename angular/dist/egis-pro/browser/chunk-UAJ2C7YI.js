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

// src/app/features/auth/register.component.ts
function RegisterComponent_Conditional_13_Template(rf, ctx) {
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
function RegisterComponent_Conditional_18_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ingrese su nombre. ");
  }
}
function RegisterComponent_Conditional_18_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " M\xEDnimo 2 caracteres. ");
  }
}
function RegisterComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275conditionalCreate(1, RegisterComponent_Conditional_18_Conditional_1_Template, 1, 0);
    \u0275\u0275conditionalCreate(2, RegisterComponent_Conditional_18_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r0.form.get("nombre")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.form.get("nombre")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["minlength"]) ? 2 : -1);
  }
}
function RegisterComponent_Conditional_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ingrese su correo. ");
  }
}
function RegisterComponent_Conditional_23_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Correo no v\xE1lido. ");
  }
}
function RegisterComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275conditionalCreate(1, RegisterComponent_Conditional_23_Conditional_1_Template, 1, 0);
    \u0275\u0275conditionalCreate(2, RegisterComponent_Conditional_23_Conditional_2_Template, 1, 0);
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
function RegisterComponent_Conditional_28_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ingrese una contrase\xF1a. ");
  }
}
function RegisterComponent_Conditional_28_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " M\xEDnimo 6 caracteres. ");
  }
}
function RegisterComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275conditionalCreate(1, RegisterComponent_Conditional_28_Conditional_1_Template, 1, 0);
    \u0275\u0275conditionalCreate(2, RegisterComponent_Conditional_28_Conditional_2_Template, 1, 0);
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
function RegisterComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, " Repita la contrase\xF1a. ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 23);
  }
}
var RegisterComponent = class _RegisterComponent {
  constructor(fb, auth, router) {
    this.fb = fb;
    this.auth = auth;
    this.router = router;
    this.loading = false;
    this.error = null;
    this.form = this.fb.nonNullable.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ["", [Validators.required]]
    });
  }
  onSubmit() {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { nombre, email, password, passwordConfirm } = this.form.getRawValue();
    if (password !== passwordConfirm) {
      this.error = "Las contrase\xF1as no coinciden.";
      return;
    }
    this.loading = true;
    this.auth.register({ email, password, nombre }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? "Error al registrarse. Intente de nuevo.";
      }
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 41, vars: 8, consts: [[1, "auth-page"], [1, "auth-card", "card", "shadow-sm"], [1, "card-body", "p-4", "p-md-5"], [1, "auth-header", "text-center", "mb-4"], [1, "auth-logo", "mb-3"], [1, "bi", "bi-building"], [1, "auth-title"], [1, "auth-subtitle"], [1, "auth-form-title", "mt-4"], [1, "auth-form", 3, "ngSubmit", "formGroup"], ["role", "alert", 1, "alert", "alert-danger", "py-2", "small"], [1, "mb-3"], ["for", "reg-nombre", 1, "form-label"], ["id", "reg-nombre", "type", "text", "formControlName", "nombre", "placeholder", "Su nombre", "autocomplete", "name", 1, "form-control"], [1, "invalid-feedback", "d-block"], ["for", "reg-email", 1, "form-label"], ["id", "reg-email", "type", "email", "formControlName", "email", "placeholder", "tu@ejemplo.cl", "autocomplete", "email", 1, "form-control"], ["for", "reg-password", 1, "form-label"], ["id", "reg-password", "type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "new-password", 1, "form-control"], [1, "mb-4"], ["for", "reg-password-confirm", 1, "form-label"], ["id", "reg-password-confirm", "type", "password", "formControlName", "passwordConfirm", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "new-password", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary-otic", "btn-auto-width", "w-100", "mb-3", 3, "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "text-center", "mb-0", "small", "text-body-secondary"], ["routerLink", "/login", 1, "auth-link"]], template: function RegisterComponent_Template(rf, ctx) {
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
        \u0275\u0275text(11, "Crear cuenta");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "form", 9);
        \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_12_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275conditionalCreate(13, RegisterComponent_Conditional_13_Template, 2, 1, "div", 10);
        \u0275\u0275elementStart(14, "div", 11)(15, "label", 12);
        \u0275\u0275text(16, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "input", 13);
        \u0275\u0275conditionalCreate(18, RegisterComponent_Conditional_18_Template, 3, 2, "div", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 11)(20, "label", 15);
        \u0275\u0275text(21, "Correo electr\xF3nico");
        \u0275\u0275elementEnd();
        \u0275\u0275element(22, "input", 16);
        \u0275\u0275conditionalCreate(23, RegisterComponent_Conditional_23_Template, 3, 2, "div", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 11)(25, "label", 17);
        \u0275\u0275text(26, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "input", 18);
        \u0275\u0275conditionalCreate(28, RegisterComponent_Conditional_28_Template, 3, 2, "div", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div", 19)(30, "label", 20);
        \u0275\u0275text(31, "Confirmar contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275element(32, "input", 21);
        \u0275\u0275conditionalCreate(33, RegisterComponent_Conditional_33_Template, 2, 0, "div", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "button", 22);
        \u0275\u0275conditionalCreate(35, RegisterComponent_Conditional_35_Template, 1, 0, "span", 23);
        \u0275\u0275text(36, " Registrarse ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "p", 24);
        \u0275\u0275text(38, " \xBFYa tiene cuenta? ");
        \u0275\u0275elementStart(39, "a", 25);
        \u0275\u0275text(40, "Iniciar sesi\xF3n");
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        let tmp_4_0;
        let tmp_5_0;
        \u0275\u0275advance(12);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.error ? 13 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_2_0 = ctx.form.get("nombre")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("nombre")) == null ? null : tmp_2_0.touched) ? 18 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.touched) ? 23 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_4_0 = ctx.form.get("password")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.form.get("password")) == null ? null : tmp_4_0.touched) ? 28 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_5_0 = ctx.form.get("passwordConfirm")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.form.get("passwordConfirm")) == null ? null : tmp_5_0.touched) ? 33 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 35 : -1);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterComponent, [{
    type: Component,
    args: [{ selector: "app-register", standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], template: `<div class="auth-page">\r
  <div class="auth-card card shadow-sm">\r
    <div class="card-body p-4 p-md-5">\r
      <div class="auth-header text-center mb-4">\r
        <div class="auth-logo mb-3">\r
          <i class="bi bi-building"></i>\r
        </div>\r
        <h1 class="auth-title">EGIS Pro</h1>\r
        <p class="auth-subtitle">Gesti\xF3n Habitacional</p>\r
        <h2 class="auth-form-title mt-4">Crear cuenta</h2>\r
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
          <label for="reg-nombre" class="form-label">Nombre</label>\r
          <input\r
            id="reg-nombre"\r
            type="text"\r
            class="form-control"\r
            formControlName="nombre"\r
            placeholder="Su nombre"\r
            autocomplete="name"\r
          />\r
          @if (form.get('nombre')?.invalid && form.get('nombre')?.touched) {\r
            <div class="invalid-feedback d-block">\r
              @if (form.get('nombre')?.errors?.['required']) {\r
                Ingrese su nombre.\r
              }\r
              @if (form.get('nombre')?.errors?.['minlength']) {\r
                M\xEDnimo 2 caracteres.\r
              }\r
            </div>\r
          }\r
        </div>\r
\r
        <div class="mb-3">\r
          <label for="reg-email" class="form-label">Correo electr\xF3nico</label>\r
          <input\r
            id="reg-email"\r
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
        <div class="mb-3">\r
          <label for="reg-password" class="form-label">Contrase\xF1a</label>\r
          <input\r
            id="reg-password"\r
            type="password"\r
            class="form-control"\r
            formControlName="password"\r
            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"\r
            autocomplete="new-password"\r
          />\r
          @if (form.get('password')?.invalid && form.get('password')?.touched) {\r
            <div class="invalid-feedback d-block">\r
              @if (form.get('password')?.errors?.['required']) {\r
                Ingrese una contrase\xF1a.\r
              }\r
              @if (form.get('password')?.errors?.['minlength']) {\r
                M\xEDnimo 6 caracteres.\r
              }\r
            </div>\r
          }\r
        </div>\r
\r
        <div class="mb-4">\r
          <label for="reg-password-confirm" class="form-label">Confirmar contrase\xF1a</label>\r
          <input\r
            id="reg-password-confirm"\r
            type="password"\r
            class="form-control"\r
            formControlName="passwordConfirm"\r
            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"\r
            autocomplete="new-password"\r
          />\r
          @if (form.get('passwordConfirm')?.invalid && form.get('passwordConfirm')?.touched) {\r
            <div class="invalid-feedback d-block">\r
              Repita la contrase\xF1a.\r
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
          Registrarse\r
        </button>\r
\r
        <p class="text-center mb-0 small text-body-secondary">\r
          \xBFYa tiene cuenta?\r
          <a routerLink="/login" class="auth-link">Iniciar sesi\xF3n</a>\r
        </p>\r
      </form>\r
    </div>\r
  </div>\r
</div>\r
` }]
  }], () => [{ type: FormBuilder }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/features/auth/register.component.ts", lineNumber: 13 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-UAJ2C7YI.js.map
