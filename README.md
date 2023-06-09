# pj01app
 App Test PJ Neuquen 2023
 
# Proyecto de Hilla

Para este proyecto se utilizo el punto de partida que propone Hilla, para luego crear nuestra aplicación Hilla con Spring Boot. Contiene toda la configuración necesaria y algunos archivos de marcador de posición para que pueda comenzar.
Se usa una base de datos precargada en memoria con datos de test. 

Para el desarrollo, ademas se uso:
Lombok: https://projectlombok.org/
Formix: https://formik.org/



## Correr la aplicación

El proyecto es un proyecto Maven estándar. Si se desea ejectuar el proyecto desde los fuentes, puede ejecutarlos desde la línea de comandos, escribiendo `mvnw` (Windows), o `./mvnw` (Mac & Linux) y luego abrir http://localhost:8080 en el navegador. Esto requiere tener Maven instalado. 

Se agrega al repositorio un jar para testear la app sin necesidad de tener maven instalado. Se agrega en `jar_prod` de este proyecto el jar generado, para que se pueda probar sin necesidad de descargar dependencias. Se ejecuta usando `java -jar jar_prod/pj01app-1.0-SNAPSHOT.jar` (NOTA, reemplace `jar_prod` por el camino donde coloca el jar para ejecutar), luego abrir http://localhost:8080 en el navegador. Se requiere Java 17.X de 64bit instalado en su pc. 

## Uso de la Aplicación

Home: Por defecto muestra todos los Edificios cargados, y espera se seleccione el edificio para el que desea ver las dependencias. Si se lo desea, se puede filtrar un/os Edificios usando el filtro para tal fin.

Edificio: Gestion de Edificios. Permite crear nuevos, Modificar (Usando el boton o Seleccionando la Fila) y Eliminarlos. Si no se puede ejecutar la accion se mostrara una notificacion emergente marcando el error. Para entener lo que pasa, se deja el error como viene, aunque se entiende que debe ser distinto en un app en produccion. 

Dependencia: Gestion de Dependencias. Permite crear nuevas, Modificar (Usando el boton o Seleccionando la Fila) y Eliminarlas. Si no se puede ejectuar la accion  se mostrara una notificacion emergente marcando el error. Para entener lo que pasa, se deja el error como viene, aunque se entiende que debe ser distinto en un app en produccion. 

About : Se muestra el motivo de la apps.

## Paso a producción

Para crear una compilación de producción, ejecutar `mvnw clean package -Pproduction` (Windows), o `./mvnw clean package -Pproduction` (Mac & Linux). Antes seguir las recomendaciones para modificar el archivo POM.xml en https://hilla.dev/docs/react/guides/production/production-build. Para crear el jar solo agrego la propiedad `<vaadin.productionMode>true</vaadin.productionMode>` en el perfil `production`.

Esto crea un archivo JAR con todas las dependencias y recursos de front-end, listo para implementarse. El archivo se encuentra en la carpeta  `target`.
Una vez que se crea el archivo JAR, se ejecuta usando `java -jar target/pj01app-1.0-SNAPSHOT.jar` (NOTA, reemplace `target` por el camino donde coloca el jar para ejecutar).

## Estructura del Proyecto

<table style="width:100%; text-align: left;">
  <tr><th>Directorio</th><th>Descripcion</th></tr>
  <tr><td><code>frontend/</code></td><td>Directorio de fuentes del lado del cliente</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.html</code></td><td>Plantilla html</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.ts</code></td><td>Punto de entrada frontend, arranca una aplicación React
</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>routes.tsx</code></td><td>Definición de rutas de React Router</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>MainLayout.tsx</code></td><td>Componente de diseño principal, contiene el menú de navegación, usa <a href="https://hilla.dev/docs/react/components/app-layout">
App Layout</a></td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>views/</code></td><td>Componentes de la vista de la interfaz de usuario</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>themes/</code></td><td>Estilos CSS personalizados</td></tr>
  <tr><td><code>src/main/java/&lt;groupId&gt;/</code></td><td>Directorio de origen del lado del servidor, contiene las vistas de Java del lado del servidor</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>Application.java</code></td><td>Punto de entrada del servidor</td></tr>
</table>

## Enlaces útiles

- Lea la documentación en [hilla.dev/docs](https://hilla.dev/docs/).
- Haz preguntas en [Stack Overflow](https://stackoverflow.com/questions/tagged/hilla) o únete a nuestro [Discord channel](https://discord.gg/MYFq5RTbBn).
- Informe de problemas, cree solicitudes de incorporación de cambios en [GitHub](https://github.com/vaadin/hilla).

