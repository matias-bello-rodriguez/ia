# EGIS Pro — Angular

Réplica del frontend EGIS Pro en **Angular 21** con **Bootstrap 5**.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
cd angular
npm install
```

## Desarrollo

```bash
npm start
```

Abre [http://localhost:4200](http://localhost:4200). La aplicación se recarga al cambiar el código.

## Build

```bash
npm run build
```

Los artefactos se generan en `dist/egis-pro/`.

## Estructura

- **Layout**: sidebar (módulos) + header (título/descripción) + contenido.
- **Rutas**: `/dashboard`, `/comites`, `/visado`, `/reportes`, `/notificaciones`, `/configuracion`.
- **Estilos**: Bootstrap 5 + Bootstrap Icons (CDN). Variables CSS propias en `src/styles.css`.

## Módulos replicados

| Ruta            | Contenido                                                                 |
|-----------------|---------------------------------------------------------------------------|
| Dashboard       | KPIs, gráficos de estado de carpetas y subsidios, alertas IA             |
| Comités         | Proyectos (mapa + cards), Beneficiarios (tabla con búsqueda y match IA)   |
| Visado          | Carga de documentos, resultados OCR, filtro Vigencia documental, cola    |
| Reportes        | Resumen ejecutivo (grid técnica), Carpeta SERVIU, Informes de Terceros    |
| Notificaciones  | Lista de contactos, mensaje IA, documentos faltantes, enviar              |
| Configuración   | Biblioteca de subsidios, reglas de documentos, estado del asistente IA   |
