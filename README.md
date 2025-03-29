# FloraPlusDocs
Este sitio se desarrolló utilizando [Docusaurus](https://docusaurus.io/), un generador moderno de páginas estaticás.
## Instalación del proyecto

Clonar el repositorio en su computadora utilizando el siguente comando en la terminal
```
git clone https://github.com/VicDel05/FloraPlusDocs.git
```
Una vez clonado, debe asegurarse de instalar las dependencias necesarias para el proyecto ejecuntano el comando de instalación
```
npm install
```
Espere que se complete el proceso de instalación, puede demorar unos segundos (o minutos depende de su equipo)

## Ejecución del servidor de desarrollo
Una vez terminado el proceso de instalación corroboráremos que todo este en orden, nos dirigimos a la terminal y ejecutamos el script para levantar el servidor local
```
npm start
```
Si no surgen errores se debe mostrar estos mensajes en la terminal, así mismo, una pestaña en su navegador se abrirá con la página iniciada
```
> flora-plus-docs@0.0.0 start
> docusaurus start

[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```
## Desplegar sitio en GitHub Pages

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
