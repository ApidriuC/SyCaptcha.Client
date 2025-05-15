import { Difficulty, Position } from "@types";

/**
* Rutas de los endpoints disponibles en la API de SyCaptcha.
*/
export const END_POINTS_API = {
    AUTH: 'api/auth/autenticarUsuario',
    IMAGES: 'api/images/obtenerImagenes',
    VERIFY: 'api/images/verificarImagenes',
};

/**
* Nombres de cookies utilizadas por la aplicación.
*/
export const COOKIE_NAMES = {
    TOKEN: 'sycaptcha_token',
};

/**
* Encabezados HTTP predeterminados usados en las solicitudes fetch.
*/
export const DEFAULT_HTTP_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8'
};

/**
* Mensajes predeterminados mostrados al usuario durante la interacción con el captcha.
*/
export const USER_MESSGAGES = {
    EXPIRED: 'La verificación caducó. Vuelva a marcar la casilla de verificación.',
    INCOMPLETE: "<span class='incomplete'>Una vez más...</span>",
    ERROR: "<span class='error'>Intentelo de nuevo...</span>"
};

/**
* Clases CSS utilizadas para animaciones de entrada y salida.
*/
export const ANIMATIONS = {
    fadeIn: 'animate__fadeIn',
    fadeOut: 'animate__fadeOut'
};

/**
* Tiempo de espera antes de mostrar el spinner de carga (en milisegundos).
*/
export const LOADING_DELAY = 300;

/**
* Tiempo de espera en segundos para refrescar las imágenes del captcha.
*/
export const REFRESH_TIME: number = 15;

/**
* Mensaje que indica el tiempo restante para volver a intentar.
* 
* @param {number} seconds - Segundos restantes.
* @returns {string} Mensaje formateado con los segundos.
*/
export const WAIT_MESSAGE_TO_REFRESH = (seconds: number): string => `Próximo intento en ${seconds}(s)`;

/**
* Posición por defecto utilizada para posicionar elementos relativos (top y left).
*/
export const DEFAULT_POSITION: Position = { top: '0', left: '0' };

/**
* Puntaje requerido para considerar una interacción válida, según el nivel de dificultad.
*/
export const POINTS_SUCCES: Record<Difficulty, number> = {
    Easy: 200,
    Medium: 250,
    Hard: 350
};

/**
* Asignación de puntajes a eventos según su tipo. 
* Se usa para medir la interacción del usuario.
*/
export const POINTS_EVENTS: Record<string, number> = {
    TOUCHSTART: 40,
    TOUCHEND: 40,
    TOUCHMOVE: 70,
    MOUSEUP: 5,
    MOUSEDOWN: 5,
    MOUSEMOVE: 1
};

/**
* Eventos de mouse escuchados por la aplicación para capturar interacción del usuario.
*/
export const MOUSE_EVENTS = {
    MOUSE_UP: "mouseup",
    MOUSE_DOWN: "mousedown",
    MOUSE_MOVE: "mousemove",
};

/**
* Eventos táctiles escuchados por la aplicación para capturar interacción en dispositivos móviles.
*/
export const TOUCH_EVENTS = {
    TOUCH_START: "touchstart",
    TOUCH_END: "touchend",
    TOUCH_MOVE: "touchmove",
};
