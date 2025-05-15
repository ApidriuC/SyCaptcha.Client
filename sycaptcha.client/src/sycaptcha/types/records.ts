/**
* Respuesta del servicio de generación de imágenes. 
*/
export interface ImagesCaptchaRecord {
    id: string,
    source: string
}

/**
* Respuesta del servicio de generación de imágenes.
*/
export interface GenerateImagesRecord {
    jsonEncryptedData: string;
    letterGenerated: string;
    images: ImagesCaptchaRecord[];
}

/**
* Respuesta del servicio de validación de imágenes.
*/
export interface ValidateImagesRecord {
    isSuccess: boolean;
}