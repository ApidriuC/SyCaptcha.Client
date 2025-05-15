import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { PropagateLoader } from "react-spinners";

/**
 * Componente `Loading`.
 * 
 * @description
 * Muestra un spinner de carga animado usando `framer-motion` y `react-spinners`,
 * renderizado mediante `ReactDOM.createPortal` directamente en el `<body>`.
 */
export const Loading = () => {
    return (
        ReactDOM.createPortal(
            <AnimatePresence>
                <motion.div
                    className='loading-spinner-container'
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <PropagateLoader className="loading-spinner" />
                </motion.div>
            </AnimatePresence>,
            document.body
        )
    );
}