import { REFRESH_TIME } from "@constants";
import { useCallback, useEffect, useState } from "react";

/**
* Hook personalizado que maneja un temporizador para el refresco de imágenes con un tiempo de espera.
* 
* @returns - Un objeto con las propiedades `refreshCooldown` y `onRefreshImages`. 
* `refreshCooldown` indica el tiempo restante para el próximo refresco y `onRefreshImages` es la función para iniciar el refresco.
*/
export const useRefreshTime = () => {
    const [refreshCooldown, setRefreshCooldown] = useState(0);

    const refreshImages = useCallback(() => {
        if (refreshCooldown > 0) return;
        setRefreshCooldown(REFRESH_TIME);
    }, [refreshCooldown]);

    useEffect(() => {
        if (refreshCooldown === 0) return;

        const countDown = setInterval(() => {
            setRefreshCooldown(prev => {
                if (prev > 1) return prev - 1;

                clearInterval(countDown);
                return 0;
            });
        }, 1000);

        return () => clearInterval(countDown);
    }, [refreshCooldown]);

    return { refreshCooldown, onRefreshImages: refreshImages }
}