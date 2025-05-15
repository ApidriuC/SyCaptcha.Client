import { Form } from "@components";
import { useCheckboxState } from "@hooks";
import { useCallback, useRef, useState } from "react";

/**
 * Componente `Checkbox`
 *
 * @description
 * Renderiza el checkbox inicial del captcha personalizado. Al hacer clic,
 * alterna la visibilidad del formulario gráfico del captcha (`SyCaptchaForm`).
 */
export const Checkbox = () => {
    const [isVisible, setIsVisible] = useState(false);
    const checkboxRef = useRef<HTMLButtonElement>(null);

    const classNameCheckbox = useCheckboxState();
    const toggleFormVisibility = useCallback(() => setIsVisible(prev => !prev), []);

    return (
        <>
            <label className='captcha_checkbox'>
                <button
                    ref={checkboxRef}
                    className={`bg_checkbox ${classNameCheckbox}`}
                    onClick={toggleFormVisibility}
                />
                <span>No soy un robot</span>
            </label>

            {/* Render images */}
            <Form
                isVisible={isVisible}
                positionRef={checkboxRef}
                setIsVisible={setIsVisible}
            />
        </>
    );
}