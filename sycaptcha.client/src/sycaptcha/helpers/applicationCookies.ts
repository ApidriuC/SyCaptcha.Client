import { COOKIE_NAMES } from "@constants";

/**
* Función que maneja la obtención y establecimiento de cookies relacionadas con la aplicación.
* 
* @returns Un objeto que contiene el token de la cookie actual y una función para establecer el token.
*/
export const applicationCookies = () => {
    const cookies = document.cookie;

    return {
        /**
        * Obtiene el valor del token de la cookie, si está presente.
        * 
        * @returns El valor del token almacenado en la cookie, o `null` si no se encuentra.
        */
        token: getCookieValue(cookies, COOKIE_NAMES.TOKEN),

        /**
        * Establece el valor del token en la cookie.
        * 
        * @param value El valor a establecer para la cookie del token. Si es `null`, elimina la cookie.
        */
        setToken: (value: string | null) => setApplicationCookie(COOKIE_NAMES.TOKEN, value)
    };
};

/**
* Obtiene el valor de una cookie por su nombre.
* 
* @param cookies - La cadena de cookies actual obtenida de `document.cookie`.
* @param cookieName - El nombre de la cookie que se quiere buscar.
* 
* @returns El valor de la cookie si está presente, o `null` si no se encuentra.
*/
const getCookieValue = (cookies: string, cookieName: string): string | null => {
    const cookieMatch = cookies.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    return cookieMatch ? cookieMatch[2] : null;
};

/**
* Establece el valor de una cookie de la aplicación.
* 
* @param cookieName - El nombre de la cookie a establecer.
* @param value - El valor a asignar a la cookie. Si es `null`, elimina la cookie.
* @param expiresDays - El número de días hasta que la cookie expire. El valor predeterminado es 30 días.
*/
const setApplicationCookie = (cookieName: string, value: string | null, expiresDays: number = 30) => {
    let expires: string;

    if (!value) { // Set cookie null
        const pastDate = new Date(0).toUTCString();
        expires = `expires=${pastDate}`;
    }
    else {
        const date = new Date();
        date.setTime(date.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
        expires = `expires=${date.toUTCString()}`;
    }

    document.cookie = `${cookieName}=${value}; ${expires}; path=/`;
};
