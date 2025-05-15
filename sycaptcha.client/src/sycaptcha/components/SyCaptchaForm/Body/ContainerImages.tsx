import { ImageItem } from "@components";
import { ImagesCaptchaRecord } from "@types";

/**
* Propiedades del contenedor de imágenes.
*/
export interface ContainerImagesProps {
    /**
    * Imagenes a mostrar en el captcha.
    */
    images: ImagesCaptchaRecord[];

    /**
    * Id de las imágenes seleccionadas por el usuario.
    */
    selectedImageIds: string[];

    /**
    * Función a ejecutar al seleccionar una imagen.
    */
    onSelectImage: (id: string) => void;
}

/**
 * Componente para mostrar un conjunto de imágenes en el captcha.
 * 
 * @param {ContainerImagesProps} props - Propiedades del componente.
 * @returns - Un contenedor con las imágenes a mostrar, donde cada una es interactiva y puede ser seleccionada.
 */
export const ContainerImages = ({ images, selectedImageIds, onSelectImage }: ContainerImagesProps) => {
    return (
        <div className='container_images'>
            {images.map(image =>
                <ImageItem
                    key={image.id}
                    id={image.id}
                    src={image.source}
                    isSelected={selectedImageIds.includes(image.id)}
                    onClick={() => onSelectImage(image.id)}
                />
            )}
        </div>
    );
}