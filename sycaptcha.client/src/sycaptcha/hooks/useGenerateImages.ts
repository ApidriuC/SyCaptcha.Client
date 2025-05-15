import { END_POINTS_API } from "@constants";
import { usePrivateSyCaptcha } from "@contexts";
import { useRegularFetch } from "@hooks";
import { GenerateImagesRecord, ImagesCaptchaRecord } from "@types";
import { useCallback, useState } from "react";

/**
* Hook para generar imágenes de captcha.
* 
* @returns - Objeto con los valores `letterGenerated`, `images` y la función `generateImages`.
*/
export const useGenerateImages = () => {
    const [images, setImages] = useState<ImagesCaptchaRecord[]>([]);
    const [letterGenerated, setLetterGenerated] = useState<string>('');

    const { fetch } = useRegularFetch();
    const { difficulty, setEncryptedData } = usePrivateSyCaptcha();

    const generateImages = useCallback(async () => {
        const { ok, data } = await fetch({
            url: END_POINTS_API.IMAGES,
            body: { difficulty }
        });

        if (ok) {
            const { letterGenerated, images, jsonEncryptedData }: GenerateImagesRecord = data;
            setImages(images);
            setLetterGenerated(letterGenerated);
            setEncryptedData(jsonEncryptedData);
        }
    }, [difficulty]);

    return { letterGenerated, images, generateImages };
}