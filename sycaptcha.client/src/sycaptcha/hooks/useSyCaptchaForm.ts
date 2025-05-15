import { FormProps } from "@components";
import { DEFAULT_POSITION, USER_MESSGAGES } from "@constants";
import { usePrivateSyCaptcha } from "@contexts";
import { calculateElementPosition } from "@helpers";
import { useGenerateImages, useMouseListenerEvents, useRefreshTime, useValidateImages } from "@hooks";
import { Position } from "@types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
* Propiedades del hook `useSyCaptchaForm`.
*/
export interface UseSyCaptchaFormProps extends FormProps {
    /**
    * Referencia al elemento HTML que controla la posición del formulario.
    */
    elementRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook que maneja la lógica y el estado de un formulario de verificación de captcha.
 * 
 * @param {UseSyCaptchaFormProps} props - Propiedades del formulario de captcha.
 * 
 * @returns - Estado y funciones relacionadas con el captcha:
 *   - `images`: Imágenes generadas para el captcha.
 *   - `position`: Posición calculada del formulario en la pantalla.
 *   - `userMessage`: Mensaje al usuario por su interacción con el formulario.
 *   - `isHiddenForm`: Determina si el formulario está oculto o no.
 *   - `letterGenerated`: Letra generada para el captcha.
 *   - `refreshCooldown`: Tiempo de espera para el refresco de imágenes.
 *   - `selectedImageIds`: Identificadores de las imágenes seleccionadas.
 *   - `onSelectImage`: Función para seleccionar o deseleccionar imágenes.
 *   - `onVerifyImages`: Función para verificar las imágenes seleccionadas.
 *   - `onRefreshImages`: Función para refrescar las imágenes.
 */
export const useSyCaptchaForm = ({
    isVisible,
    positionRef,
    elementRef,
    setIsVisible,
}: UseSyCaptchaFormProps) => {
    const captcha = useGenerateImages();
    const { letterGenerated, images } = captcha;
    const { isExpired, isVerified } = usePrivateSyCaptcha();

    // Subhooks
    const {
        position,
        updatePosition
    } = usePositionState(positionRef, elementRef);

    const {
        selectedImageIds,
        onSelectImage,
        resetSelectedImageIds
    } = useImageSelection();

    const {
        userMessage,
        resetCaptcha
    } = useCaptchaReset(resetSelectedImageIds, captcha);

    const {
        refreshCooldown,
        refreshImages
    } = useCaptchaRefresh(resetSelectedImageIds, captcha);

    const {
        resetPoints,
        onVerifyImages
    } = useCaptchaVerification(selectedImageIds, elementRef, setIsVisible, resetCaptcha);

    const isHiddenForm = useMemo(() =>
        isVerified || !isVisible || images.length === 0, [isVisible, isVerified, images.length]);

    // Save and update last reference.
    const isFirstRender = useRef(true);
    const resetCaptchaRef = useRef(resetCaptcha);

    useEffect(() => {
        resetCaptchaRef.current = resetCaptcha;
    }, [resetCaptcha]);

    // Force update when is visible.
    useEffect(() => {
        if (isFirstRender.current && isVisible) {
            resetCaptchaRef.current();
            isFirstRender.current = false;
        }

        if (isHiddenForm) resetPoints();
        else updatePosition();
    }, [isVisible, isHiddenForm, updatePosition]);

    // Reset when expired.
    useEffect(() => {
        if (isExpired) isFirstRender.current = true;
    }, [isExpired]);

    // Reset when images not loaded.
    useEffect(() => {
        const failedToLoadImages = !isFirstRender.current && isVisible && images.length === 0;
        if (failedToLoadImages) isFirstRender.current = true;
    }, [isVisible, images]);

    return {
        images,
        position,
        userMessage,
        isHiddenForm,
        letterGenerated,
        refreshCooldown,
        selectedImageIds,
        onSelectImage,
        onVerifyImages,
        onRefreshImages: refreshImages
    };
};

/**
 * Hook que maneja la posición de un elemento en la pantalla.
 * 
 * @param {React.RefObject<HTMLElement | null>} positionRef - Referencia al elemento que controla la posición.
 * @param {React.RefObject<HTMLElement | null>} elementRef - Referencia al elemento a posicionar.
 * 
 * @returns - Estado y función para actualizar la posición:
 *   - `position`: Posición actual del formulario en la pantalla.
 *   - `updatePosition`: Función para actualizar la posición.
 */
const usePositionState = (
    positionRef: React.RefObject<HTMLElement | null>,
    elementRef: React.RefObject<HTMLElement | null>
) => {
    const [position, setPosition] = useState<Position>(DEFAULT_POSITION);

    const updatePosition = useCallback(() => {
        const newPosition: Position = calculateElementPosition(positionRef, elementRef);
        setPosition(newPosition);
    }, [positionRef, elementRef]);

    return { position, updatePosition };
};

/**
* Hook para manejar la selección de imágenes en el captcha.
* 
* @returns - Estado y funciones relacionadas con la selección de imágenes:
*   - `selectedImageIds`: Identificadores de las imágenes seleccionadas.
*   - `onSelectImage`: Función para seleccionar o deseleccionar una imagen.
*   - `resetSelectedImageIds`: Función para resetear la selección de imágenes.
*/
const useImageSelection = () => {
    const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

    const resetSelectedImageIds = useCallback(() => {
        setSelectedImageIds([]);
    }, []);

    const onSelectImage = useCallback((id: string) => {
        setSelectedImageIds(prev =>
            prev.includes(id)
                ? prev.filter(imgId => imgId !== id)
                : [...prev, id]
        );
    }, []);

    return { selectedImageIds, onSelectImage, resetSelectedImageIds };
};

/**
* Hook para manejar el reseteo del formulario captcha.
* 
* @param {Function} resetSelectedImageIds - Función para resetear la selección de imágenes.
* @param {ReturnType<typeof useGenerateImages>} captcha - Hook que maneja la generación de imágenes.
* 
* @returns - Estado y función para resetear el captcha:
*   - `userMessage`: Mensaje al usuario.
*   - `resetCaptcha`: Función para resetear el captcha y mostrar un mensaje al usuario.
*/
const useCaptchaReset = (
    resetSelectedImageIds: () => void,
    captcha: ReturnType<typeof useGenerateImages>
) => {
    const [userMessage, setUserMessage] = useState<string>('');

    const resetCaptcha = useCallback((message: string = '') => {
        captcha.generateImages();
        resetSelectedImageIds();
        setUserMessage(message);
    }, [captcha, resetSelectedImageIds]);

    return { userMessage, resetCaptcha };
};

/**
* Hook para manejar la lógica de refresco de imágenes en el captcha.
* 
* @param {Function} resetSelectedImageIds - Función para resetear la selección de imágenes.
* @param {ReturnType<typeof useGenerateImages>} captcha - Hook que maneja la generación de imágenes.
* 
* @returns - Estado y función para refrescar las imágenes:
*   - `refreshCooldown`: Tiempo de espera para el refresco de imágenes.
*   - `refreshImages`: Función para refrescar las imágenes.
*/
const useCaptchaRefresh = (
    resetSelectedImageIds: () => void,
    captcha: ReturnType<typeof useGenerateImages>
) => {
    const { refreshCooldown, onRefreshImages } = useRefreshTime();

    const refreshImages = useCallback(() => {
        captcha.generateImages();
        onRefreshImages();
        resetSelectedImageIds();
    }, [captcha, onRefreshImages, resetSelectedImageIds]);

    return { refreshCooldown, refreshImages };
};

/**
* Hook para manejar la verificación de imágenes seleccionadas en el captcha.
* 
* @param {string[]} selectedImageIds - Identificadores de las imágenes seleccionadas.
* @param {React.RefObject<HTMLElement | null>} elementRef - Referencia al elemento del formulario.
* @param {Function} setIsVisible - Función para actualizar la visibilidad del formulario.
* @param {Function} resetCaptcha - Función para resetear el captcha.
* 
* @returns - Función para verificar las imágenes seleccionadas:
*   - `resetPoints`: Función para resetear los puntos acomulados.
*   - `onVerifyImages`: Función para verificar las imágenes seleccionadas.
*/
const useCaptchaVerification = (
    selectedImageIds: string[],
    elementRef: React.RefObject<HTMLElement | null>,
    setIsVisible: (value: boolean) => void,
    resetCaptcha: (message: string) => void
) => {
    const { validateImages } = useValidateImages();
    const { validatePoints, resetPoints } = useMouseListenerEvents({ elementRef });

    const onVerifyImages = useCallback(async () => {
        const pointsSuccess = validatePoints();
        if (!pointsSuccess) {
            resetCaptcha(USER_MESSGAGES.INCOMPLETE);
            return;
        }

        const isSuccess = await validateImages(selectedImageIds);
        if (!isSuccess) resetCaptcha(USER_MESSGAGES.ERROR);
        else setIsVisible(false);
    }, [selectedImageIds, validatePoints, validateImages, resetCaptcha, setIsVisible]);

    return { onVerifyImages, resetPoints };
};
