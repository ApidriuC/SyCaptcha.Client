import { ANIMATIONS } from "@constants";

/**
* Propiedades para mostrar un mensaje al usuario.
*/
export interface ShowUserMessageProps {
    /**
    * Título del mensaje a mostrar.
    */
    title?: string;

    /**
    * Contenido del mensaje a mostrar.
    */
    message: string;
}

/**
* Muestra un mensaje personalizado al usuario.
*
* @param {Object} props - Propiedades para personalizar el mensaje.
* @param {string} props.title - Título del mensaje a mostrar.
* @param {string} props.message - Contenido del mensaje a mostrar.
*/
export const showUserMessage = ({ title, message }: ShowUserMessageProps) => {
    const dialog = document.createElement('div');
    dialog.className = `user_alert_popup_sycaptcha us_bg animate__animated ${ANIMATIONS.fadeIn}`;
    dialog.innerHTML = `
        <div class='us_dialog'>
            <section class="us_body_sycaptcha">
                <header>
                    <div class="icon_mark">
                        <span class="x-mark">
                            <span class="x-mark-line-left"></span>
                            <span class="x-mark-line-right"></span>
                        </span>
                    </div>
                    <h2>${title}</h2>
                </header>
                <section class="us_message_sycaptcha">
                    <p>${message}</p>
                </section>
                <footer>
                    <button class="us_alert_button">
                        Aceptar
                    </button>
                </footer>
            </section>
        </div>
    `;

    addEventCloseDialog(dialog);
    addCloseOutsideDialog(dialog);
    document.body.appendChild(dialog);
}

const addEventCloseDialog = (dialog: HTMLElement) => {
    const closeButton = dialog.querySelector('.us_alert_button');
    closeButton?.addEventListener('click', () => onCloseDialog(dialog));
};

const addCloseOutsideDialog = (dialog: HTMLElement) => {
    const content = dialog.querySelector('.us_dialog');

    dialog.addEventListener('click', (e) => {
        const target = e.target as Node;
        const isOutside = !content?.contains(target);
        if (isOutside) onCloseDialog(dialog);
    });
}

const onCloseDialog = (dialog: HTMLElement) => {
    dialog.classList.remove(ANIMATIONS.fadeIn);
    dialog.classList.add(ANIMATIONS.fadeOut);
    setTimeout(() => dialog.remove(), 500);
}