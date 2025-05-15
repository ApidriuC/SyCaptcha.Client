import React from "react";

/**
* Propiedades del encabezado del formulario de captcha.
*/
export interface HeaderProps {
    /**
    * Letra generada para el captcha.
    */
    letterGenerated: string;

    /**
    * Mensaje informativo a mostrar al usuario.
    */
    informationMessage: string;

    /**
    * Función a ejecutar al cerrar el formulario.
    */
    onClose: () => void;
}

/**
 * Componente del encabezado del formulario de captcha.
 * 
 * @param {HeaderProps} props - Propiedades del componente.
 * @returns - El encabezado del formulario con la letra a seleccionar, el mensaje informativo y un botón de cierre.
 */
export const Header = React.memo(({ letterGenerated, informationMessage, onClose }: HeaderProps) => {
    return (
        <header>
            <h2>Selecciona todas las imágenes que muestran la letra '{letterGenerated}'</h2>
            <span className='proccess_message' dangerouslySetInnerHTML={{ __html: informationMessage }}></span>
            <button className='button_close' onClick={onClose} />
        </header>
    );
});