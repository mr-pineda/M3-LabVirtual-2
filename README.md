# Página - Hospital Top Top Top

## Descripción:

Propuesta de página web para el **"Hospital Top Top Top"**. En esta nueva versión se integró `JavaScript` para mejorar la interacción con el usuario y gestionar mejor la información del equipo médico. El sitio consta de 3 vistas:

- **Inicio**: Muestra mensaje de bienvenida, información general y testimonio de pacientes.
- **Equipo Medico**: Muestra información sobre el compromiso de atencion a los pacientes y sobre el equipo médico. Tiene un chekbox para filtrar a los médicos que atiende por fonasa.
- **Contacto**: Contiene un formulario de contacto para comunicarse con el hospital.

En todas las pantallas Hay un boton para agendar Hora, el cual solicita datos mediante prompts.

## Instrucciones:

1. Descargar el contenido de este repositorio en el computador. Puede ser clonando el repositorio o descargando el .zip:

   - **Clonar el repositorio**: Puede hacerlo con cualquier gestor de repositorios. Si tiene git instalado, puede abrir una terminal en algun diretorio y ejecutar:

   ```bash
   git clone url_de_este_repo
   ```

   - Si no tiene git instalado puede presionar el botón verde `<> Code` que está en esta página y seleccionar la opción `Download ZIP`.
     1. Descargue el archivo .zip en algun directorio conocido _(ej: Escritorio, Documentos, etc.)_.
     2. Descomprima el archivo .zip

2. Dentro de la carpeta, abrir el archivo `index.html` con su navegador de preferencia.

## Estructura de carpetas y archivos

- Los archivos .html estan en la raíz del directorio.
- En el directiorio `assets` se encuentran archivos multimedia y de estilos utilizados en el sitio.
  - `./assets/img` contiene las imágenes utilizadas en el sitio.
  - `./assets/css` contiene los archivos de estilo (Usando archivos sass).
  - `./lib/*` Contiene librerías utilizadas (En este caso solo Bootstrap).
  - `./scripts/` Contiene scripts de JS y archivos .json.

## TO-DO (Rúbrica)

1. Programación Funcional en JavaScript:

   - [x] Implementa una función que use **currying** para calcular el costo total de los servicios de un paciente en función del número de consultas realizadas y el precio de cada consulta.
   - [ ] Usa la **función flecha** para simplificar la sintaxis en una función que calcule el tiempo promedio de espera de los pacientes.
   - [ ] Implementa la **recursión** para calcular de forma recursiva el total de horas de consulta de un doctor a lo largo de la semana.
   - [ ] Integra **composición de funciones** para aplicar descuentos a los costos de consultas en base a la cantidad de consultas realizadas.

2. Programación Orientada a Eventos y Programación Asíncrona:

   - [ ] Captura eventos del usuario en la página de Contacto:
     - [ ] Implementa un **listener** para capturar el envío del formulario y muestra un mensaje de confirmación.
     - [ ] Dispara un evento personalizado que simule la llegada de un nuevo paciente, mostrando una notificación en la página.
   - [ ] Implementa una función **async/await** para simular una llamada a una API REST que obtenga los **datos de los doctores**. Usa **Promise** para manejar los casos de éxito o fallo.
   - [ ] Implementa el manejo de errores utilizando **try/catch** en las funciones asíncronas, y define un **callback** que se invoque al fallar una petición simulada.

3. Programación Orientada a Objetos en JavaScript:
   - [ ] Implementa una **clase** `Doctor` con las propiedades `nombre`, `especialidad`, y `años de experiencia`.
     - [ ] Añade un método para mostrar la información de cada doctor y otro para calcular el total de pacientes atendidos por el doctor.
   - [ ] Crea una subclase de `Doctor`, por ejemplo `Cirujano`, que extienda las funcionalidades de la clase base.
   - [ ] Implementa el **encapsulamiento** en la clase, protegiendo la propiedad de `años de experiencia` mediante un getter y un setter.
   - [ ] Usa el **polimorfismo** para sobrescribir un método en la subclase `Cirujano` que calcule el número de operaciones realizadas en lugar de consultas.

- **OTROS Requerimientos:**
  - [ ] README contiene explicaciones sobre la programación funcional aplicada.
  - [ ] README contiene descripción de los eventos y el uso de asincronía.
  - [ ] README contiene explicación de la implementación de clases y el uso de herencia, encapsulación, y polimorfismo.
