import { USER_MESSGAGES } from "@constants";
import { usePrivateSyCaptcha } from "@contexts";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Componente `Expired`
 *
 * @description
 * Muestra un mensaje cuando la validación del captcha ha expirado.
 */
export const Expired = () => {
    const { isExpired } = usePrivateSyCaptcha();

    return <AnimatePresence>
        {isExpired && (
            <motion.div
                className='container_expired'
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.75 }}
                exit={{ opacity: 0, scale: 0 }}
            >
                <p>{USER_MESSGAGES.EXPIRED}</p>
            </motion.div>
        )}
    </AnimatePresence>;
}