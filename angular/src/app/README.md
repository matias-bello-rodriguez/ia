# Estructura de la aplicación EGIS Pro

```
app/
├── core/                 # Núcleo de la aplicación (singleton, shell)
│   └── layout/           # Layout principal (sidebar + outlet)
├── features/             # Módulos por funcionalidad (lazy-loaded)
│   ├── dashboard/
│   ├── comites/
│   ├── visado/
│   ├── reportes/
│   ├── notificaciones/
│   └── configuracion/
├── shared/               # Componentes, pipes y directivas reutilizables
├── app.component.ts
├── app.config.ts
├── app.routes.ts
└── README.md
```

- **core**: Layout, guards, interceptors y servicios de aplicación única.
- **features**: Una carpeta por flujo de negocio; cada una puede tener su componente, servicios y tipos.
- **shared**: Código compartido entre varias features (UI común, pipes, directivas).
