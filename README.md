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
- El directorio `./lib/*` contiene las librerías utilizadas (En este caso solo Bootstrap).
- El directorio `./src/scripts/` contiene los scripts de JavaScript.
- El directorio `./src/data/` contiene los archivos .json.

## Programación funcional aplicada

Se creó una nueva página [panel.html](/panel.html) en la cual se acceden a las nuevas funcionalidades. En estas funcionalidades se aplican los conceptos de **currying**, **funcion flecha** y **composición de funciones**.

### Currying

Es una técnica que permite transformar una función de múltiples argumentos, en una secuencia de funciones de un único argumento, trayendo algunas ventajas en flexibilidad.

En el script [controlPanel.js](/src/scripts/controlPanel.js) se aplica currying la función `calculatePrice( )`, la cual calcula el precio de la consulta en base a un listado de precios (archivo JSON), la cantidad de consultas realizadas, el servicio o tipo de consulta realizada y si el paciente tiene previsión de fonasa o isapre:

```js
const calculatePrice = (priceData) => (count) => (service) => (prevision) =>
  count * priceData[service][prevision];
```

En donde priceData es un objeto json con la siguiente estructura:

```ts
type Pricedata = {
  especialidad1: { fonasa: number; isapre: number },
  especialidad2: { fonasa: number; isapre: number },
  ...
};
```

En el script se obtiene el precio total llamando a la función de la siguiente forma.

```js
const totalPrice = calculatePrice(priceData)(count)(service)(prevision);
```

A pesar de que no se aplicó en esta página, una utiliad del currying poder crear sub-funciones, con ciertos valores inicializados a partir de una funcion. Por ejemplo supongamos que se tienen los precios de 2 hospitales diferentes.

```js
const priceHospital1 = loadHospital1Data();
const priceHospital2 = loadHospital2Data();

const pricesH1 = calculatePrice(priceHospital1);
const pricesH2 = calculatePrice(priceHospital2);

const finalPrice1 = pricesH1(10)('general')(true);
const finalPrice2 = pricesH2(10)('general')(true);
```

A pesar de que `pricesH1( )` y `pricesH2( )` se llaman con los mismos argumentos, `finalPrice1` y `finalPrice2` deberían tener distintos valores ya que se cargaron distintos listados de precios (suponiendo que los listados tienen distintos valores para un mismo servicio)

### Funciones Flecha

Todas las funciones del script mencionado se definieron como funciones flecha.

### Composición de funciones

En este caso se uso la composición de funciones para obtener el precio aplicando un descuento segun la cantiad de consultas. Se creó la funcion `computeDiscount()` la tiene 2 argumentos de entrada, la cantidad de consultas realizadas y un precio.

```js
const computeDiscount = (count, price) => {
  if (count > 10) return price * 0.85;
  if (count > 5) return price * 0.9;
  if (count > 2) return price * 0.95;
  return price;
};
```

Se usa esta función, junto con la función `calculatePrice()` para crear una tercera función llamada `getDiscountedPrice()`, la cual tiene los mismos argumentos de `calculatePrice()`, retorna el valor con un descuento aplicado.

```js
const getDiscountedPrice = (priceData, count, service, prevision) =>
  computeDiscount(count, calculatePrice(priceData)(count)(service)(prevision));
```

## Eventos

Los eventos se capturan en [contactQueue.js](/src/scripts/contactQueue.js)

En caso de llenar exitosamente un formulario se llama al siguiente evento:

```js
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addQueue();
});
```

Donde la funcion `addQueue()` añade un elemento a la cola de pacientes y ademas muestra un **alert** indicando que se llenó el formulario.

Para simular un evento repentino se creo un evento con un `setTimeout()`, para simular el ingreso repentino de un paciente.

```js
const randomTimeout = 2000 + Math.random() * 3000;
setTimeout(() => {
  alert('Acaba de ingresar un nuevo paciente!');
}, randomTimeout);
```

Esta función muestra un alert indicando que ingresó un nuevo paciente en un intervalo aleatorio entre 2 a 5 segundos.

### Clases

Se crearon 2 clases para gestionar los datos médicos, `Doctor` y `Surgeon` que es una clase heredad de doctor.

#### Clase Doctor

Propiedades:

