"""
permissions.py — Arquitectura de Dos Caras (EGIS vs. Constructora).

Custom permissions para DRF que validan el rol del usuario
a través de su PerfilUsuario:
  - EGIS: cargar documentos, usar IA, firmar HITO.
  - CONSTRUCTORA: monitorear avance, ver semáforo, descargar informes.
"""

from __future__ import annotations

from rest_framework.permissions import BasePermission

from .models import PerfilUsuario


def _get_perfil(request) -> PerfilUsuario | None:
    """Obtiene el PerfilUsuario del request.user (o None)."""
    user = getattr(request, "user", None)
    if not user or not user.is_authenticated:
        return None
    return getattr(user, "perfil", None)


class EsEGIS(BasePermission):
    """Permite acceso solo a usuarios con rol EGIS (operador o HITO)."""

    message = "Acceso restringido a usuarios EGIS."

    def has_permission(self, request, view) -> bool:
        perfil = _get_perfil(request)
        if perfil is None:
            return request.user and request.user.is_staff
        return perfil.es_egis


class EsConstructora(BasePermission):
    """Permite acceso solo a usuarios con rol Constructora."""

    message = "Acceso restringido a usuarios Constructora."

    def has_permission(self, request, view) -> bool:
        perfil = _get_perfil(request)
        if perfil is None:
            return request.user and request.user.is_staff
        return perfil.es_constructora


class EsHITO(BasePermission):
    """Permite acceso solo a usuarios con rol EGIS HITO (firma)."""

    message = "Solo el usuario HITO de la EGIS puede firmar."

    def has_permission(self, request, view) -> bool:
        perfil = _get_perfil(request)
        if perfil is None:
            return request.user and request.user.is_staff
        return perfil.es_hito


class PuedeVisarDocumentos(BasePermission):
    """Permite visar documentos con IA — solo EGIS."""

    message = "Solo usuarios EGIS pueden visar documentos."

    def has_permission(self, request, view) -> bool:
        perfil = _get_perfil(request)
        if perfil is None:
            return request.user and request.user.is_staff
        return perfil.es_egis


class PuedeVerSemaforo(BasePermission):
    """Permite ver el semáforo de estados — EGIS y Constructora."""

    message = "No tiene permiso para ver el semáforo."

    def has_permission(self, request, view) -> bool:
        perfil = _get_perfil(request)
        if perfil is None:
            return request.user and request.user.is_staff
        return perfil.es_egis or perfil.es_constructora


class PuedeDescargarInformes(BasePermission):
    """Permite descargar informes de pago — Constructora y Admin."""

    message = "No tiene permiso para descargar informes."

    def has_permission(self, request, view) -> bool:
        perfil = _get_perfil(request)
        if perfil is None:
            return request.user and request.user.is_staff
        return perfil.es_constructora or perfil.rol == PerfilUsuario.Rol.ADMIN


class PuedeCargarDocumentos(BasePermission):
    """Permite cargar documentos — solo EGIS."""

    message = "Solo usuarios EGIS pueden cargar documentos."

    def has_permission(self, request, view) -> bool:
        perfil = _get_perfil(request)
        if perfil is None:
            return request.user and request.user.is_staff
        return perfil.es_egis
