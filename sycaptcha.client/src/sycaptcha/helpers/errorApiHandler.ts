import { showUserMessage } from "@helpers";

/**
* Maneja los errores de la API y muestra un mensaje de usuario basado en el código de estado de la respuesta.
*
* @param {number} status - Código de estado de la respuesta de la API.
* @param {string} message - Mensaje adicional para incluir en el error.
* 
*  @description
*  Esta función toma un código de estado de la respuesta de la API y un mensaje opcional para mostrar un mensaje adecuado al usuario. 
*  Según el código de estado, la función determinará el mensaje y el icono correspondiente a mostrar.
*/
export const errorApiHandler = (status: number, message: string) => {
    console.error("❌ SyCaptcha error API: " + status, message);

    switch (status) {
        case 400:
            showUserMessage({
                title: "Oops!",
                message: message
            });
            break;
        case 401:
            showUserMessage({
                title: "Oops!",
                message: "Acceso denegado."
            });
            break;
        case 429:
            showUserMessage({
                title: "Demasiadas solicitudes",
                message: "Se ha superado el límite de solicitudes permitidas. Por favor, inténtelo más tarde."
            });
            break;
        case 500:
            showUserMessage({
                title: "Error interno del servidor",
                message: "Ha ocurrido un error interno, por favor comuniquese con soporte."
            });
            break;
        default:
            showUserMessage({
                title: `Error ${status}`,
                message: message
            });
            break;
    }
};