import { WAIT_MESSAGE_TO_REFRESH } from "@constants";

/**
* Propiedades para el pie de página del formulario de captcha.
*/
export interface FooterProps {
    /**
    * Número de imágenes seleccionadas por el usuario.
    */
    countImages: number;

    /**
    * Tiempo de espera para refrescar las imágenes.
    */
    refreshCooldown: number;

    /**
    * Función a ejecutar para verificar las imágenes.
    */
    onVerifyImages: () => void;

    /**
    * Función a ejecutar para refrescar las imágenes.
    */
    onRefreshImages: () => void;
}

/**
 * Componente de pie de página para el captcha SyCaptcha.
 * 
 * @param {FooterProps} props - Propiedades del componente.
 * @returns - El pie de página del captcha con botones y mensajes correspondientes.
 */
export const Footer = ({ refreshCooldown, countImages, onVerifyImages, onRefreshImages }: FooterProps) => {
    const countDownMessage = refreshCooldown > 0 ? WAIT_MESSAGE_TO_REFRESH(refreshCooldown) : '';

    return (
        <footer>
            <label className='label_refresh'>
                <button
                    className='button_refresh'
                    onClick={onRefreshImages}
                    disabled={refreshCooldown > 0}
                />
                <span>{countDownMessage}</span>
            </label>
            <button
                className='button_continue'
                onClick={onVerifyImages}
                disabled={countImages === 0}
            >
                Verificar
            </button>
        </footer>
    );
}