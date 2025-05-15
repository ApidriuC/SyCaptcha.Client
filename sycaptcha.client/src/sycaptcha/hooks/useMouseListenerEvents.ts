import { MOUSE_EVENTS, POINTS_EVENTS, POINTS_SUCCES, TOUCH_EVENTS } from "@constants";
import { usePrivateSyCaptcha } from "@contexts";
import { RefObject, useCallback, useEffect, useState } from "react";

/**
* Propiedades del hook `useMouseListenerEvents`.
*/
export interface UseMouseListenerEventsProps {
    /**
    * Referencia al elemento HTML que se desea escuchar para eventos de mouse/touch.
    */
    elementRef: RefObject<HTMLElement | null>;
}

/**
* Hook para manejar los eventos de interacción del mouse y toque en un elemento.
* 
* @param {Object} elementRef - Referencia al elemento HTML que se desea escuchar para eventos de mouse/touch.
* @returns - Objeto con la función `validatePoints` que valida si se alcanzaron los puntos necesarios.
*/
export const useMouseListenerEvents = ({ elementRef }: UseMouseListenerEventsProps) => {
    const [points, setPoints] = useState<number>(0);
    const { difficulty } = usePrivateSyCaptcha();

    const resetPoints = useCallback(() => setPoints(0), []);

    const isInsideElement = useCallback((x: number, y: number): boolean => {
        const element = elementRef?.current;
        if (!element) return false;

        const { left, right, top, bottom } = element.getBoundingClientRect();
        return x >= left && x <= right && y >= top && y <= bottom;
    }, [elementRef]);

    const handleEvent = useCallback((e: Event) => {
        const coords = getCoordinates(e as MouseEvent | TouchEvent);
        if (coords && isInsideElement(coords?.x, coords?.y)) {
            const value = calculatePoints(e);
            setPoints(prev => prev + value);
        }
    }, [isInsideElement]);

    const validatePoints = useCallback(() => {
        const pointsSuccess = POINTS_SUCCES[difficulty];
        return points >= pointsSuccess;
    }, [points, difficulty]);

    useEffect(() => {
        const element = elementRef?.current;
        if (!element) {
            resetPoints();
            return;
        };

        element.addEventListener(TOUCH_EVENTS.TOUCH_START, handleEvent);
        element.addEventListener(TOUCH_EVENTS.TOUCH_END, handleEvent);
        element.addEventListener(TOUCH_EVENTS.TOUCH_MOVE, handleEvent);

        element.addEventListener(MOUSE_EVENTS.MOUSE_UP, handleEvent);
        element.addEventListener(MOUSE_EVENTS.MOUSE_DOWN, handleEvent);
        element.addEventListener(MOUSE_EVENTS.MOUSE_MOVE, handleEvent);

        return () => {
            element.removeEventListener(TOUCH_EVENTS.TOUCH_START, handleEvent);
            element.removeEventListener(TOUCH_EVENTS.TOUCH_END, handleEvent);
            element.removeEventListener(TOUCH_EVENTS.TOUCH_MOVE, handleEvent);

            element.removeEventListener(MOUSE_EVENTS.MOUSE_UP, handleEvent);
            element.removeEventListener(MOUSE_EVENTS.MOUSE_DOWN, handleEvent);
            element.removeEventListener(MOUSE_EVENTS.MOUSE_MOVE, handleEvent);
        };
    }, [elementRef.current, handleEvent]);

    return { validatePoints, resetPoints };
}

/**
* Función que calcula la cantidad de puntos obtenidos según el tipo de evento.
* 
* @param {Event} event - El evento de mouse o toque.
* @returns {number} - El valor de los puntos correspondientes al tipo de evento.
*/
const calculatePoints = (event: Event): number =>
    POINTS_EVENTS[event.type?.toUpperCase()] ?? 0;

/**
* Función que obtiene las coordenadas (x, y) de un evento de mouse o toque.
* 
* @param {MouseEvent | TouchEvent} event - El evento de mouse o toque.
* @returns {Object | null} - Un objeto con las coordenadas x, y o `null` si no se pudieron obtener.
*/
const getCoordinates = (event: MouseEvent | TouchEvent): { x: number, y: number } | null => {
    if (event instanceof MouseEvent) {
        return { x: event.clientX, y: event.clientY };
    }

    const touch = (event.touches[0] || event.changedTouches[0]);
    return touch ? { x: touch.clientX, y: touch.clientY } : null;
};