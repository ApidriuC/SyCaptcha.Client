import { usePrivateSyCaptcha } from "@contexts";
import { SyCaptchaState } from "@types";
import { useMemo } from "react";

/**
* Devuelve el estado del checkbox en función de la verificación y expiración del captcha.
* 
* @returns {SyCaptchaState} El estado del checkbox: "expired", "success" o "unchecked".
*/
export const useCheckboxState = (): SyCaptchaState => {
    const { isVerified, isExpired } = usePrivateSyCaptcha();

    return useMemo(() => {
        if (isExpired) return "expired";
        if (isVerified) return "success";
        return "unchecked";
    }, [isExpired, isVerified]);
};
