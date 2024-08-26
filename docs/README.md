**CONEXION A MONGODB**

Este módulo proporciona una clase para gestionar la conexión a una base de datos MongoDB utilizando las credenciales almacenadas en un archivo .env. La clase implementa el patrón de diseño Singleton para asegurar que solo haya una instancia de conexión a la base de datos en la aplicación.


**INSTALACION**

Asegúrate de tener las siguientes dependencias en tu proyecto:

```javascript
npm install mongodb dotenv
```

**ARCHIVO .env**

Crea un archivo .env en la raíz de tu proyecto con las siguientes variables:

```javascript
MONGO_USER=tu_usuario
MONGO_PORT=27017
MONGO_PWD=tu_contraseña
MONGO_HOST=mongodb://
MONGO_CLUSTER=tu_cluster
MONGO_DB=tu_base_de_datos
```

**CLASE CONNECT**

Importación:

```javascript
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
```

**DESCRIPCION**

La clase connect maneja la conexión a MongoDB. Utiliza variables de entorno para configurar la conexión y proporciona métodos para abrir y cerrar la conexión a la base de datos.

Propiedades:

```javascript
user; // Nombre de usuario para la conexión.
port; // Puerto en el que se encuentra el servidor MongoDB.
#pass; //  Contraseña para la conexión (privada).
#host; //Host de la base de datos (privado).
#cluster; //Cluster de MongoDB (privado).
#dbName; //Nombre de la base de datos (privado).
static instance; //Instancia Singleton de la clase.
conexion; //Instancia de MongoClient.
db; //Instancia de la base de datos.
```


**METODOS**

```javascript
constructor() 
//Crea una instancia de la clase si no existe una ya. Inicializa las propiedades con valores de las variables de entorno.

set setPass(pass) {
    this.#pass = pass;
} // Configura la contraseña para la conexión.

set setHost(host) {
    this.#host = host;
} // Configura el host de la base de datos.

set setCluster(cluster) {
    this.#cluster = cluster;
} // Configura el cluster de MongoDB.

set setDbName(dbName) {
    this.#dbName = dbName;
} // Configura el nombre de la base de datos.

get getPass() {
    return this.#pass;
} // Obtiene la contraseña de la conexión.

get getHost() {
    return this.#host;
} // Obtiene el host de la base de datos.

get getCluster() {
    return this.#cluster;
} // Obtiene el cluster de MongoDB.

get getDbName() {
    return this.#dbName;
} // Obtiene el nombre de la base de datos. 

async open() 
// Conecta a MongoDB utilizando las credenciales y parámetros configurados. Imprime la URI de conexión y un mensaje de conexión exitosa en la consola.

async close() 
// Cierra la conexión a MongoDB e imprime un mensaje de desconexión exitosa en la consola.
```

----

**CLASE CLIENTS**

La clase clients maneja las operaciones relacionadas con la colección clientes en MongoDB. Hereda de la clase connect para gestionar la conexión a la base de datos y proporciona métodos para interactuar con la colección.


**IMPORTACION**

```javascript
import { ObjectId } from "mongodb";
import { connect } from "../../../helpers/db/connect.js";
```

**DESCRIPCION**

La clase clients extiende la clase connect y utiliza el patrón Singleton para asegurar que solo haya una instancia de la clase. Ofrece métodos para obtener todos los clientes y para obtener clientes VIP basados en su tipo.

**METODOS Y PROPIEDADES**

```javascript
constructor() 
//Inicializa la clase clients. Implementa el patrón Singleton para asegurar que solo haya una instancia de la clase.
```

```javascript
async initialize() 
// Inicializa la conexión a la base de datos y obtiene la colección clientes. Asegúrate de llamar a este método antes de utilizar cualquier otro método de la clase.
```

```javascript
async getAllClients() 
//Obtiene todos los clientes de la colección clientes.
// Retorna: Promise<Array<Client>> - Array con todos los clientes.
```

```javascript
async vipClients(tipo_cliente_id)
//Obtiene clientes VIP basados en su tipo de cliente.
```

**TIPOS DE DATOS**

```javascript
/**
 * @typedef {Object} Client
 * @property {string} idClient - ID del cliente.
 * @property {string} name - Nombre del cliente.
 * @property {string} email - Email del cliente.
 * @property {string} telefono - Teléfono del cliente.
 * @property {string} direccion - Dirección del cliente.
 * @property {string} tipo_cliente_id - ID del tipo de cliente.
 * @property {string} reservas - Reservas del cliente.
 */
```
---
**CLASE FUNCTIONS**

La clase functions maneja las operaciones relacionadas con la colección funciones en MongoDB. Hereda de la clase connect para gestionar la conexión a la base de datos y proporciona métodos para interactuar con la colección.

**DESCRIPCION**

La clase functions extiende la clase connect y utiliza el patrón Singleton para asegurar que solo haya una instancia de la clase. Ofrece métodos para obtener todas las funciones, obtener funciones por ID de película, añadir reservas y eliminar reservas.

**METODOS Y PROPIEDADES**


```javascript
async getAllFunctions()
// Obtiene todas las funciones de la colección funciones.
// Retorna: Promise<Array<Function>> - Array con todas las funciones.
```

```javascript
async getFunctionsByMovieID(pelicula_id)
// Obtiene las funciones basadas en el ID de la película.
// parametro: pelicula_id (string) - ID de la película.
// Retorna: Promise<Array<Function>> - Array con las funciones correspondientes.
```

