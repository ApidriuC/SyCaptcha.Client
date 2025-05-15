import { Loading } from "@components";
import { LOADING_DELAY } from "@constants";
import { SyCaptchaBaseProps, SyCaptchaProps } from "@types";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

/**
* Propiedades del contexto privado de SyCaptcha.
*/
export interface SyCaptchaPrivateContextProps extends SyCaptchaBaseProps {
    apiUrl: string;
    apiUserName: string;
    apiUserPassword: string;
    isExpired: boolean;
    isVerified: boolean;
    encryptedData: string;
    showLoading: () => void;
    hiddeLoading: () => void;
    setIsExpired: (value: boolean) => void;
    setIsVerified: (value: boolean) => void;
    setEncryptedData: (value: string) => void;
}

/**
* Propiedades del proveedor privado de SyCaptcha.
*/
export interface SyCaptchaPrivateProviderProps extends SyCaptchaProps {
    isVerified: boolean;
    setIsVerified: (value: boolean) => void;
    children: React.ReactNode;
}

/**
* Contexto privado de SyCaptcha que maneja el estado y la lógica interna de la verificación.
*/
const SyCaptchaPrivateContext = createContext<SyCaptchaPrivateContextProps | undefined>(undefined);

/**
* Hook personalizado para acceder al contexto privado de SyCaptcha.
* 
* @throws Error si se usa fuera de un <SyCaptchaPrivateProvider>.
* @returns El contexto privado con los valores actuales de verificación y configuración.
*/
export const usePrivateSyCaptcha = () => {
    const context = useContext(SyCaptchaPrivateContext);
    if (!context) throw new Error("Error: usePrivateSyCaptcha debe ser usado dentro de un SyCaptchaPrivateProvider");
    return context;
}

/**
* Componente proveedor del contexto privado de SyCaptcha. 
* 
* @param {SyCaptchaPrivateProviderProps} props - Propiedades del proveedor que incluyen los parámetros de configuración del captcha.
* 
* @description
* Este componente es responsable de manejar el estado relacionado con la verificación, expiración, y carga del captcha.
*/
export const SyCaptchaPrivateProvider = ({
    apiUrl,
    apiUserName,
    apiUserPassword,
    expirationTime,
    difficulty,
    isVerified,
    setIsVerified,
    children
}: SyCaptchaPrivateProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const [encryptedData, setEncryptedData] = useState('');
    const loadingTimer = useRef<NodeJS.Timeout | null>(null);

    const showLoading = useCallback(() => {
        loadingTimer.current = setTimeout(() =>
            setIsLoading(true), LOADING_DELAY);
    }, []);

    const hiddeLoading = useCallback(() => {
        if (loadingTimer.current) {
            clearTimeout(loadingTimer.current);
            loadingTimer.current = null;
        }
        setIsLoading(false);
    }, []);

    // Set expiration time.
    const secondsExpiration = expirationTime * 1000;
    useEffect(() => {
        if (!isVerified) return;

        setIsExpired(false);
        const timer = setTimeout(() => {
            setIsVerified(false);
            setIsExpired(true);
        }, secondsExpiration);

        return () => clearTimeout(timer);
    }, [isVerified, secondsExpiration]);

    const memoContextValues = useMemo(() => ({
        apiUrl,
        apiUserName,
        apiUserPassword,
        isExpired,
        isVerified,
        difficulty,
        encryptedData,
        expirationTime,
        showLoading,
        hiddeLoading,
        setIsExpired,
        setIsVerified,
        setEncryptedData
    }), [
        apiUrl,
        apiUserName,
        apiUserPassword,
        isExpired,
        isVerified,
        difficulty,
        encryptedData,
        expirationTime,
        showLoading,
        hiddeLoading,
        setIsExpired,
        setIsVerified,
        setEncryptedData
    ]);

    return (
        <SyCaptchaPrivateContext.Provider value={memoContextValues}>
            {children}
            {isLoading ? <Loading /> : null}
        </SyCaptchaPrivateContext.Provider>
    );
};
