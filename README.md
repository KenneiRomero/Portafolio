# Portafolio - Terminal de Comando Interdimensional

Este proyecto es un portafolio interactivo diseñado para GitHub Pages que simula una **interfaz de sistema operativo retro / sci-fi**.
Está pensado para funcionar como una experiencia: el visitante "habla" con el sistema a través de comandos y abre ventanas que contienen proyectos, CV y un formulario de contacto.

## Estructura de archivos
- `index.html` - Página principal
- `styles.css` - Estilos con estética neon/glitch
- `script.js` - Lógica de comandos y ventanas
- `assets/photo_placeholder.svg` - Placeholder para tu foto (reemplaza con tu imagen)
- `assets/favicon.svg` - Ícono

## Comandos principales
- `LISTAR_PROYECTOS`
- `VER_PROYECTO <n>`
- `EJECUTAR_CV`
- `DATOS_CONTACTO`
- `EJECUTAR_DEMO <n>`
- `AYUDA`

## Personalización rápida
- Reemplaza `assets/photo_placeholder.svg` por tu foto real (misma ruta y nombre).
- Cambia el correo y enlaces en `script.js` dentro de la función `datosContacto`.
- Ajusta paleta en `styles.css` modificando la variable `--neon`.

## Deploy en GitHub Pages
1. Crea un repo nuevo (ej: `ksr-portfolio`).
2. Sube los archivos (puedes arrastrar el contenido de este ZIP).
3. En Settings → Pages elige la rama `main` y carpeta `/ (root)`.

¡Listo! El sitio debería estar disponible en `https://<tu-usuario>.github.io/<repo>/`.

