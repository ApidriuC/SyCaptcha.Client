import { DEFAULT_HTTP_HEADERS } from "@constants";
import { HttpMethod } from "@types";

/**
* Propieades para realizar una solicitud HTTP al servidor.
*/
export interface ServerFetchProps {
    /**
    * URL del endpoint.
    */
    url: string;

    /**
    * Método HTTP a utilizar.
    */
    method?: HttpMethod;

    /**
    * Cuerpo de la solicitud.
    */
    body?: object;

    /**
    * Encabezados de la solicitud.
    */
    headers?: Record<string, string>;
}

/**
* Realiza la solicitud interna al servidor con los parámetros de la petición HTTP.
*
* @param {RegularFetchProps} props - Parámetros de la solicitud.
* @param {string} props.url - URL del endpoint.
* @param {string} props.method - Método HTTP.
* @param {any} [props.body] - Cuerpo de la solicitud.
* @param {Record<string, string>} props.headers - Encabezados de la solicitud.
* 
* @returns {Promise<Response>} - Respuesta del servidor a la solicitud HTTP.
*/
export const serverFetch = async ({
    url,
    body,
    headers,
    method = 'POST'
}: ServerFetchProps): Promise<Response> => {
    const options: RequestInit = {
        method: method ?? 'POST',
        headers: {
            ...DEFAULT_HTTP_HEADERS,
            ...headers
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : null
    }

    return await fetch(url, options);
}