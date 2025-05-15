# SyCaptcha.Client

**SyCaptcha** es un componente de captcha altamente seguro y fácil de usar, desarrollado para **Sistemas y Computadores S.A**. Diseñado para integrarse con formularios web, protege contra el abuso, el spam y los envíos automatizados, validando que el usuario sea realmente humano mediante desafíos visuales e interactivos.

## 🚀 Características principales

- Verificación avanzada de usuarios humanos.
- Desafíos visuales personalizados con imágenes dinámicas.
- Seguimiento de interacciones del usuario (movimientos del mouse, clics, toques, etc).
- Configuración de dificultad ajustable.
- Expiración personalizada de la validación.
- Totalmente integrable en proyectos frontend modernos.

## 🧠 ¿Cómo funciona?

### 🔐 Verificación visual

El componente genera imágenes en formato base64 que incluyen:

- **Letras aleatorias** del abecedario ubicadas en posiciones variables.
- Cambios aleatorios en **tamaño, fuente, rotación y tipografía**.
- **Puntos dispersos en el fondo** para dificultar la lectura automática.

Estas imágenes se usan como prueba visual que debe ser reconocida por un usuario humano.

### 🧩 Interacción humana

Además de la imagen, SyCaptcha evalúa la interacción del usuario con el componente mediante:

- **Movimientos del mouse o toques en pantalla.**
- **Clics, levantamientos del botón del ratón, zoom, etc.**
- Estos patrones se validan contra **rangos dinámicos definidos por la dificultad**, lo que ayuda a garantizar una verificación genuina.

### ⏳ Tiempo de expiración

- Cada intento de captcha tiene un **tiempo de caducidad configurable**, que asegura que la validación sea reciente.
- Esto previene el uso de imágenes guardadas o manipuladas por bots.

## ⚙️ Personalización

SyCaptcha permite ajustar fácilmente:

- **Nivel de dificultad.**
- **Estilos visuales del componente.**
- **Mensajes de respuesta y feedback para el usuario.**
- **Tiempo máximo para completar el captcha.**

## 🛠️ Instalación y uso

```bash
# Ejemplo de instalación si se publica por npm:
npm install sycaptcha-client@latest
```


## 🏢 Créditos

Este componente fue desarrollado por Andrés Felipe Londoño Campos para la empresa Sistemas y Computadores S.A, como parte de un ecosistema de soluciones antifraude y validación de usuarios en aplicaciones web modernas.
