export default function AboutView() {
  return (
    <>
    <div className="flex flex-col items-center justify-center p-l text-center box-border">
      <img style={{ width: '100px' }} src="images/escudo.gif" />
      <h2>Proyecto de Evaluacion para el PJ Neuquen </h2>
      </div>
    <div className="flex flex-col h-full items-left justify-left p-l text-left box-border">
      <p>Se necesita desarrollar una aplicación para registrar y consultar Edificios y Dependencias del Poder Judicial del Neuquén.</p>
      <p>Un edificio puede tener al menos una o más dependencias y una dependencia perteneces solo a 1 edificio (agregar los campos necesarios para representar esta relación).</p>
      <p>Se deberá crear una aplicación para administrar los edificios y dependencias (ABM) y para consultar los edificios de tal forma que al ingresar en un edificio se pueda visualizar fácilmente las dependencias de cada edificio.</p>
      <p>Para dar soporte a la aplicación se deberá crear el frontend y el backend, utilizando una base de datos en memoria (para mayor simplicidad), incluyendo registros de prueba que deberán ser agregados a las tablas al momento de ejecutar la aplicación.</p>
      <p>Dicha aplicación deberán guardarla en un repositorio publico de código y enviarnos el enlace para descargarla. A su vez, se deberán indicar los pasos a seguir para ejecutar la aplicación (una vez descargada en una pc local del Poder Judicial) y poder comprobar el correcto funcionamiento de la misma.</p>
      <p></p>
    </div>
    </>
  );
}
