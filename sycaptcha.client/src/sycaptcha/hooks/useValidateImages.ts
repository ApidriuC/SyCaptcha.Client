import { END_POINTS_API } from "@constants";
import { usePrivateSyCaptcha } from "@contexts";
import { useRegularFetch } from "@hooks";
import { ValidateImagesRecord } from "@types";
import { useCallback } from "react";

/**
* Hook para la validación de imágenes seleccionadas en el captcha.
* 
* @returns - Función para validar las imágenes:
*   - `validateImages`: Función para validar las imágenes seleccionadas en el captcha.
*/
export const useValidateImages = () => {
    const { fetch } = useRegularFetch();
    const { encryptedData, setIsVerified } = usePrivateSyCaptcha();

    const validateImages = useCallback(async (imageIds: string[]) => {
        const { ok, data } = await fetch({
            url: END_POINTS_API.VERIFY,
            body: {
                imageIds,
                JsonEncryptedData: encryptedData
            }
        });

        if (ok) {
            const { isSuccess }: ValidateImagesRecord = data;
            setIsVerified(isSuccess);
            return isSuccess;
        }
        else return false;
    }, [encryptedData]);

    return { validateImages };
};