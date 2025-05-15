import { SyCaptchaPrivateProvider } from "@contexts";
import { SyCaptchaProps } from "@types";
import { createContext, useContext, useMemo, useState } from "react";

/**
* Propiedades expuestas del contexto público de SyCaptcha.
*/
export interface SyCaptchaContextProps {
    /**
    * Indica si el captcha ha sido verificado correctamente.
    */
    isVerified: boolean;
}

/**
* Propiedades del proveedor público de SyCaptcha.
*/
export interface SyCaptchaProviderProps extends SyCaptchaProps {
    /**
    * Componentes hijos que se renderizarán dentro del proveedor.
    */
    children: React.ReactNode;
}

/**
* Contexto público de SyCaptcha que expone si el captcha ha sido verificado correctamente.
*/
const SyCaptchaContext = createContext<SyCaptchaContextProps | undefined>(undefined);

/**
* Hook personalizado para acceder al contexto público de SyCaptcha.
*
* @throws Error si se utiliza fuera del SyCaptchaProvider.
* @returns Un objeto que indica si el captcha ha sido verificado (`isVerified`).
*/
export const useSyCaptcha = () => {
    const context = useContext(SyCaptchaContext);
    if (!context) throw new Error("Error: useSyCaptcha debe ser usado dentro de un SyCaptchaProvider");
    return context;
}

/**
* Proveedor principal del contexto de SyCaptcha.
*
* @param props - Propiedades necesarias para configurar el proveedor de SyCaptcha.
* 
* @description
* Este componente gestiona el estado de verificación (`isVerified`) y lo expone mediante el contexto.
* También encapsula el proveedor privado (`SyCaptchaPrivateProvider`) que maneja detalles internos
* como la dificultad y el tiempo de expiración del captcha.
*/
export const SyCaptchaProvider = ({
    apiUrl,
    apiUserName,
    apiUserPassword,
    expirationTime,
    difficulty,
    children
}: SyCaptchaProviderProps) => {
    const [isVerified, setIsVerified] = useState(false);
    const memoContextValues = useMemo(() => ({ isVerified }), [isVerified]);

    return (
        <SyCaptchaPrivateProvider
            apiUrl={apiUrl}
            apiUserName={apiUserName}
            apiUserPassword={apiUserPassword}
            difficulty={difficulty}
            expirationTime={expirationTime}
            isVerified={isVerified}
            setIsVerified={setIsVerified}
        >
            <SyCaptchaContext.Provider value={memoContextValues}>
                {children}
            </SyCaptchaContext.Provider>
        </SyCaptchaPrivateProvider>
    );
}