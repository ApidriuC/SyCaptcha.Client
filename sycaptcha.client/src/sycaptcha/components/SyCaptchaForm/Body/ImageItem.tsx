import { motion } from "framer-motion";
import React from "react";

/**
* Propiedades de las imágenes del captcha.
*/
export interface ImageItemProps {
    /**
    * Id de la imagen.
    */
    id: string;

    /**
    * Fuente de la imagen.
    */
    src: string;

    /**
    * Indica si la imagen está seleccionada.
    */
    isSelected: boolean;

    /**
    * Función a ejecutar al hacer clic en la imagen.
    */
    onClick: () => void;
}

/**
 * Componente de imagen individual para el captcha.
 * 
 * @param {ImageItemProps} props - Propiedades del componente. 
 * @returns - La imagen con animación de opacidad y clase CSS condicional según si está seleccionada o no.
 */
export const ImageItem = React.memo(({ src, isSelected, onClick }: ImageItemProps) => {
    return <motion.img
        src={src}
        alt='captcha-image'
        className={isSelected ? 'selected' : ''}
        onClick={onClick}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    />;
})