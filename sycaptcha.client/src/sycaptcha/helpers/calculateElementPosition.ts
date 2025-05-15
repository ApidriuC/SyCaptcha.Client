import { Position } from "@types";
import { RefObject } from "react";

/**
* Calcula la posición de un elemento en relación con otro elemento.
* 
* @param {RefObject<HTMLElement | null>} elementPosition - Referencia al elemento cuya posición se usará para posicionar el otro elemento.
* @param {RefObject<HTMLElement | null>} elementToPosition - Referencia al elemento que se va a posicionar.
* @returns {Position} - Un objeto con las propiedades `top` y `left` para posicionar el elemento.
*/
export const calculateElementPosition = (
    elementPosition: RefObject<HTMLElement | null>,
    elementToPosition: RefObject<HTMLElement | null>
): Position => {
    const defaultPostion = { top: "0px", left: "0px" };

    const notExists = !elementPosition?.current || !elementToPosition?.current;
    if (notExists) return defaultPostion;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const targetRect = elementPosition?.current?.getBoundingClientRect();
    if (!targetRect) throw new ReferenceError('Error: No se encontró la posición a definir.');

    let left = targetRect.left - targetRect.width - 25;
    let top = targetRect.bottom - targetRect.height - 25;

    const elementToAssign = elementToPosition.current;
    if (!elementToAssign) throw new ReferenceError('Error: No se encontró el elemento a posicionar.');

    // No space below, move to the top.
    if (top + elementToAssign.offsetHeight > viewportHeight) {
        top = targetRect.top - elementToAssign.offsetHeight - 10;
    }

    // No space to the right, move to the left.
    if (left + elementToAssign.offsetWidth > viewportWidth) {
        left = viewportWidth - elementToAssign.offsetWidth - 10;
    }

    return { top: `${top}px`, left: `${left}px` }
};