```javascript
async addBookingsByFunctionID(functionsID, newReservation)
//Añade una nueva reserva a una función por su ID.
// PARAMETROS: 
// functionsID (ObjectId) - ID de la función.
// newReservation (Reservation) - La nueva reserva a añadir.
// Retorna: Promise<Object> - Documento de la función actualizado.
```

```javascript
async removeBookingByFunctionID(functionsID, reservationToRemove)
// PARAMETROS:
//functionsID (ObjectId) - ID de la función de la que se desea eliminar la reserva.
//reservationToRemove (Reservation) - La reserva que se desea eliminar.
//Retorna: Promise<Object> - Documento de la función actualizado después de eliminar la reserva.
```

**TIPOS DE DATOS**

```javascript
//Function
/**
 * @typedef {Object} Function
 * @property {string} functionsID - ID de la función.
 * @property {string} pelicula_id - ID de la película.
 * @property {string} cine_id - ID del cine.
 * @property {string} fecha_hora - Fecha y hora de la función.
 * @property {string} sala - Sala de cine.
 * @property {string} asientos_disponibles - Asientos disponibles.
 * @property {string} asientos_totales - Asientos totales.
 * @property {string} precio - Precio.
 */
```
```javascript
//Reservation
/**
 * @typedef {Object} Reservation
 * @property {string} asiento - Número de asiento.
 * @property {ObjectId} cliente_id - ID del cliente.
 */
```

---

**CLASE MOVIES**

La clase movies maneja las operaciones relacionadas con la colección peliculas en MongoDB. Hereda de la clase connect para gestionar la conexión a la base de datos y proporciona métodos para interactuar con la colección.

**DESCRIPCION**

La clase movies extiende la clase connect y utiliza el patrón Singleton para asegurar que solo haya una instancia de la clase. Ofrece métodos para obtener todas las películas, obtener una película por su ID y obtener funciones asociadas a una película.

**METODOS Y PROPIEDADES**

```javascript
async getAllmovies()
//Obtiene todos los documentos de la colección de películas, proyectando solo el título, ID, género y duración.
//Retorna: Promise<Array<movies>> - Array con el resultado de la colección de películas.
```

```javascript
async getMoviesByID(idMovies)
//Obtiene los detalles completos de una película por su ID.
// PARAMETRO: idMovies (string) - ID de la película.
// Retorna: Promise<Array<movies>> - Array con el resultado de la película solicitada.
```

```javascript
async getMovieFunctionsByID(idMovies)
//Obtiene las funciones asociadas a una película por su ID, incluyendo la disponibilidad de asientos y horarios.
// PARAMETRO: idMovies (string) - ID de la película.
// Retorna: Promise<Array<Object>> - Array con el resultado de las funciones asociadas a la película.
```

**TIPOS DE DATOS**

```javascript
/**
 * @typedef {Object} movies
 * @property {string} _id - ID de la película.
 * @property {string} titulo - Título de la película.
 * @property {string} descripcion - Descripción de la película.
 * @property {string} director - Director de la película.
 * @property {string} actores - Actores de la película.
 * @property {string} genero - Género de la película.
 * @property {string} duracion - Duración de la película.
 * @property {string} fecha_estreno - Fecha de estreno de la película.
 * @property {string} calificacion - Calificación de la película.
 * @property {string} idioma - Idioma de la película.
 * @property {string} subtitulos - Subtítulos disponibles para la película.
 * @property {string} formato - Formato de la película (2D, 3D, IMAX, etc.).
 */
```
---

**CLASE TICKETS**

La clase tickets maneja las operaciones relacionadas con la colección boletos en MongoDB. Hereda de la clase connect para gestionar la conexión a la base de datos y proporciona métodos para interactuar con la colección.

**DESCRIPCION**

La clase tickets extiende la clase connect y utiliza el patrón Singleton para asegurar que solo haya una instancia de la clase. Ofrece métodos para obtener todos los tickets, obtener los asientos disponibles y ocupados, y agregar nuevos tickets.

**METODOS Y PROPIEDADES**

```javascript
async getAll__BuyedTickets()
//Obtiene todos los tickets comprados.
//Retorna: Promise<Array<tickets>> - Array con el resultado de los tickets comprados.
```

```javascript
async getAvailableSeatsByFunctionID(funcion_id)
// Obtiene los asientos disponibles y totales para una función específica.
// PARAMETRO: funcion_id (string) - ID de la función.
// Retorna: Promise<Array<Object>> - Array con la información de los asientos disponibles y totales.
```

```javascript
async getOccupiedSeatsByFunctionID(funcion_id)
//Obtiene los asientos ocupados para una función específica.
// PARAMETRO: funcion_id (string) - ID de la función.
//Retorna: Promise<Array<Object>> - Array con la información de los asientos ocupados.
```

```javascript
async addTicket(
    funcion_id, // PARAMTROS 
    cliente_id,
    asiento,
    precio,
    fecha_compra,
    descuento_aplicado,
    método_pago,
    hora_funcion
)
//Agrega un nuevo ticket para una función específica.
// Retorna: Promise<Object> - Resultado de la inserción del ticket.
```

**TIPOS DE DATOS**
```JAVASCRIPT
/**
 * @typedef {Object} tickets
 * @property {string} idTickets - ID del ticket.
 * @property {string} funcion_id - ID de la función.
 * @property {string} cliente_id - ID del cliente.
 * @property {string} asiento - Asiento asignado.
 * @property {string} precio - Precio del ticket.
 * @property {string} fecha_compra - Fecha de compra.
 * @property {string} descuento_aplicado - Descuento aplicado.
 * @property {string} método_pago - Método de pago.
 */
```