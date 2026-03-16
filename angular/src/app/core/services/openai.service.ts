import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OpenaiService {
  constructor(private http: HttpClient) {}

  /**
   * Envía un prompt a la API de OpenAI (proyecto_egis).
   */
  askGPT(prompt: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.openaiApiKey}`,
    });
    const body = {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024,
    };
    return this.http
      .post<{ choices?: Array<{ message?: { content?: string } }> }>(environment.openaiUrl, body, { headers })
      .pipe(
        map((res) => res.choices?.[0]?.message?.content?.trim() ?? '')
      );
  }

  /**
   * Envía una imagen (base64 PNG) al modelo con visión y pide extraer texto e información.
   * Para PDFs escaneados o con imágenes incrustadas (proyecto_egis).
   */
  extraerTextoDeImagen(base64Png: string, nombreArchivo: string, promptTexto?: string): Observable<string> {
    const prompt = promptTexto ?? `Eres un asistente del proyecto proyecto_egis. Esta imagen corresponde a una página del documento "${nombreArchivo}".

Tu tarea: extrae TODO el texto visible en la imagen y la información más importante (fechas, montos, partes, requisitos, tablas, formularios). Responde en español, de forma clara. Usa viñetas (•) para los puntos. No inventes datos.`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.openaiApiKey}`,
    });
    const body = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: { url: `data:image/png;base64,${base64Png}` },
            },
          ],
        },
      ],
      max_tokens: 1024,
    };
    return this.http
      .post<{ choices?: Array<{ message?: { content?: string } }> }>(environment.openaiUrl, body, { headers })
      .pipe(
        map((res) => res.choices?.[0]?.message?.content?.trim() ?? '')
      );
  }

  /**
   * Pide a la IA que extraiga la información más importante del texto del documento (PDF)
   * para el proyecto proyecto_egis.
   */
  extraerInformacionDocumento(textoDocumento: string, nombreArchivo: string): Observable<string> {
    const prompt = `Eres un asistente del proyecto proyecto_egis. A continuación se muestra el texto extraído de un documento (PDF) titulado "${nombreArchivo}".

Tu tarea: según el contenido del PDF, extrae y resume LA INFORMACIÓN MÁS IMPORTANTE. Incluye:
- Tipo de documento y propósito.
- Partes, fechas, montos, plazos o condiciones relevantes.
- Datos que sean críticos para trámites habitacionales o de construcción.
- Cualquier advertencia o requisito destacado.

Responde en español, de forma clara y concisa. Usa viñetas (•) para los puntos. No inventes datos que no aparezcan en el texto.

--- TEXTO DEL DOCUMENTO ---
${textoDocumento}
--- FIN ---`;
    return this.askGPT(prompt);
  }

  /**
   * Resumen de UNA sola página del documento (proyecto_egis).
   * Para combinar después: "Página 1: ... Página 2: ..."
   */
  resumenPaginaDocumento(textoPagina: string, nombreArchivo: string, numeroPagina: number): Observable<string> {
    const prompt = `Eres un asistente del proyecto proyecto_egis. A continuación solo el texto de la PÁGINA ${numeroPagina} del documento "${nombreArchivo}".

Tu tarea: resume ÚNICAMENTE la información más importante de ESTA página (fechas, montos, partes, requisitos, datos relevantes para trámites). Responde en español, breve y con viñetas (•). No inventes datos.

--- PÁGINA ${numeroPagina} ---
${textoPagina}
--- FIN ---`;
    return this.askGPT(prompt);
  }
}
