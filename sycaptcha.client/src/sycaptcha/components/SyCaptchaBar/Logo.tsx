import { syCaptchaLogo } from '@assets';

/**
 * Componente `Logo`
 *
 * @description
 * Renderiza el logotipo principal del sistema SyCaptcha.
 * Este logotipo se muestra como parte visual del componente captcha.
 */
export const Logo = () => {
    return (
        <div className='container_logo'>
            <img src={syCaptchaLogo} alt='SyCaptcha Logo' />
        </div>
    );
};