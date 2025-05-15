import { Checkbox, Expired, Logo } from "@components";

/**
 * Componente `Bar`
 *
 * @description
 * Renderiza los componentes principales de la barra con la lógica para 
 * desplegar el formulario del captcha.
 */
export const CaptchaBar = () => {
    return (
        <section className='component_syc_captcha'>
            <Checkbox />
            <Logo />
            <Expired />
        </section>
    );
}