- **name _(string)_:** Nombre del doctor
- **specialty _(string)_:** Especialidad médica
- **\_workedYears _(string, ecapsulado)_:** Años de experiencia
- **services \_(string[]):** Lista de servicios ofrecidos
- **fonasa _(boolean)_:** Indica si atiende o no por fonasa
- **pacientCount _(number)_:** Contador de pacientes antendidos

Métodos:

- **Constructor():** Al crear la clase hay que pasarle un objeto doctor (elementos del archivo [doctors.json](/src/data/doctors.json)). Por defecto se asigna que el doctor no atiende por fonasa y presta el servicio de '_Medicina General_'.
- **showInfo():** Muestra en un log la información del doctor.
- **getWorkedYears():** Getter de la cantidad de años de experiencia.
- **setWorkedYears(years):** Setter de la cantidad de años de experiencia.
- **addService(service):** Añade un nuevo servicio al listado del servicios prestado por el doctor.
- **setFonasa(fonasa):** Cambia el parámetro que indica si el doctor atiende o no por Fonasa.
- **getPacientCount():** Devuelve la cantidad de pacientes antendidos y muestra un log con el mensaje `El Doctor ${nombre_doctor} ha atendido ${cantidad_paciente} pacientes`. En el primer llamado genera una cantidad aleatoria de pacientes.

#### Clase Surgeon

Propiedades: Las mismas de `Doctor`.

Métodos: Hereda los métodos de la clase doctor y ademas agrega y/o modifica los siguientes métodos

- **Constructor():** Utiliza el mismo constructor de `Doctor`, pero ademas modifica el valor de spacialty por `cirujano` y añade `cirujía` a la lista de servicios ofrecidos.
- **sdoSurgery():** Suma un paciente al contador de pacientes que se realizaron una cirujía con este doctor.
- **getPacientCount():** Devuelve la cantidad de pacientes que se hicieron cirujía y muestra un log con el mensaje `El Cirujano ${nombre_doctor} ha realizado ${cantidad_paciente} cirujías`. En el primer llamado genera una cantidad aleatoria de cirujías realizadas.

## TO-DO (Rúbrica)

1. Programación Funcional en JavaScript:

   - [x] Implementa una función que use **currying** para calcular el costo total de los servicios de un paciente en función del número de consultas realizadas y el precio de cada consulta.
   - [x] Usa la **función flecha** para simplificar la sintaxis en una función que calcule el tiempo promedio de espera de los pacientes.
   - [x] Implementa la **recursión** para calcular de forma recursiva el total de horas de consulta de un doctor a lo largo de la semana.
   - [x] Integra **composición de funciones** para aplicar descuentos a los costos de consultas en base a la cantidad de consultas realizadas.

2. Programación Orientada a Eventos y Programación Asíncrona:

   - [x] Captura eventos del usuario en la página de Contacto:
     - [x] Implementa un **listener** para capturar el envío del formulario y muestra un mensaje de confirmación.
     - [x] Dispara un evento personalizado que simule la llegada de un nuevo paciente, mostrando una notificación en la página.
   - [x] Implementa una función **async/await** para simular una llamada a una API REST que obtenga los **datos de los doctores**. Usa **Promise** para manejar los casos de éxito o fallo.
   - [x] Implementa el manejo de errores utilizando **try/catch** en las funciones asíncronas, y define un **callback** que se invoque al fallar una petición simulada.

3. Programación Orientada a Objetos en JavaScript:
   - [x] Implementa una **clase** `Doctor` con las propiedades `nombre`, `especialidad`, y `años de experiencia`.
     - [x] Añade un método para mostrar la información de cada doctor y otro para calcular el total de pacientes atendidos por el doctor.
   - [x] Crea una subclase de `Doctor`, por ejemplo `Cirujano`, que extienda las funcionalidades de la clase base.
   - [x] Implementa el **encapsulamiento** en la clase, protegiendo la propiedad de `años de experiencia` mediante un getter y un setter.
   - [x] Usa el **polimorfismo** para sobrescribir un método en la subclase `Cirujano` que calcule el número de operaciones realizadas en lugar de consultas.

- **OTROS Requerimientos:**
  - [x] README contiene explicaciones sobre la programación funcional aplicada.
  - [x] README contiene descripción de los eventos y el uso de asincronía.
  - [ ] README contiene explicación de la implementación de clases y el uso de herencia, encapsulación, y polimorfismo.
