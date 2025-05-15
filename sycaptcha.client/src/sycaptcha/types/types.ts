/**
* Nivel de dificultad.
*/
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

/**
* Estados del sycaptcha.
*/
export type SyCaptchaState = 'unchecked' | 'success' | 'expired';

/**
* Métodos HTTP.
*/
export type HttpMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

/**
* Propiedades base del componente SyCaptcha.
*/
export interface SyCaptchaBaseProps {
    /**
    * Nivel de dificultad para la verificiación y generación de imágenes.
    */
    difficulty: Difficulty;

    /**
    * Segundos de expiración. una vez compeltado el desafío.
    */
    expirationTime: number;
}

/**
* Propiedades del componente SyCaptcha.
*/
export interface SyCaptchaProps extends SyCaptchaBaseProps {
    /**
    * URL de la API SyCaptcha.
    */
    apiUrl: string;

    /**
    * Usuario de aplicación para autenticarse.
    */
    apiUserName: string;

    /**
    * Contraseña para autenticarse.
    */
    apiUserPassword: string;
}

/**
* Indica la posición de un elemento.
*/
export interface Position {
    /**
    * Posición superior.
    */
    top: string;

    /**
    * Posición inferior.
    */
    left: string;
}