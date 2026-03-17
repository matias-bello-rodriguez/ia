import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { getSupabaseClient } from './supabase-client';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import type {
  Documento,
  DocumentoInsert,
  DocumentoConRelaciones,
  EstadoSemaforo,
  HistorialInsert,
  HistorialEstadoDocumento,
  HistorialConRelaciones,
} from '../../shared/models/database.types';

@Injectable({ providedIn: 'root' })
export class DocumentosService {
  private supabase = getSupabaseClient();
  private readonly bucket = environment.storageBucket;

  constructor(private auth: AuthService) {}

  // ══════════════════════════════════════════════════════════
  // CONSULTAS DE DOCUMENTOS
  // ══════════════════════════════════════════════════════════

  /** Obtener todos los documentos de un proyecto */
  getByProyecto(proyectoId: string): Observable<Documento[]> {
    return from(
      this.supabase
        .from('documentos')
        .select('*')
        .eq('proyecto_id', proyectoId)
        .order('fecha_subida', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Documento[];
      })
    );
  }

  /** Obtener documentos de un proyecto con relaciones expandidas */
  obtenerDocumentosPorProyecto(proyectoId: string): Observable<DocumentoConRelaciones[]> {
    return from(
      this.supabase
        .from('documentos')
        .select('*, proyecto:proyectos(*), subido_por_usuario:usuarios(*)')
        .eq('proyecto_id', proyectoId)
        .order('fecha_subida', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as DocumentoConRelaciones[];
      })
    );
  }

  /** Obtener un documento por su ID con relaciones */
  getById(id: string): Observable<DocumentoConRelaciones> {
    return from(
      this.supabase
        .from('documentos')
        .select('*, proyecto:proyectos(*), subido_por_usuario:usuarios(*)')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Documento no encontrado');
        return data as DocumentoConRelaciones;
      })
    );
  }

  /** Obtener todos los documentos accesibles para el usuario actual */
  getAll(): Observable<Documento[]> {
    return from(
      this.supabase
        .from('documentos')
        .select('*, proyecto:proyectos(id, tipo_subsidio, estado_actual)')
        .order('fecha_subida', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Documento[];
      })
    );
  }

  /** Obtener documentos filtrados por estado semáforo */
  getByEstado(estado: EstadoSemaforo): Observable<Documento[]> {
    return from(
      this.supabase
        .from('documentos')
        .select('*')
        .eq('estado_actual', estado)
        .order('fecha_subida', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Documento[];
      })
    );
  }

  // ══════════════════════════════════════════════════════════
  // SUBIR ARCHIVO — Storage + registro en tabla documentos
  // ══════════════════════════════════════════════════════════

  /**
   * Sube un archivo al Storage de Supabase y crea el registro
   * en la tabla `documentos` con estado 'pendiente_amarillo'.
   *
   * @param file      Archivo a subir
   * @param proyectoId  UUID del proyecto asociado
   * @param tipoDocumento  Tipo de documento (Contrato, Boleta, etc.)
   * @returns Observable con el documento creado
   */
  subirDocumento(
    file: File,
    proyectoId: string,
    tipoDocumento: string,
  ): Observable<Documento> {
    const usuarioId = this.auth.getUsuarioId();
    if (!usuarioId) {
      return throwError(() => new Error('Debe iniciar sesión para subir documentos'));
    }

    // Generar path único en el bucket: proyectos/{proyectoId}/{timestamp}_{nombre}
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `proyectos/${proyectoId}/${timestamp}_${safeFileName}`;

    return from(
      this.supabase.storage
        .from(this.bucket)
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false,
        })
    ).pipe(
      switchMap(({ data: uploadData, error: uploadError }) => {
        if (uploadError) throw uploadError;

        // Obtener URL pública del archivo
        const { data: urlData } = this.supabase.storage
          .from(this.bucket)
          .getPublicUrl(storagePath);

        const rutaAlmacenamiento = urlData.publicUrl;

        // Crear registro en tabla documentos
        const nuevoDoc: DocumentoInsert = {
          proyecto_id: proyectoId,
          subido_por_usuario_id: usuarioId,
          tipo_documento: tipoDocumento,
          nombre_archivo: file.name,
          ruta_almacenamiento: rutaAlmacenamiento,
          estado_actual: 'pendiente_amarillo',
        };

        return from(
          this.supabase
            .from('documentos')
            .insert(nuevoDoc)
            .select('*')
            .single()
        );
      }),
      switchMap(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al crear registro');
        const documento = data as Documento;

        // Registrar en historial el estado inicial
        const historial: HistorialInsert = {
          documento_id: documento.id,
          usuario_accion_id: usuarioId,
          estado_anterior: null,
          nuevo_estado: 'pendiente_amarillo',
          comentario_rechazo_aprobacion: 'Documento subido al sistema',
        };

        return from(
          this.supabase
            .from('historial_estados_documento')
            .insert(historial)
        ).pipe(map(() => documento));
      })
    );
  }

  // ══════════════════════════════════════════════════════════
  // CAMBIAR ESTADO — Actualizar semáforo + historial
  // ══════════════════════════════════════════════════════════

  /**
   * Cambia el estado de un documento (aprobar, rechazar, marcar en proceso)
   * y registra el cambio en la tabla `historial_estados_documento`.
   *
   * @param documentoId  UUID del documento
   * @param nuevoEstado  Nuevo estado del semáforo
   * @param comentario   Comentario de aprobación/rechazo (opcional)
   * @returns Observable con el documento actualizado
   */
  cambiarEstado(
    documentoId: string,
    nuevoEstado: EstadoSemaforo,
    comentario?: string,
  ): Observable<Documento> {
    const usuarioId = this.auth.getUsuarioId();
    if (!usuarioId) {
      return throwError(() => new Error('Debe iniciar sesión para cambiar estados'));
    }

    // 1. Obtener estado actual del documento
    return from(
      this.supabase
        .from('documentos')
        .select('id, estado_actual')
        .eq('id', documentoId)
        .single()
    ).pipe(
      switchMap(({ data: docActual, error: errDoc }) => {
        if (errDoc || !docActual) throw errDoc ?? new Error('Documento no encontrado');

        const estadoAnterior = docActual.estado_actual as EstadoSemaforo;

        // 2. Actualizar estado en la tabla documentos
        return from(
          this.supabase
            .from('documentos')
            .update({
              estado_actual: nuevoEstado,
              ultima_actualizacion: new Date().toISOString(),
            })
            .eq('id', documentoId)
            .select('*')
            .single()
        ).pipe(
          switchMap(({ data: docActualizado, error: errUpdate }) => {
            if (errUpdate || !docActualizado) throw errUpdate ?? new Error('Error al actualizar');

            // 3. Registrar cambio en historial
            const historial: HistorialInsert = {
              documento_id: documentoId,
              usuario_accion_id: usuarioId,
              estado_anterior: estadoAnterior,
              nuevo_estado: nuevoEstado,
              comentario_rechazo_aprobacion: comentario ?? null,
            };

            return from(
              this.supabase
                .from('historial_estados_documento')
                .insert(historial)
            ).pipe(map(() => docActualizado as Documento));
          })
        );
      })
    );
  }

  /**
   * Aprueba un documento: cambia su estado a 'aprobado_verde'.
   */
  aprobar(documentoId: string, comentario?: string): Observable<Documento> {
    return this.cambiarEstado(documentoId, 'aprobado_verde', comentario ?? 'Documento aprobado');
  }

  /**
   * Rechaza un documento: cambia su estado a 'rechazado_rojo'.
   */
  rechazar(documentoId: string, motivo: string): Observable<Documento> {
    return this.cambiarEstado(documentoId, 'rechazado_rojo', motivo);
  }

  /**
   * Marca un documento como en proceso: estado 'en_proceso_naranja'.
   */
  marcarEnProceso(documentoId: string, comentario?: string): Observable<Documento> {
    return this.cambiarEstado(documentoId, 'en_proceso_naranja', comentario ?? 'Documento en revisión');
  }

  // ══════════════════════════════════════════════════════════
  // HISTORIAL DE UN DOCUMENTO
  // ══════════════════════════════════════════════════════════

  /**
   * Obtener todo el historial de estados de un documento.
   */
  getHistorial(documentoId: string): Observable<HistorialConRelaciones[]> {
    return from(
      this.supabase
        .from('historial_estados_documento')
        .select('*, usuario_accion:usuarios(nombre_completo, rol)')
        .eq('documento_id', documentoId)
        .order('fecha_cambio', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as HistorialConRelaciones[];
      })
    );
  }

  // ══════════════════════════════════════════════════════════
  // ESTADÍSTICAS DE SEMÁFORO POR PROYECTO
  // ══════════════════════════════════════════════════════════

  /**
   * Obtener conteo de documentos por estado para un proyecto.
   */
  getEstadisticasSemaforo(proyectoId: string): Observable<Record<EstadoSemaforo, number>> {
    return from(
      this.supabase
        .from('documentos')
        .select('estado_actual')
        .eq('proyecto_id', proyectoId)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        const conteo: Record<EstadoSemaforo, number> = {
          pendiente_amarillo: 0,
          en_proceso_naranja: 0,
          aprobado_verde: 0,
          rechazado_rojo: 0,
        };
        for (const doc of data ?? []) {
          const estado = doc.estado_actual as EstadoSemaforo;
          if (estado in conteo) conteo[estado]++;
        }
        return conteo;
      })
    );
  }

  // ══════════════════════════════════════════════════════════
  // DESCARGAR ARCHIVO DESDE STORAGE
  // ══════════════════════════════════════════════════════════

  /**
   * Descarga un archivo desde Supabase Storage usando el SDK
   * (evita problemas de bucket público / 404).
   * Extrae el storagePath desde la URL almacenada en ruta_almacenamiento.
   */
  descargarArchivo(rutaAlmacenamiento: string): Observable<Blob> {
    // La URL tiene formato: .../storage/v1/object/public/{bucket}/{storagePath}
    const regex = /\/storage\/v1\/object\/public\/[^/]+\/(.+)/;
    const match = rutaAlmacenamiento.match(regex);

    if (!match?.[1]) {
      return throwError(() => new Error('No se pudo extraer la ruta del archivo desde la URL almacenada.'));
    }

    const storagePath = decodeURIComponent(match[1]);

    return from(
      this.supabase.storage.from(this.bucket).download(storagePath)
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al descargar archivo del storage');
        return data;
      })
    );
  }

  /**
   * Descarga el archivo desde Storage y dispara la descarga en el navegador
   * (crea un enlace temporal con el nombre indicado).
   */
  descargarYGuardar(rutaAlmacenamiento: string, nombreArchivo: string): Observable<void> {
    return this.descargarArchivo(rutaAlmacenamiento).pipe(
      tap((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo || 'documento';
        a.click();
        URL.revokeObjectURL(url);
      }),
      map(() => undefined)
    );
  }

  // ══════════════════════════════════════════════════════════
  // ELIMINAR DOCUMENTO — Storage + registro
  // ══════════════════════════════════════════════════════════

  /**
   * Elimina un documento del Storage y de la tabla documentos.
   * El historial se elimina automáticamente por ON DELETE CASCADE.
   */
  eliminar(documentoId: string): Observable<void> {
    return from(
      this.supabase
        .from('documentos')
        .select('ruta_almacenamiento')
        .eq('id', documentoId)
        .single()
    ).pipe(
      switchMap(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Documento no encontrado');

        // Extraer path del Storage desde la URL
        const url = data.ruta_almacenamiento;
        const pathMatch = url.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
        const storagePath = pathMatch?.[1];

        // Eliminar archivo del Storage (si existe)
        const deleteStorage = storagePath
          ? this.supabase.storage.from(this.bucket).remove([storagePath])
          : Promise.resolve({ data: null, error: null });

        return from(deleteStorage);
      }),
      switchMap(() => {
        // Eliminar registro de la tabla (historial se borra por CASCADE)
        return from(
          this.supabase
            .from('documentos')
            .delete()
            .eq('id', documentoId)
        );
      }),
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }

  // ══════════════════════════════════════════════════════════
  // ACTUALIZAR RESUMEN IA
  // ══════════════════════════════════════════════════════════

  /**
   * Guarda el resumen generado por la IA en el campo
   * `resumen_inteligencia_artificial` del documento.
   */
  actualizarResumenIA(documentoId: string, resumen: string): Observable<Documento> {
    return from(
      this.supabase
        .from('documentos')
        .update({
          resumen_inteligencia_artificial: resumen,
          ultima_actualizacion: new Date().toISOString(),
        })
        .eq('id', documentoId)
        .select('*')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al guardar resumen IA');
        return data as Documento;
      })
    );
  }
}
