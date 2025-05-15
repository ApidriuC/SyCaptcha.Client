import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";

const currentRoot = document.getElementById('root') as HTMLElement | null;
if (!currentRoot) throw new Error('No existe el elemento root.');

createRoot(currentRoot).render(
    <StrictMode>
        <App />
    </StrictMode>
);
