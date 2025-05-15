import { END_POINTS_API } from "@constants";
import { usePrivateSyCaptcha } from "@contexts";
import { applicationCookies, errorApiHandler, serverFetch, ServerFetchProps, showUserMessage } from "@helpers";

/**
* Respuesta de la función `fetch` utilizada para realizar solicitudes HTTP.
*/
export interface FetchResponse {
    /**
    * Indica si la solicitud fue exitosa.
    */
    ok: boolean;

    /**
    * Información de la respuesta HTTP.
    */
    data: any;
}

/**
* Hook que proporciona la conexión con el servidor para consumir la API de SyCaptcha
* con autenticación automática mediante JWT. En caso de expiración del token (401),
* realiza una autenticación silenciosa y reintenta la solicitud.
*
* @returns - Objeto con la función `fetch` lista para hacer peticiones autenticadas.
*/
export const useRegularFetch = () => {
    const { apiUrl, apiUserName, apiUserPassword, showLoading, hiddeLoading } = usePrivateSyCaptcha();

    const fetch = async ({ url, method, body, headers }: ServerFetchProps): Promise<FetchResponse> => {
        const { token } = applicationCookies();

        const fullUrl = `${apiUrl}/${url}`;
        const defaultHeaders: Record<string, string> = {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers
        };

        try {
            showLoading();
            let response = await serverFetch({ url: fullUrl, method, body, headers: defaultHeaders });
            const { ok, status } = response;

            // Token expired.
            if (status === 401) {
                await authenticateUser(apiUrl, apiUserName, apiUserPassword);

                // Retry the request with the new token.
                return await fetch({ url, method, body, headers });
            }

            const data = await response.json();
            if (!ok) errorApiHandler(status, data.message);

            return { ok, data };
        }
        catch (error) {
            showUserMessage({
                title: "Error de conexión",
                message: "No se pudo establecer la conexión con el servidor. Por favor, inténtelo más tarde."
            });

            console.error("❌ SyCaptcha Fetch error: ", error);
            throw error;
        }
        finally {
            hiddeLoading();
        }
    }

    return { fetch };
};

/**
* Realiza la autenticación con la API de SyCaptcha utilizando credenciales configuradas previamente
* y almacena el nuevo token JWT en las cookies mediante `applicationCookies().setToken()`.
*
* Esta función es llamada automáticamente por `useRegularFetch` cuando el token actual expira.
*
* @param {string} apiUrl - URL base de la API a la que se hará la autenticación.
* @param {string} apiUserName - Nombre de usuario configurado para autenticarse.
* @param {string} apiUserPassword - Contraseña del usuario configurado.
*
* @throws {Error} - Si la autenticación falla o la respuesta no es válida.
*/
const authenticateUser = async (
    apiUrl: string,
    apiUserName: string,
    apiUserPassword: string
) => {
    const { setToken } = applicationCookies();

    const response = await serverFetch({
        url: `${apiUrl}/${END_POINTS_API.AUTH}`,
        method: 'POST',
        body: {
            user: apiUserName,
            password: apiUserPassword
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en la autenticación: ${response.status} - ${errorText}`);
    }

    const { token } = await response.json();
    setToken(token);
};