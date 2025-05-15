import { ContainerImages, Footer, Header } from "@components";
import { useSyCaptchaForm } from "@hooks";
import { AnimatePresence, motion } from "framer-motion";
import { RefObject, useRef } from "react";
import ReactDOM from "react-dom";

/**
* Propiedades del fomulario de imágenes del captcha.
*/
export interface FormProps {
    /**
    * Indica si el formulario está visible.
    */
    isVisible: boolean;

    /**
    * Elemento de referencia donde se invocará el formulario en la pantalla.
    */
    positionRef: RefObject<HTMLElement | null>;

    /**
    * Modifica la visibilidad del formulario.
    */
    setIsVisible: (value: boolean) => void;
}

/**
 * Componente del formulario del captcha con el desafío a resolver.
 * 
 * @param {FormProps} props - Propiedades del componente.
 * @returns - Un formulario con imágenes para seleccionar, encabezado informativo y pie de página con botones para interactuar.
 */
export const Form = ({ isVisible, setIsVisible, positionRef }: FormProps) => {
    const elementRef = useRef<HTMLDivElement>(null);

    const {
        images,
        position,
        userMessage,
        letterGenerated,
        refreshCooldown,
        selectedImageIds,
        isHiddenForm,
        onRefreshImages,
        onSelectImage,
        onVerifyImages
    } = useSyCaptchaForm({ isVisible, elementRef, positionRef, setIsVisible });

    return ReactDOM.createPortal(
        <AnimatePresence>
            {!isHiddenForm && (
                <motion.div
                    ref={elementRef}
                    className='dialog_challenge_images'
                    style={{ top: position.top, left: position.left }}
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.75 }}
                    exit={{ opacity: 0, scale: 0 }}
                >
                    <section>
                        <Header
                            informationMessage={userMessage}
                            letterGenerated={letterGenerated}
                            onClose={() => setIsVisible(false)}
                        />
                        <ContainerImages
                            images={images}
                            selectedImageIds={selectedImageIds}
                            onSelectImage={onSelectImage}
                        />
                        <Footer
                            refreshCooldown={refreshCooldown}
                            countImages={selectedImageIds.length}
                            onVerifyImages={onVerifyImages}
                            onRefreshImages={onRefreshImages}
                        />
                    </section>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}