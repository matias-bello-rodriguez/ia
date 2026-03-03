/**
 * URL base del backend Django (API REST).
 * Usa la configuración de entorno para mayor flexibilidad.
 */
import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.apiBaseUrl;
